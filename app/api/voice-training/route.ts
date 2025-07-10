import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for training data (in production, use a database)
const trainingData: any[] = [
  {
    command: "ऋण खोज्नुहोस्",
    variations: ["लोन खोज्नुहोस्", "पैसा खोज्नुहोस्", "ऋण फेला पार्नुहोस्", "लोन देखाउनुहोस्"],
    intent: "search_loans",
    confidence: 0.95,
    response: "ऋण कार्यक्रमहरू खोजिरहेको छु...",
    usage_count: 0,
    last_used: new Date().toISOString(),
  },
  {
    command: "महिला सशक्तिकरण कार्यक्रम खोज्नुहोस्",
    variations: ["महिलाका लागि कार्यक्रम", "महिला सहायता", "महिला ऋण", "आमाहरूका लागि कार्यक्रम"],
    intent: "search_women_programs",
    confidence: 0.9,
    response: "महिला सशक्तिकरण कार्यक्रमहरू खोजिरहेको छु...",
    usage_count: 0,
    last_used: new Date().toISOString(),
  },
  {
    command: "युवा कार्यक्रम खोज्नुहोस्",
    variations: ["जवानहरूका लागि कार्यक्रम", "युवा ऋण", "युवा सहायता", "तरुणहरूका लागि"],
    intent: "search_youth_programs",
    confidence: 0.88,
    response: "युवा कार्यक्रमहरू खोजिरहेको छु...",
    usage_count: 0,
    last_used: new Date().toISOString(),
  },
  {
    command: "इच्छा सूची खोल्नुहोस्",
    variations: ["विशलिस्ट खोल्नुहोस्", "मनपर्ने देखाउनुहोस्", "सुरक्षित कार्यक्रम", "सेभ गरिएको"],
    intent: "open_wishlist",
    confidence: 0.92,
    response: "तपाईंको इच्छा सूची खोल्दै छु...",
    usage_count: 0,
    last_used: new Date().toISOString(),
  },
  {
    command: "तुलना गर्नुहोस्",
    variations: ["कम्पेयर गर्नुहोस्", "मिलाउनुहोस्", "तुलना देखाउनुहोस्", "फरक देखाउनुहोस्"],
    intent: "compare_programs",
    confidence: 0.88,
    response: "कार्यक्रमहरूको तुलना गर्दै छु...",
    usage_count: 0,
    last_used: new Date().toISOString(),
  },
]

// GET endpoint to retrieve Nepali commands
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  if (endpoint === "nepali-commands") {
    return NextResponse.json(trainingData)
  }

  return NextResponse.json({
    message: "नेपाली आवाज प्रशिक्षण API",
    available_endpoints: ["/api/voice-training?endpoint=nepali-commands", "/api/voice-training/train"],
    total_commands: trainingData.length,
  })
}

// POST endpoint for training the voice model
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { input, language, timestamp, session_id } = body

    if (!input || language !== "nepali") {
      return NextResponse.json({ error: "अवैध इनपुट डेटा" }, { status: 400 })
    }

    // Process the training input
    const processedInput = {
      original_input: input,
      processed_input: input.toLowerCase().trim(),
      language: language,
      timestamp: timestamp || new Date().toISOString(),
      session_id: session_id,
      confidence_score: calculateConfidence(input),
      matched_commands: findMatchingCommands(input),
    }

    // Update usage statistics
    updateUsageStats(input)

    // In production, save to database
    console.log("नेपाली आवाज प्रशिक्षण डेटा:", processedInput)

    return NextResponse.json({
      success: true,
      message: "प्रशिक्षण डेटा सफलतापूर्वक प्राप्त भयो",
      processed_data: processedInput,
      total_training_samples: trainingData.length,
    })
  } catch (error) {
    console.error("आवाज प्रशिक्षण त्रुटि:", error)
    return NextResponse.json({ error: "प्रशिक्षण डेटा प्रोसेसिङमा त्रुटि" }, { status: 500 })
  }
}

function calculateConfidence(input: string): number {
  // Simple confidence calculation based on input length and known patterns
  const words = input.split(" ")
  let confidence = 0.5

  // Boost confidence for known Nepali words
  const nepaliWords = ["ऋण", "लोन", "महिला", "युवा", "खोज्नुहोस्", "देखाउनुहोस्", "इच्छा", "सूची"]
  const foundWords = words.filter((word) => nepaliWords.includes(word))
  confidence += (foundWords.length / words.length) * 0.4

  // Boost for proper sentence structure
  if (input.includes("खोज्नुहोस्") || input.includes("देखाउनुहोस्") || input.includes("खोल्नुहोस्")) {
    confidence += 0.1
  }

  return Math.min(confidence, 1.0)
}

function findMatchingCommands(input: string): any[] {
  const matches = []

  for (const command of trainingData) {
    const allVariations = [command.command, ...command.variations]

    for (const variation of allVariations) {
      const similarity = calculateSimilarity(input, variation)
      if (similarity > 0.6) {
        matches.push({
          command: command.command,
          intent: command.intent,
          similarity: similarity,
          confidence: command.confidence,
        })
      }
    }
  }

  return matches.sort((a, b) => b.similarity - a.similarity).slice(0, 3)
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.toLowerCase().split(" ")
  const words2 = str2.toLowerCase().split(" ")

  let commonWords = 0
  for (const word1 of words1) {
    if (words2.includes(word1)) {
      commonWords++
    }
  }

  return commonWords / Math.max(words1.length, words2.length)
}

function updateUsageStats(input: string) {
  // Update usage statistics for matching commands
  for (const command of trainingData) {
    const allVariations = [command.command, ...command.variations]

    for (const variation of allVariations) {
      if (input.includes(variation) || variation.includes(input)) {
        command.usage_count = (command.usage_count || 0) + 1
        command.last_used = new Date().toISOString()
        break
      }
    }
  }
}
