"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Flame, Zap, Target, CheckCircle, Sparkles, TrendingUp, Brain, Clock } from "lucide-react"

export function DashboardMockup() {
  const [speedValue, setSpeedValue] = useState(2)
  const [difficulty, setDifficulty] = useState(1)
  const [topicsMastered, setTopicsMastered] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleActivities, setVisibleActivities] = useState<number[]>([])
  const [showAiSuggestion, setShowAiSuggestion] = useState(false)
  const [aiThinking, setAiThinking] = useState(true)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Animate speed meter
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeedValue((prev) => {
        const newVal = prev + (Math.random() - 0.4) * 1.5
        return Math.max(2, Math.min(8, newVal))
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Animate difficulty
  useEffect(() => {
    const interval = setInterval(() => {
      setDifficulty((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(0, Math.min(3, prev + change))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animate progress bars
  useEffect(() => {
    const topicsInterval = setInterval(() => {
      setTopicsMastered((prev) => Math.min(47, prev + 1))
    }, 50)
    const xpInterval = setInterval(() => {
      setXpEarned((prev) => Math.min(340, prev + 5))
    }, 30)
    return () => {
      clearInterval(topicsInterval)
      clearInterval(xpInterval)
    }
  }, [])

  // Stagger activity feed
  useEffect(() => {
    const timeouts = [
      setTimeout(() => setVisibleActivities((prev) => [...prev, 0]), 800),
      setTimeout(() => setVisibleActivities((prev) => [...prev, 1]), 1600),
      setTimeout(() => setVisibleActivities((prev) => [...prev, 2]), 2400),
    ]
    return () => timeouts.forEach(clearTimeout)
  }, [])

  // AI suggestion animation
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowAiSuggestion(true)
      setTimeout(() => setAiThinking(false), 2000)
    }, 3000)
    return () => clearTimeout(showTimeout)
  }, [])

  // Stats counter animation
  useEffect(() => {
    const timeout = setTimeout(() => setStatsAnimated(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  // Mouse tracking for 3D tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  const getSpeedColor = () => {
    if (speedValue < 4) return "#10B981"
    if (speedValue < 6) return "#F59E0B"
    return "#EF4444"
  }

  const difficultyLabels = ["Easy", "Medium", "Hard", "Expert"]
  const difficultyColors = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"]

  const activities = [
    { icon: CheckCircle, text: "Completed: Quadratic Equations", color: "#10B981" },
    { icon: Zap, text: "Leveled Up: Algebra Pro", color: "#F59E0B" },
    { icon: Target, text: "New Unlock: Trigonometry", color: "#6366F1" },
  ]

  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Column - 40% */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your Personal Learning{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Command Center
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Every metric, every insight, every achievement—all in one powerful dashboard designed to accelerate your
                learning journey.
              </p>
            </div>

            {/* Animated Stats */}
            <div className="space-y-6">
              <StatCounter
                value={statsAnimated ? 2500000 : 0}
                suffix="+"
                label="Adaptive Lessons Generated"
                icon={Brain}
              />
              <StatCounter
                value={statsAnimated ? 98 : 0}
                suffix="%"
                label="Student Engagement Rate"
                icon={TrendingUp}
              />
              <StatCounter
                value={statsAnimated ? 4.8 : 0}
                suffix="★"
                label="Average Rating"
                icon={Sparkles}
                decimals={1}
              />
            </div>
          </div>

          {/* Right Column - 60% Dashboard Mockup */}
          <div
            ref={containerRef}
            className="lg:col-span-3"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg)`,
              }}
            >
              {/* MacOS Window Frame */}
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-slate-700/50">
                {/* Window Header */}
                <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="flex-1 text-center">
                    <span className="text-slate-400 text-sm">ThreadMill Dashboard</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/30 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Speed Meter */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors group">
                      <div className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Learning Speed
                      </div>
                      <div className="relative w-32 h-32 mx-auto">
                        {/* Gauge Background */}
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke="#334155"
                            strokeWidth="8"
                            strokeDasharray="264"
                            strokeDashoffset="66"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            fill="none"
                            stroke={getSpeedColor()}
                            strokeWidth="8"
                            strokeDasharray="264"
                            strokeDashoffset={264 - ((speedValue - 2) / 6) * 198}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                            style={{
                              filter: `drop-shadow(0 0 8px ${getSpeedColor()})`,
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span
                            className="text-3xl font-bold transition-colors duration-500"
                            style={{ color: getSpeedColor() }}
                          >
                            {speedValue.toFixed(1)}
                          </span>
                          <span className="text-slate-500 text-xs">concepts/hr</span>
                        </div>
                      </div>
                    </div>

                    {/* Difficulty Incline */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                      <div className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Difficulty Level
                      </div>
                      <div className="relative h-32 flex items-end justify-center">
                        {/* 3D Incline Visualization */}
                        <div
                          className="w-full h-24 relative transition-transform duration-700"
                          style={{
                            transform: `perspective(200px) rotateX(${50 - difficulty * 10}deg)`,
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-lg transition-colors duration-500"
                            style={{
                              background: `linear-gradient(135deg, ${difficultyColors[difficulty]}40, ${difficultyColors[difficulty]}10)`,
                              borderBottom: `3px solid ${difficultyColors[difficulty]}`,
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className="text-lg font-bold transition-colors duration-500"
                              style={{ color: difficultyColors[difficulty] }}
                            >
                              {difficultyLabels[difficulty]}
                            </span>
                          </div>
                        </div>
                        {/* Level indicators */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-slate-500">
                          {difficultyLabels.map((label, i) => (
                            <span
                              key={label}
                              className={`transition-colors duration-300 ${i === difficulty ? "text-white" : ""}`}
                            >
                              {label[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors space-y-4">
                      <ProgressBar
                        label="Topics Mastered"
                        value={topicsMastered}
                        max={100}
                        color="#6366F1"
                        icon={Target}
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-slate-400 text-xs">Current Streak</div>
                          <div className="text-white font-bold flex items-center gap-1">
                            12 days
                            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                          </div>
                        </div>
                      </div>
                      <ProgressBar
                        label="XP Earned Today"
                        value={xpEarned}
                        max={500}
                        color="#10B981"
                        icon={Zap}
                        glowing={xpEarned > 300}
                      />
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/50 transition-colors">
                      <div className="text-slate-400 text-sm mb-3">Recent Activity</div>
                      <div className="space-y-2 overflow-hidden">
                        {activities.map((activity, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 p-2 rounded-lg bg-slate-700/30 transition-all duration-500 ${
                              visibleActivities.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            }`}
                          >
                            <activity.icon className="w-4 h-4" style={{ color: activity.color }} />
                            <span className="text-white text-xs">{activity.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Suggestion Box */}
                  <div
                    className={`mt-4 transition-all duration-500 ${
                      showAiSuggestion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-purple-400 text-xs mb-1">AI Suggestion</div>
                          {aiThinking ? (
                            <div className="flex items-center gap-1">
                              <div
                                className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              />
                              <div
                                className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              />
                            </div>
                          ) : (
                            <p className="text-white text-sm">
                              Review fractions before starting ratios for better comprehension
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCounter({
  value,
  suffix,
  label,
  icon: Icon,
  decimals = 0,
}: {
  value: number
  suffix: string
  label: string
  icon: React.ElementType
  decimals?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (value === 0) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [value])

  const formatValue = (val: number) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + "M"
    if (val >= 1000) return (val / 1000).toFixed(1) + "K"
    return decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString()
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <div>
        <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {formatValue(displayValue)}
          {suffix}
        </div>
        <div className="text-slate-400 text-sm">{label}</div>
      </div>
    </div>
  )
}

function ProgressBar({
  label,
  value,
  max,
  color,
  icon: Icon,
  glowing = false,
}: {
  label: string
  value: number
  max: number
  color: string
  icon: React.ElementType
  glowing?: boolean
}) {
  const percentage = (value / max) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-3 h-3" style={{ color }} />
          </div>
          <span className="text-slate-400 text-xs">{label}</span>
        </div>
        <span className="text-white text-xs font-medium">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: glowing ? `0 0 12px ${color}` : "none",
          }}
        />
      </div>
    </div>
  )
}
