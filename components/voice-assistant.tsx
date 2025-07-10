"use client"

import { Button } from "@/components/ui/button"
import { Mic, MicOff, Volume2, Square, Brain, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { nepaliVoiceBot } from "@/lib/voice-bot"

interface VoiceAssistantProps {
  onSearch: (query: string) => void
  onNavigate: (action: string) => void
}

export function VoiceAssistant({ onSearch, onNavigate }: VoiceAssistantProps) {
  const [isActive, setIsActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [trainingDataCount, setTrainingDataCount] = useState(0)
  const [showCommands, setShowCommands] = useState(false)

  useEffect(() => {
    // Initialize Nepali voice bot
    nepaliVoiceBot.setSearchCallback(onSearch)
    nepaliVoiceBot.setNavigateCallback(onNavigate)

    // Set up status change callback
    nepaliVoiceBot.setStatusChangeCallback((status) => {
      setIsActive(status.isActive)
      setIsListening(status.isListening)
      setIsReading(status.isReading)
      setTrainingDataCount(status.trainingDataCount || 0)
    })

    // Check if speech recognition is supported
    setIsSupported(!!nepaliVoiceBot.getStatus().isSupported)

    // Initial status update
    const status = nepaliVoiceBot.getStatus()
    setIsActive(status.isActive)
    setIsListening(status.isListening)
    setIsReading(status.isReading)
    setTrainingDataCount(status.trainingDataCount || 0)
  }, [onSearch, onNavigate])

  const handleVoiceToggle = () => {
    nepaliVoiceBot.toggle()
  }

  const handleStopSpeaking = () => {
    nepaliVoiceBot.stopSpeaking()
  }

  if (!isSupported) {
    return (
      <div className="relative">
        <Button
          size="sm"
          disabled
          className="p-2.5 rounded-xl bg-gray-300 text-gray-500 cursor-not-allowed"
          title="आवाज पहिचान यस ब्राउजरमा समर्थित छैन"
        >
          <MicOff className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Main Nepali Voice Button */}
      <div className="relative">
        <Button
          size="sm"
          onClick={handleVoiceToggle}
          className={`p-2.5 rounded-xl transition-all hover:scale-105 relative ${
            isActive
              ? isListening
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg ring-2 ring-red-300"
                : "bg-green-500 hover:bg-green-600 text-white shadow-lg ring-2 ring-green-300"
              : "bg-[#799584] hover:bg-[#6b8473] text-white"
          }`}
          title={
            isActive
              ? isListening
                ? "नेपाली आवाज सहायक सुनिरहेको छ - बन्द गर्न क्लिक गर्नुहोस्"
                : "नेपाली आवाज सहायक सक्रिय छ - बन्द गर्न क्लिक गर्नुहोस्"
              : "नेपाली आवाज सहायक सुरु गर्न क्लिक गर्नुहोस्"
          }
        >
          {isActive ? (
            isListening ? (
              <Mic className="w-4 h-4" />
            ) : (
              <MicOff className="w-4 h-4" />
            )
          ) : (
            <Mic className="w-4 h-4" />
          )}

          {/* Nepali flag indicator */}
          <div className="absolute -top-1 -left-1 w-4 h-3 bg-gradient-to-r from-blue-600 via-white to-red-600 rounded-sm text-xs flex items-center justify-center border border-gray-300">
            <span className="text-[8px] font-bold text-blue-800">🇳🇵</span>
          </div>

          {/* Active indicator */}
          {isActive && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>}

          {/* Listening indicator */}
          {isListening && <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>}

          {/* Reading indicator */}
          {isReading && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          )}
        </Button>

        {/* Training indicator */}
        {trainingDataCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommands(!showCommands)}
            className="absolute -top-2 -left-2 w-6 h-6 p-0 bg-purple-100 border border-purple-300 rounded-full hover:bg-purple-200 shadow-sm"
            title={`${trainingDataCount} प्रशिक्षित कमाण्डहरू`}
          >
            <Brain className="w-3 h-3 text-purple-600" />
          </Button>
        )}

        {/* Stop speaking button */}
        {isReading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStopSpeaking}
            className="absolute -bottom-2 -left-2 w-6 h-6 p-0 bg-white border border-gray-200 rounded-full hover:bg-gray-50 shadow-sm"
            title="बोल्न रोक्नुहोस्"
          >
            <Square className="w-3 h-3 text-gray-600" />
          </Button>
        )}
      </div>

      {/* Nepali Commands Dropdown */}
      {showCommands && (
        <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 min-w-80">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-4 bg-gradient-to-r from-blue-600 via-white to-red-600 rounded-sm border border-gray-300 flex items-center justify-center">
              <span className="text-xs">🇳🇵</span>
            </div>
            <span className="text-sm font-medium text-gray-700">नेपाली आवाज कमाण्डहरू</span>
            <div className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {trainingDataCount} प्रशिक्षित
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <div className="font-medium text-gray-800 mb-1">🔍 खोजी कमाण्डहरू:</div>
              <div className="text-gray-600 space-y-1">
                <div>• "ऋण खोज्नुहोस्"</div>
                <div>• "महिला कार्यक्रम खोज्नुहोस्"</div>
                <div>• "युवा कार्यक्रम खोज्नुहोस्"</div>
                <div>• "माइक्रोफाइनान्स खोज्नुहोस्"</div>
              </div>
            </div>

            <div>
              <div className="font-medium text-gray-800 mb-1">🧭 नेभिगेसन कमाण्डहरू:</div>
              <div className="text-gray-600 space-y-1">
                <div>• "इच्छा सूची खोल्नुहोस्"</div>
                <div>• "तुलना गर्नुहोस्"</div>
              </div>
            </div>

            <div>
              <div className="font-medium text-gray-800 mb-1">ℹ️ सहायता कमाण्डहरू:</div>
              <div className="text-gray-600 space-y-1">
                <div>• "सहायता" वा "मद्दत"</div>
                <div>• "बन्द गर्नुहोस्"</div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              AI द्वारा निरन्तर सिकिरहेको छ
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Nepali Voice Status Indicator */}
      {(isActive || isListening || isReading) && (
        <div className="absolute top-12 right-0 bg-gradient-to-r from-blue-900 to-red-900 text-white px-4 py-3 rounded-lg text-sm z-40 min-w-72 shadow-xl border border-gray-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 bg-gradient-to-r from-blue-600 via-white to-red-600 rounded-sm border border-gray-300 flex items-center justify-center">
                <span className="text-xs">🇳🇵</span>
              </div>
              <div className="text-xs font-medium text-gray-200">नेपाली आवाज सहायक</div>
              {trainingDataCount > 0 && (
                <div className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Brain className="w-3 h-3" />
                  {trainingDataCount}
                </div>
              )}
            </div>
            {isActive && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
          </div>

          {isListening && (
            <div className="flex items-center gap-2 text-green-300 mb-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="font-medium">म सुनिरहेको छु...</span>
            </div>
          )}

          {isReading && (
            <div className="flex items-center gap-2 text-blue-300 mb-2">
              <Volume2 className="w-3 h-3" />
              <span className="font-medium">बोलिरहेको छु...</span>
            </div>
          )}

          {isActive && !isListening && !isReading && (
            <div className="text-gray-200">
              <div className="font-medium mb-1">तयार छु!</div>
              <div className="text-xs">नेपालीमा बोल्नुहोस् वा 'सहायता' भन्नुहोस्</div>
            </div>
          )}

          {/* Quick Nepali commands */}
          {isActive && !isListening && !isReading && (
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="text-xs text-gray-300 mb-1">छिटो कमाण्डहरू:</div>
              <div className="text-xs space-y-1 text-gray-200">
                <div>• "ऋण खोज्नुहोस्"</div>
                <div>• "इच्छा सूची खोल्नुहोस्"</div>
                <div>• "सहायता"</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
