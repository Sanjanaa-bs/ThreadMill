"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const badges = [
  {
    id: "first-step",
    name: "First Step",
    tier: "Bronze",
    icon: "🚀",
    requirement: "Complete your first lesson",
    color: "from-amber-700 to-amber-500",
    glow: "shadow-amber-500/50",
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    tier: "Silver",
    icon: "⚡",
    requirement: "Complete 5 lessons in one hour",
    color: "from-slate-400 to-slate-200",
    glow: "shadow-slate-300/50",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    tier: "Gold",
    icon: "🔥",
    requirement: "Maintain a 7-day learning streak",
    color: "from-yellow-500 to-yellow-300",
    glow: "shadow-yellow-400/50",
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    tier: "Platinum",
    icon: "💎",
    requirement: "Score 100% on 10 quizzes",
    color: "from-cyan-400 to-cyan-200",
    glow: "shadow-cyan-300/50",
  },
  {
    id: "knowledge-weaver",
    name: "Knowledge Weaver",
    tier: "Diamond",
    icon: "🕸️",
    requirement: "Complete an entire learning thread",
    color: "from-violet-400 to-pink-300",
    glow: "shadow-violet-400/50",
  },
  {
    id: "ai-prodigy",
    name: "AI Prodigy",
    tier: "Legendary",
    icon: "🧠",
    requirement: "Master all AI-suggested topics",
    color: "from-orange-500 via-pink-500 to-purple-500",
    glow: "shadow-pink-500/50",
  },
]

const leaderboard = [
  { rank: 1, name: "Alex_Learns", xp: 12450, badge: "👑", isCurrentUser: false },
  { rank: 2, name: "CodeMaster", xp: 11890, badge: "🥈", isCurrentUser: false },
  { rank: 3, name: "MathWhiz", xp: 11200, badge: "🥉", isCurrentUser: false },
  { rank: 4, name: "BrainGainer", xp: 10500, badge: "", isCurrentUser: true },
  { rank: 5, name: "QuickLearner", xp: 9800, badge: "", isCurrentUser: false },
]

// Generate last 30 days streak data
const generateStreakData = () => {
  const days = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    days.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      active: Math.random() > 0.3,
      isToday: i === 0,
    })
  }
  // Ensure current streak of 12 days
  for (let i = 0; i < 12; i++) {
    days[days.length - 1 - i].active = true
  }
  return days
}

const streakData = generateStreakData()

export function AchievementArcade() {
  const [selectedBadge, setSelectedBadge] = useState<(typeof badges)[0] | null>(null)
  const [xpProgress, setXpProgress] = useState(0)
  const [displayedXp, setDisplayedXp] = useState(0)
  const [leaderboardVisible, setLeaderboardVisible] = useState<boolean[]>([])
  const [streakVisible, setStreakVisible] = useState<boolean[]>([])
  const [hoveredLeaderEntry, setHoveredLeaderEntry] = useState<number | null>(null)

  useEffect(() => {
    // Animate XP progress
    const xpTimer = setTimeout(() => {
      setXpProgress(84.5)
    }, 500)

    // Animate XP counter
    const targetXp = 8450
    const duration = 2000
    const steps = 60
    const increment = targetXp / steps
    let current = 0
    const xpCounterInterval = setInterval(() => {
      current += increment
      if (current >= targetXp) {
        setDisplayedXp(targetXp)
        clearInterval(xpCounterInterval)
      } else {
        setDisplayedXp(Math.floor(current))
      }
    }, duration / steps)

    // Stagger leaderboard entries
    leaderboard.forEach((_, index) => {
      setTimeout(
        () => {
          setLeaderboardVisible((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        },
        800 + index * 200,
      )
    })

    // Stagger streak calendar dots
    streakData.forEach((_, index) => {
      setTimeout(
        () => {
          setStreakVisible((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        },
        1500 + index * 50,
      )
    })

    return () => {
      clearTimeout(xpTimer)
      clearInterval(xpCounterInterval)
    }
  }, [])

  const currentStreak = streakData.filter((d, i) => {
    const reverseIndex = streakData.length - 1 - i
    return reverseIndex < 12 && d.active
  }).length

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Tron-style grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated starfield */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              textShadow: "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)",
            }}
          >
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              ACHIEVEMENT ARCADE
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Level up your learning journey</p>
        </div>

        {/* Three panels layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Panel 1: Badge Showcase */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-6 shadow-2xl shadow-violet-500/10">
            <h3
              className="text-xl font-bold text-violet-400 mb-6 text-center"
              style={{ textShadow: "0 0 10px rgba(139, 92, 246, 0.5)" }}
            >
              Unlock Achievements
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className="group relative aspect-square rounded-xl bg-slate-800/50 border border-slate-700 hover:border-violet-500/50 transition-all duration-300 flex items-center justify-center cursor-pointer overflow-hidden"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Badge glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${badge.color} blur-xl`}
                  />

                  {/* Badge icon with rotation */}
                  <div
                    className="relative text-3xl group-hover:scale-125 transition-transform duration-300"
                    style={{
                      animation: "badgeSpin 8s linear infinite",
                    }}
                  >
                    {badge.icon}
                  </div>

                  {/* Tier indicator */}
                  <div
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${badge.color} text-slate-900`}
                  >
                    {badge.tier}
                  </div>

                  {/* Hover tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                    <div className="bg-slate-800 border border-violet-500/50 rounded-lg px-3 py-2 whitespace-nowrap">
                      <p className="text-xs font-bold text-white">{badge.name}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Panel 2: XP Progress */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-500/10 flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              {/* Orbiting particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    left: "50%",
                    top: "50%",
                    animation: `orbit ${3 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                    boxShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                  }}
                />
              ))}

              {/* Progress ring background */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(51, 65, 85, 0.5)" strokeWidth="8" />
                {/* Progress ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#xpGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${xpProgress * 2.83} 283`}
                  className="transition-all ease-out"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.8))",
                    transitionDuration: "2000ms",
                  }}
                />
                <defs>
                  <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm text-slate-400">Level</span>
                <span
                  className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                >
                  42
                </span>
              </div>
            </div>

            {/* XP counter */}
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-white">
                <span className="text-cyan-400">{displayedXp.toLocaleString()}</span>
                <span className="text-slate-500"> / 10,000 XP</span>
              </p>
              <p className="text-sm text-slate-400 mt-1">1,550 XP to next level</p>
            </div>
          </div>

          {/* Panel 3: Leaderboard */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-6 shadow-2xl shadow-amber-500/10">
            <h3
              className="text-xl font-bold text-amber-400 mb-6 text-center"
              style={{ textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}
            >
              Top Learners This Week
            </h3>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.rank}
                  className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-500 cursor-pointer ${
                    leaderboardVisible[index] ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  } ${entry.isCurrentUser ? "bg-violet-500/20 border border-violet-500/50 shadow-lg shadow-violet-500/20" : "bg-slate-800/50 hover:bg-slate-700/50"}`}
                  onMouseEnter={() => setHoveredLeaderEntry(index)}
                  onMouseLeave={() => setHoveredLeaderEntry(null)}
                >
                  {/* Rank */}
                  <div className="w-8 text-center">
                    {entry.badge ? (
                      <span className="text-xl">{entry.badge}</span>
                    ) : (
                      <span className="text-slate-500 font-bold">{entry.rank}</span>
                    )}
                  </div>

                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {entry.name[0]}
                  </div>

                  {/* Name and XP */}
                  <div className="flex-1">
                    <p className={`font-semibold ${entry.isCurrentUser ? "text-violet-300" : "text-white"}`}>
                      {entry.name}
                      {entry.isCurrentUser && <span className="text-xs text-violet-400 ml-2">(You)</span>}
                    </p>
                    <p className="text-sm text-amber-400">{entry.xp.toLocaleString()} XP</p>
                  </div>

                  {/* Hover tooltip with achievements */}
                  {hoveredLeaderEntry === index && (
                    <div className="absolute -left-4 top-full mt-2 z-20 bg-slate-800 border border-violet-500/50 rounded-lg p-3 shadow-xl min-w-[200px]">
                      <p className="text-xs text-slate-400 mb-2">Recent Achievements:</p>
                      <div className="flex gap-2">
                        <span className="text-lg">🔥</span>
                        <span className="text-lg">⚡</span>
                        <span className="text-lg">💎</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Streak Tracker */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-6 shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center justify-between mb-6">
            <h3
              className="text-xl font-bold text-emerald-400"
              style={{ textShadow: "0 0 10px rgba(16, 185, 129, 0.5)" }}
            >
              Learning Streak
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl animate-pulse">🔥</span>
              <span className="text-2xl font-bold text-white">{currentStreak} Days</span>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-10 sm:grid-cols-15 gap-2">
            {streakData.map((day, index) => (
              <div key={index} className="group relative">
                <div
                  className={`w-full aspect-square rounded-md transition-all duration-300 ${
                    streakVisible[index] ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  } ${
                    day.active
                      ? day.isToday
                        ? "bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/50"
                        : "bg-emerald-500/70"
                      : "bg-slate-700/50"
                  }`}
                  style={{
                    transitionDelay: `${index * 30}ms`,
                  }}
                />
                {day.isToday && <span className="absolute -top-1 -right-1 text-xs">🔥</span>}

                {/* Day tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-slate-800 border border-slate-600 rounded px-2 py-1 whitespace-nowrap">
                    <p className="text-xs text-white">{day.date}</p>
                    <p className="text-xs text-slate-400">{day.active ? "Active" : "Missed"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Badge Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="relative bg-slate-900 border border-violet-500/50 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-violet-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div
                className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${selectedBadge.color} flex items-center justify-center shadow-2xl ${selectedBadge.glow}`}
              >
                <span className="text-5xl">{selectedBadge.icon}</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">{selectedBadge.name}</h4>
              <p
                className={`text-sm font-semibold bg-gradient-to-r ${selectedBadge.color} bg-clip-text text-transparent mb-4`}
              >
                {selectedBadge.tier} Tier
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <p className="text-sm text-slate-400 mb-1">How to unlock:</p>
                <p className="text-white">{selectedBadge.requirement}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
