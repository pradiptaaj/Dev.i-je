// Enhanced Nepali-only voice bot with API training integration
interface VoiceConfig {
  language: string
  voice: SpeechSynthesisVoice | null
  recognition: any | null
}

interface NepaliVoiceCommands {
  search: string[]
  navigate: string[]
  read: string[]
  help: string[]
  stop: string[]
  greetings: string[]
  numbers: { [key: string]: string }
  common_words: { [key: string]: string }
}

interface VoiceTrainingData {
  command: string
  variations: string[]
  intent: string
  confidence: number
  response: string
}

const NEPALI_VOICE_COMMANDS: NepaliVoiceCommands = {
  greetings: ["नमस्ते", "नमस्कार", "हेलो", "हाई", "सुरु गर्नुहोस्", "शुरू गर्नुहोस्", "आवाज सहायक", "बोल्न सक्छु", "सुन्नुहोस्"],
  search: [
    "खोज्नुहोस्",
    "फेला पार्नुहोस्",
    "देखाउनुहोस्",
    "खोजी गर्नुहोस्",
    "पत्ता लगाउनुहोस्",
    "भेट्टाउनुहोस्",
    "खोज",
    "सर्च",
    "फाइन्ड",
    "ऋण खोज्नुहोस्",
    "लोन खोज्नुहोस्",
    "पैसा खोज्नुहोस्",
    "बैंक खोज्नुहोस्",
    "माइक्रोफाइनान्स खोज्नुहोस्",
    "सहायता खोज्नुहोस्",
  ],
  navigate: [
    "जानुहोस्",
    "खोल्नुहोस्",
    "लैजानुहोस्",
    "देखाउनुहोस्",
    "प्रदर्शन गर्नुहोस्",
    "इच्छा सूची",
    "विशलिस्ट",
    "मनपर्ने",
    "सुरक्षित",
    "सेभ गरिएको",
    "तुलना गर्नुहोस्",
    "कम्पेयर गर्नुहोस्",
    "मिलाउनुहोस्",
  ],
  read: ["पढ्नुहोस्", "भन्नुहोस्", "व्याख्या गर्नुहोस्", "बताउनुहोस्", "सुनाउनुहोस्", "वर्णन गर्नुहोस्", "जानकारी दिनुहोस्"],
  help: ["सहायता", "मद्दत", "गाइड", "निर्देशन", "के गर्न सक्नुहुन्छ", "कमाण्ड", "आदेश", "हेल्प", "असिस्ट"],
  stop: ["रोक्नुहोस्", "बन्द गर्नुहोस्", "समाप्त गर्नुहोस्", "अन्त्य गर्नुहोस्", "स्टप", "फिनिस", "एन्ड", "क्लोज"],
  numbers: {
    एक: "1",
    दुई: "2",
    तीन: "3",
    चार: "4",
    पाँच: "5",
    छ: "6",
    सात: "7",
    आठ: "8",
    नौ: "9",
    दश: "10",
    बीस: "20",
    तीस: "30",
    चालीस: "40",
    पचास: "50",
    साठी: "60",
    सत्तरी: "70",
    अस्सी: "80",
    नब्बे: "90",
    सय: "100",
  },
  common_words: {
    हजार: "1000",
    लाख: "100000",
    करोड: "10000000",
    रुपैयाँ: "NPR",
    पैसा: "money",
    ऋण: "loan",
    लोन: "loan",
    बैंक: "bank",
    सहकारी: "cooperative",
    माइक्रोफाइनान्स: "microfinance",
    महिला: "women",
    युवा: "youth",
    किसान: "farmer",
    व्यापारी: "business",
  },
}

// Training data for voice command recognition
const VOICE_TRAINING_DATA: VoiceTrainingData[] = [
  {
    command: "ऋण खोज्नुहोस्",
    variations: ["लोन खोज्नुहोस्", "पैसा खोज्नुहोस्", "ऋण फेला पार्नुहोस्", "लोन देखाउनुहोस्"],
    intent: "search_loans",
    confidence: 0.95,
    response: "ऋण कार्यक्रमहरू खोजिरहेको छु...",
  },
  {
    command: "महिला सशक्तिकरण कार्यक्रम खोज्नुहोस्",
    variations: ["महिलाका लागि कार्यक्रम", "महिला सहायता", "महिला ऋण"],
    intent: "search_women_programs",
    confidence: 0.9,
    response: "महिला सशक्तिकरण कार्यक्रमहरू खोजिरहेको छु...",
  },
  {
    command: "इच्छा सूची खोल्नुहोस्",
    variations: ["विशलिस्ट खोल्नुहोस्", "मनपर्ने देखाउनुहोस्", "सुरक्षित कार्यक्रम"],
    intent: "open_wishlist",
    confidence: 0.92,
    response: "तपाईंको इच्छा सूची खोल्दै छु...",
  },
  {
    command: "तुलना गर्नुहोस्",
    variations: ["कम्पेयर गर्नुहोस्", "मिलाउनुहोस्", "तुलना देखाउनुहोस्"],
    intent: "compare_programs",
    confidence: 0.88,
    response: "कार्यक्रमहरूको तुलना गर्दै छु...",
  },
]

class NepaliVoiceBot {
  private static instance: NepaliVoiceBot
  private isListening = false
  private isReading = false
  private isActive = false
  private recognition: any | null = null
  private synthesis: SpeechSynthesis
  private onSearchCallback: ((query: string) => void) | null = null
  private onNavigateCallback: ((action: string) => void) | null = null
  private onStatusChangeCallback: ((status: any) => void) | null = null
  private trainingData: VoiceTrainingData[] = VOICE_TRAINING_DATA
  private voiceApiEndpoint = "/api/voice-training" // API endpoint for training

  constructor() {
    this.synthesis = window.speechSynthesis
    this.initializeSpeechRecognition()
    this.loadTrainingData()
  }

  static getInstance(): NepaliVoiceBot {
    if (!NepaliVoiceBot.instance) {
      NepaliVoiceBot.instance = new NepaliVoiceBot()
    }
    return NepaliVoiceBot.instance
  }

  private async loadTrainingData() {
    try {
      // Load additional training data from API
      const response = await fetch(`${this.voiceApiEndpoint}/nepali-commands`)
      if (response.ok) {
        const apiTrainingData = await response.json()
        this.trainingData = [...this.trainingData, ...apiTrainingData]
        console.log("नेपाली आवाज प्रशिक्षण डेटा लोड भयो:", this.trainingData.length, "कमाण्डहरू")
      }
    } catch (error) {
      console.log("API बाट प्रशिक्षण डेटा लोड गर्न सकिएन, स्थानीय डेटा प्रयोग गर्दै")
    }
  }

  private initializeSpeechRecognition() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()

      // Configure for Nepali language
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.lang = "ne-NP" // Nepali language code
      this.recognition.maxAlternatives = 3 // Get multiple alternatives for better accuracy

      this.recognition.onstart = () => {
        this.isListening = true
        this.notifyStatusChange()
        this.speak("म सुनिरहेको छु... अब बोल्नुहोस्।")
      }

      this.recognition.onresult = (event) => {
        // Get all alternatives for better processing
        const alternatives = []
        for (let i = 0; i < event.results[0].length; i++) {
          alternatives.push({
            transcript: event.results[0][i].transcript.toLowerCase(),
            confidence: event.results[0][i].confidence,
          })
        }

        console.log("नेपाली आवाज इनपुट:", alternatives)
        this.processNepaliVoiceCommand(alternatives)
      }

      this.recognition.onerror = (event) => {
        console.error("आवाज पहिचान त्रुटि:", event.error)
        let errorMessage = "माफ गर्नुहोस्, मैले बुझिन। कृपया फेरि प्रयास गर्नुहोस्।"

        switch (event.error) {
          case "no-speech":
            errorMessage = "कुनै आवाज सुनिएन। कृपया स्पष्ट रूपमा बोल्नुहोस्।"
            break
          case "audio-capture":
            errorMessage = "माइक्रोफोन समस्या छ। कृपया जाँच गर्नुहोस्।"
            break
          case "not-allowed":
            errorMessage = "माइक्रोफोन अनुमति चाहिन्छ। कृपया अनुमति दिनुहोस्।"
            break
        }

        this.speak(errorMessage)
        this.isListening = false
        this.notifyStatusChange()
      }

      this.recognition.onend = () => {
        this.isListening = false
        this.notifyStatusChange()
      }
    }
  }

  private async processNepaliVoiceCommand(alternatives: Array<{ transcript: string; confidence: number }>) {
    console.log("नेपाली कमाण्ड प्रोसेसिङ:", alternatives)

    // Find the best matching command using training data
    let bestMatch = null
    let highestScore = 0

    for (const alt of alternatives) {
      const transcript = alt.transcript.trim()

      // Train the model with this input
      await this.trainVoiceModel(transcript)

      // Check against training data
      for (const trainingItem of this.trainingData) {
        const score = this.calculateCommandSimilarity(transcript, trainingItem)
        if (score > highestScore && score > 0.6) {
          // Minimum confidence threshold
          highestScore = score
          bestMatch = trainingItem
        }
      }

      // Also check against predefined commands
      const commandMatch = this.matchPredefinedCommands(transcript)
      if (commandMatch.score > highestScore) {
        highestScore = commandMatch.score
        bestMatch = commandMatch
      }
    }

    if (bestMatch) {
      console.log("सबैभन्दा राम्रो मिलान:", bestMatch)
      await this.executeCommand(bestMatch)
    } else {
      // If no good match found, try to extract intent from the speech
      const extractedIntent = this.extractIntentFromSpeech(alternatives[0].transcript)
      if (extractedIntent) {
        await this.executeCommand(extractedIntent)
      } else {
        this.speak("माफ गर्नुहोस्, मैले त्यो कमाण्ड बुझिन। 'सहायता' भन्नुहोस् उपलब्ध कमाण्डहरूको लागि।")
      }
    }
  }

  private calculateCommandSimilarity(input: string, trainingItem: VoiceTrainingData): number {
    const allVariations = [trainingItem.command, ...trainingItem.variations]
    let maxSimilarity = 0

    for (const variation of allVariations) {
      const similarity = this.calculateStringSimilarity(input, variation)
      maxSimilarity = Math.max(maxSimilarity, similarity)
    }

    return maxSimilarity * trainingItem.confidence
  }

  private calculateStringSimilarity(str1: string, str2: string): number {
    // Levenshtein distance based similarity for Nepali text
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1

    if (longer.length === 0) return 1.0

    const distance = this.levenshteinDistance(longer, shorter)
    return (longer.length - distance) / longer.length
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }

    return matrix[str2.length][str1.length]
  }

  private matchPredefinedCommands(transcript: string): any {
    const bestMatch = { score: 0, intent: "", response: "", command: transcript }

    // Check greetings
    for (const greeting of NEPALI_VOICE_COMMANDS.greetings) {
      if (transcript.includes(greeting)) {
        return {
          score: 0.95,
          intent: "greeting",
          response:
            "नमस्ते! म तपाईंको THAILI नेपाली आवाज सहायक हुँ। म तपाईंलाई वित्तीय कार्यक्रमहरू खोज्न, नेभिगेट गर्न र जानकारी प्रदान गर्न मद्दत गर्न सक्छु।",
          command: transcript,
        }
      }
    }

    // Check help commands
    for (const helpCmd of NEPALI_VOICE_COMMANDS.help) {
      if (transcript.includes(helpCmd)) {
        return {
          score: 0.9,
          intent: "help",
          response:
            "उपलब्ध कमाण्डहरू: 'ऋण खोज्नुहोस्', 'महिला कार्यक्रम खोज्नुहोस्', 'इच्छा सूची खोल्नुहोस्', 'तुलना गर्नुहोस्', वा 'बन्द गर्नुहोस्'।",
          command: transcript,
        }
      }
    }

    // Check stop commands
    for (const stopCmd of NEPALI_VOICE_COMMANDS.stop) {
      if (transcript.includes(stopCmd)) {
        return {
          score: 0.95,
          intent: "stop",
          response: "आवाज सहायक बन्द गर्दै छु। धन्यवाद!",
          command: transcript,
        }
      }
    }

    return bestMatch
  }

  private extractIntentFromSpeech(transcript: string): any {
    // Advanced intent extraction for Nepali speech
    const words = transcript.split(" ")

    // Check for loan/credit related terms
    const loanTerms = ["ऋण", "लोन", "पैसा", "क्रेडिट", "उधार"]
    const womenTerms = ["महिला", "आमा", "बहिनी", "स्त्री"]
    const youthTerms = ["युवा", "जवान", "तरुण"]
    const businessTerms = ["व्यापार", "व्यवसाय", "बिजनेस", "उद्योग"]

    let intent = null
    let searchQuery = ""

    // Determine intent based on keywords
    if (words.some((word) => loanTerms.includes(word))) {
      if (words.some((word) => womenTerms.includes(word))) {
        intent = "search_women_loans"
        searchQuery = "महिला ऋण"
      } else if (words.some((word) => youthTerms.includes(word))) {
        intent = "search_youth_loans"
        searchQuery = "युवा ऋण"
      } else if (words.some((word) => businessTerms.includes(word))) {
        intent = "search_business_loans"
        searchQuery = "व्यापारिक ऋण"
      } else {
        intent = "search_loans"
        searchQuery = "ऋण"
      }
    }

    if (intent) {
      return {
        score: 0.75,
        intent: intent,
        response: `${searchQuery} कार्यक्रमहरू खोजिरहेको छु...`,
        command: transcript,
        searchQuery: searchQuery,
      }
    }

    return null
  }

  private async executeCommand(command: any) {
    console.log("कमाण्ड कार्यान्वयन:", command)

    // Speak the response
    this.speak(command.response)

    // Execute the action based on intent
    switch (command.intent) {
      case "greeting":
        // Just the welcome message
        break

      case "help":
        // Just the help message
        break

      case "stop":
        setTimeout(() => this.deactivate(), 2000)
        break

      case "search_loans":
      case "search_women_loans":
      case "search_youth_loans":
      case "search_business_loans":
      case "search_women_programs":
        if (this.onSearchCallback) {
          const query = command.searchQuery || this.extractSearchTerms(command.command)
          this.onSearchCallback(query)
        }
        break

      case "open_wishlist":
        if (this.onNavigateCallback) {
          this.onNavigateCallback("wishlist")
        }
        break

      case "compare_programs":
        if (this.onNavigateCallback) {
          this.onNavigateCallback("compare")
        }
        break
    }
  }

  private extractSearchTerms(command: string): string {
    // Extract meaningful search terms from Nepali command
    const words = command.split(" ")
    const searchTerms = []

    // Map Nepali terms to English for search
    const termMapping: { [key: string]: string } = {
      ऋण: "loan",
      लोन: "loan",
      महिला: "women",
      युवा: "youth",
      व्यापार: "business",
      किसान: "agriculture",
      सहकारी: "cooperative",
      माइक्रोफाइनान्स: "microfinance",
      बैंक: "bank",
    }

    for (const word of words) {
      if (termMapping[word]) {
        searchTerms.push(termMapping[word])
      } else if (word.length > 2) {
        searchTerms.push(word)
      }
    }

    return searchTerms.join(" ") || command
  }

  private async trainVoiceModel(input: string) {
    try {
      // Send voice input to API for training
      await fetch(`${this.voiceApiEndpoint}/train`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: input,
          language: "nepali",
          timestamp: new Date().toISOString(),
          session_id: this.generateSessionId(),
        }),
      })
    } catch (error) {
      console.log("आवाज मोडेल प्रशिक्षण API उपलब्ध छैन")
    }
  }

  private generateSessionId(): string {
    return "nepali_voice_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
  }

  speak(text: string) {
    if (this.isReading) {
      this.synthesis.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "ne-NP" // Nepali language
    utterance.rate = 0.8 // Slower for better comprehension
    utterance.pitch = 1.1 // Slightly higher pitch for clarity
    utterance.volume = 0.9

    // Try to find a Nepali voice
    const voices = this.synthesis.getVoices()
    let nepaliVoice = voices.find(
      (voice) => voice.lang === "ne-NP" || voice.lang === "ne" || voice.name.toLowerCase().includes("nepali"),
    )

    // Fallback to Hindi voice if Nepali not available
    if (!nepaliVoice) {
      nepaliVoice = voices.find(
        (voice) => voice.lang === "hi-IN" || voice.lang === "hi" || voice.name.toLowerCase().includes("hindi"),
      )
    }

    // Final fallback to any available voice
    if (!nepaliVoice && voices.length > 0) {
      nepaliVoice = voices.find((voice) => voice.lang.startsWith("en")) || voices[0]
    }

    if (nepaliVoice) {
      utterance.voice = nepaliVoice
      console.log("प्रयोग गरिएको आवाज:", nepaliVoice.name, nepaliVoice.lang)
    }

    utterance.onstart = () => {
      this.isReading = true
      this.notifyStatusChange()
    }

    utterance.onend = () => {
      this.isReading = false
      this.notifyStatusChange()
    }

    utterance.onerror = (event) => {
      console.error("आवाज संश्लेषण त्रुटि:", event.error)
      this.isReading = false
      this.notifyStatusChange()
    }

    this.synthesis.speak(utterance)
  }

  activate() {
    if (!this.recognition) {
      console.error("आवाज पहिचान समर्थित छैन")
      return false
    }

    this.isActive = true
    this.notifyStatusChange()
    this.speak("नेपाली आवाज सहायक सक्रिय भयो। म तपाईंको कुरा सुन्न तयार छु।")

    // Start listening after a brief delay
    setTimeout(() => {
      this.startListening()
    }, 2000)

    return true
  }

  deactivate() {
    this.isActive = false
    this.stopListening()
    this.stopSpeaking()
    this.speak("आवाज सहायक बन्द भयो। फेरि प्रयोग गर्न माइक्रोफोनमा क्लिक गर्नुहोस्। धन्यवाद!")
    this.notifyStatusChange()
  }

  startListening() {
    if (this.recognition && !this.isListening && this.isActive) {
      this.recognition.lang = "ne-NP"
      try {
        this.recognition.start()
      } catch (error) {
        console.error("आवाज पहिचान सुरु गर्न त्रुटि:", error)
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }

  stopSpeaking() {
    if (this.isReading) {
      this.synthesis.cancel()
      this.isReading = false
      this.notifyStatusChange()
    }
  }

  setSearchCallback(callback: (query: string) => void) {
    this.onSearchCallback = callback
  }

  setNavigateCallback(callback: (action: string) => void) {
    this.onNavigateCallback = callback
  }

  setStatusChangeCallback(callback: (status: any) => void) {
    this.onStatusChangeCallback = callback
  }

  private notifyStatusChange() {
    if (this.onStatusChangeCallback) {
      this.onStatusChangeCallback(this.getStatus())
    }
  }

  getStatus() {
    return {
      isActive: this.isActive,
      isListening: this.isListening,
      isReading: this.isReading,
      language: "नेपाली",
      languageCode: "ne-NP",
      isSupported: !!this.recognition,
      trainingDataCount: this.trainingData.length,
    }
  }

  toggle() {
    if (this.isActive) {
      this.deactivate()
    } else {
      this.activate()
    }
  }

  // Get available Nepali commands for help
  getAvailableCommands() {
    return {
      search: "ऋण खोज्नुहोस्, महिला कार्यक्रम खोज्नुहोस्, युवा कार्यक्रम खोज्नुहोस्",
      navigate: "इच्छा सूची खोल्नुहोस्, तुलना गर्नुहोस्",
      help: "सहायता, मद्दत",
      stop: "बन्द गर्नुहोस्, रोक्नुहोस्",
    }
  }
}

// Export singleton instance
export const nepaliVoiceBot = NepaliVoiceBot.getInstance()

// Type declarations for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}
