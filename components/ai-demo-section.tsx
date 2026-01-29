"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { generateLearningPath } from "@/app/actions/generate-learning-path"
import {
  Sparkles,
  Brain,
  Clock,
  BookOpen,
  Lightbulb,
  Code,
  RefreshCw,
  ChevronDown,
  Zap,
  AlertCircle,
} from "lucide-react"

interface LearningPathItem {
  week: number
  topic: string
  hours: number
  description: string
}

interface FirstLesson {
  title: string
  explanation: string
  codeExample: string | null
  practiceQuestions: string[]
}

interface Recommendation {
  topic: string
  reason: string
}

interface AIResponse {
  learningPath: LearningPathItem[]
  firstLesson: FirstLesson
  recommendations: Recommendation[]
  isDemo: boolean
  message: string | null
}

export function AIDemoSection() {
  const [subject, setSubject] = useState("Python")
  const [level, setLevel] = useState("Beginner")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const [demoMessage, setDemoMessage] = useState<string | null>(null)

  const subjects = ["Python", "Mathematics", "English", "Data Science", "JavaScript", "Physics"]
  const levels = ["Beginner", "Intermediate", "Advanced"]

  const typewriterEffect = (text: string, callback: () => void) => {
    setIsTyping(true)
    let i = 0
    setDisplayedText("")
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        callback()
      }
    }, 15)
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    setExpandedTopic(null)
    setIsDemo(false)
    setDemoMessage(null)

    const response = await generateLearningPath(subject, level)

    if (response.success && response.data) {
      if (response.isDemo) {
        setIsDemo(true)
        setDemoMessage(response.message || null)
      }
      typewriterEffect(response.data.firstLesson.explanation, () => {
        setResult(response.data)
      })
    } else {
      setError(response.error || "Something went wrong")
    }

    setIsLoading(false)
  }

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Neural network lines */}
        {isLoading && (
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="#6366F1"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
              />
            ))}
          </svg>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Powered by Google Gemini</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 font-heading">
            Watch AI Adapt to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              YOU
            </span>{" "}
            in Real-Time
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Not just promises. Try our AI right now and see how it creates a personalized path just for you.
          </p>
        </motion.div>

        <AnimatePresence>
          {isDemo && demoMessage && (
            <motion.div
              className="mb-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-amber-300 text-sm">{demoMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Control Panel */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Configure Your Path
              </h3>

              {/* Subject Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Subject</label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Level Dropdown */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Current Level</label>
                <div className="relative">
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {levels.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full relative group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-xl px-6 py-4 flex items-center justify-center gap-3 font-semibold text-white">
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Brain className="w-5 h-5" />
                      </motion.div>
                      <span>AI is thinking...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Generate My Learning Path</span>
                    </>
                  )}
                </div>
              </motion.button>

              {/* Loading Animation */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="mt-6 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400 text-sm">Analyzing your needs...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error State */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className="text-red-400 text-center">{error}</p>
                    <button
                      onClick={handleGenerate}
                      className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-red-300 hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side - Results Display */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {!result && !isLoading && !isTyping && (
                <motion.div
                  className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/30 border-dashed p-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">
                    Select your subject and level, then click generate to see AI magic
                  </p>
                </motion.div>
              )}

              {(isTyping || result) && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Card 1: Learning Path */}
                  <motion.div
                    className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        Personalized Learning Path
                      </h4>
                      {isDemo && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                          Demo Mode
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500" />

                      <div className="space-y-4">
                        {(result?.learningPath || []).map((item, index) => (
                          <motion.div
                            key={index}
                            className="relative pl-14"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            {/* Timeline dot */}
                            <div className="absolute left-3 top-2 w-5 h-5 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-purple-400" />
                            </div>

                            <div
                              className={`bg-slate-800/50 rounded-xl p-4 cursor-pointer transition-all ${
                                expandedTopic === index ? "ring-2 ring-purple-500" : "hover:bg-slate-800/70"
                              }`}
                              onClick={() => setExpandedTopic(expandedTopic === index ? null : index)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="text-purple-400 text-sm font-medium">Week {item.week}</span>
                                  <h5 className="text-white font-semibold">{item.topic}</h5>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm">{item.hours} hrs</span>
                                </div>
                              </div>

                              <AnimatePresence>
                                {expandedTopic === index && (
                                  <motion.p
                                    className="mt-3 text-slate-400 text-sm"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                  >
                                    {item.description}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: First Lesson Preview */}
                  <motion.div
                    className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        AI-Generated First Lesson
                      </h4>
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                        Difficulty: Adjusted for {level}
                      </span>
                    </div>

                    {result?.firstLesson ? (
                      <>
                        <h5 className="text-lg font-semibold text-white mb-3">{result.firstLesson.title}</h5>
                        <p className="text-slate-300 mb-4">{result.firstLesson.explanation}</p>

                        {result.firstLesson.codeExample && result.firstLesson.codeExample !== "null" && (
                          <div className="bg-slate-950 rounded-xl p-4 mb-4 overflow-x-auto">
                            <pre className="text-sm text-green-400 font-mono">
                              <code>{result.firstLesson.codeExample}</code>
                            </pre>
                          </div>
                        )}

                        <div className="border-t border-slate-700 pt-4 mt-4">
                          <h6 className="text-sm font-semibold text-slate-300 mb-3">Practice Questions:</h6>
                          <ul className="space-y-2">
                            {result.firstLesson.practiceQuestions.map((q, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start gap-3 text-slate-400"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              >
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm shrink-0">
                                  {i + 1}
                                </span>
                                {q}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <div className="text-slate-400">
                        <span className="border-r-2 border-purple-400">{displayedText}</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Card 3: Smart Recommendations */}
                  {result && (
                    <motion.div
                      className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                        Smart Recommendations
                      </h4>
                      <p className="text-slate-400 mb-4">Students like you also mastered:</p>

                      <div className="grid gap-3">
                        {result.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 cursor-pointer transition-all group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                                {rec.topic}
                              </span>
                              <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                                Click to add
                              </span>
                            </div>
                            <p className="text-sm text-slate-400 mt-1">{rec.reason}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
