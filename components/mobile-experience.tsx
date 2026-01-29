"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { WifiOff, Download, Check, Mic, Clock, Smartphone, Bell } from "lucide-react"

export function MobileExperience() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-slate-900 to-blue-900/30" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6 border border-purple-500/30">
            Mobile First
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-sans">
            Learn Anywhere,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Anytime</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Your learning journey continues on the go with our powerful mobile experience
          </p>
        </div>

        {/* Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 mb-24">
          <PhoneMockup variant="quiz" className="lg:-rotate-6 lg:translate-y-8" />
          <PhoneMockup variant="offline" className="lg:scale-110 lg:z-10" />
          <PhoneMockup variant="notifications" className="lg:rotate-6 lg:translate-y-8" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<WifiOff className="w-6 h-6" />}
            title="Offline Learning"
            description="Download lessons and learn without internet connection"
            color="purple"
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Smart Reminders"
            description="AI-powered notifications at your optimal learning times"
            color="blue"
          />
          <FeatureCard
            icon={<Smartphone className="w-6 h-6" />}
            title="Swipe-to-Answer"
            description="Intuitive gesture controls for quick quiz responses"
            color="emerald"
          />
          <FeatureCard
            icon={<Mic className="w-6 h-6" />}
            title="Voice Input"
            description="Hands-free learning with voice commands and answers"
            color="amber"
          />
        </div>
      </div>
    </section>
  )
}

function PhoneMockup({
  variant,
  className = "",
}: { variant: "quiz" | "offline" | "notifications"; className?: string }) {
  return (
    <div className={`relative transition-all duration-500 hover:scale-105 ${className}`}>
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl shadow-purple-500/20 border border-slate-700">
        {/* Screen bezel */}
        <div className="relative w-full h-full bg-slate-950 rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />

          {/* Screen Content */}
          <div className="relative w-full h-full">
            {variant === "quiz" && <QuizScreen />}
            {variant === "offline" && <OfflineScreen />}
            {variant === "notifications" && <NotificationScreen />}
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-sm font-medium text-slate-400">
          {variant === "quiz" && "Quick Learning Mode"}
          {variant === "offline" && "Offline Mode"}
          {variant === "notifications" && "Smart Notifications"}
        </span>
      </div>
    </div>
  )
}

function QuizScreen() {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [showSwipe, setShowSwipe] = useState(true)

  const questions = [
    { q: "What is 7 x 8?", options: ["54", "56", "58", "62"], correct: 1 },
    { q: "√144 = ?", options: ["10", "11", "12", "14"], correct: 2 },
    { q: "15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      if (answered === null) {
        const correct = questions[currentQuestion].correct
        setAnswered(correct)
        setScore((s) => s + 1)

        setTimeout(() => {
          setAnswered(null)
          setCurrentQuestion((c) => (c + 1) % questions.length)
        }, 1500)
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [answered, currentQuestion])

  useEffect(() => {
    const swipeTimer = setInterval(() => {
      setShowSwipe((s) => !s)
    }, 2000)
    return () => clearInterval(swipeTimer)
  }, [])

  const current = questions[currentQuestion]

  return (
    <div className="h-full bg-gradient-to-b from-indigo-900 to-slate-900 pt-14 px-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-white font-semibold text-sm">5-Min Sprint</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/50">
          <span className="text-purple-300 text-sm font-bold">{score}/3</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-slate-800/50 rounded-2xl p-4 mb-4 border border-slate-700">
        <p className="text-white text-lg font-medium text-center">{current.q}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {current.options.map((opt, i) => (
          <button
            key={i}
            className={`p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              answered === i
                ? i === current.correct
                  ? "bg-emerald-500 text-white scale-105"
                  : "bg-red-500 text-white"
                : answered !== null && i === current.correct
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {opt}
              {answered === i && i === current.correct && <Check className="w-5 h-5 animate-bounce" />}
            </span>
          </button>
        ))}
      </div>

      {/* Swipe hint */}
      <div
        className={`mt-6 flex items-center justify-center gap-2 transition-opacity duration-500 ${showSwipe ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-12 h-1 bg-slate-600 rounded-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-4 bg-purple-400 rounded-full animate-[swipeHint_1.5s_ease-in-out_infinite]" />
        </div>
        <span className="text-slate-500 text-xs">Swipe to answer</span>
      </div>
    </div>
  )
}

function OfflineScreen() {
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [downloaded, setDownloaded] = useState([false, false, false])

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadProgress((p) => {
        if (p >= 100) {
          return 0
        }
        return p + 2
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (downloadProgress === 33) setDownloaded([true, false, false])
    if (downloadProgress === 66) setDownloaded([true, true, false])
    if (downloadProgress === 100) setDownloaded([true, true, true])
    if (downloadProgress === 0) setDownloaded([false, false, false])
  }, [downloadProgress])

  const lessons = [
    { title: "Algebra Basics", size: "12 MB" },
    { title: "Linear Equations", size: "8 MB" },
    { title: "Quadratic Functions", size: "15 MB" },
  ]

  return (
    <div className="h-full bg-gradient-to-b from-slate-800 to-slate-900 pt-14 px-4 pb-4">
      {/* Status bar with airplane mode */}
      <div className="absolute top-14 right-4 flex items-center gap-1">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
        </svg>
        <WifiOff className="w-4 h-4 text-slate-400" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Download className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Offline Mode</h3>
          <p className="text-slate-400 text-xs">Learn without internet</p>
        </div>
      </div>

      {/* Download progress */}
      <div className="bg-slate-800/80 rounded-xl p-4 mb-4 border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 text-sm">Downloading lessons...</span>
          <span className="text-blue-400 text-sm font-medium">{downloadProgress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {lessons.map((lesson, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
              downloaded[i] ? "bg-emerald-500/10 border-emerald-500/30" : "bg-slate-800/50 border-slate-700"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                downloaded[i] ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              {downloaded[i] ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Download className="w-4 h-4 text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{lesson.title}</p>
              <p className="text-slate-500 text-xs">{lesson.size}</p>
            </div>
            {downloaded[i] && <span className="text-emerald-400 text-xs font-medium">Ready</span>}
          </div>
        ))}
      </div>

      {/* Status message */}
      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm">{downloaded.filter(Boolean).length} of 3 lessons ready</p>
        <p className="text-emerald-400 text-xs mt-1">Available offline</p>
      </div>
    </div>
  )
}

function NotificationScreen() {
  const [visibleNotifications, setVisibleNotifications] = useState<number[]>([])

  const notifications = [
    {
      icon: "🔥",
      title: "Don't break your streak!",
      body: "You're on a 12-day learning streak!",
      time: "now",
      color: "orange",
    },
    { icon: "🎯", title: "Almost there!", body: "You're 80% through Algebra basics!", time: "2m ago", color: "blue" },
    { icon: "💡", title: "New topic unlocked!", body: "Geometry is now available", time: "5m ago", color: "purple" },
  ]

  useEffect(() => {
    const showNotifications = () => {
      setVisibleNotifications([])

      setTimeout(() => setVisibleNotifications([0]), 500)
      setTimeout(() => setVisibleNotifications([0, 1]), 1500)
      setTimeout(() => setVisibleNotifications([0, 1, 2]), 2500)
      setTimeout(() => setVisibleNotifications([]), 5000)
    }

    showNotifications()
    const interval = setInterval(showNotifications, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full bg-gradient-to-b from-purple-900/50 to-slate-900 pt-14 px-3 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Bell className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">Smart Notifications</h3>
          <p className="text-slate-400 text-xs">AI-powered reminders</p>
        </div>
      </div>

      {/* Notification stack */}
      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <div
            key={i}
            className={`transform transition-all duration-500 ease-out ${
              visibleNotifications.includes(i)
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-4 opacity-0 scale-95"
            }`}
          >
            <div
              className={`bg-slate-800/90 backdrop-blur-sm rounded-2xl p-3 border border-slate-700 shadow-lg ${
                i === 0 ? "ring-2 ring-orange-500/30" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    notif.color === "orange"
                      ? "bg-orange-500/20"
                      : notif.color === "blue"
                        ? "bg-blue-500/20"
                        : "bg-purple-500/20"
                  }`}
                >
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-semibold truncate">{notif.title}</p>
                    <span className="text-slate-500 text-xs ml-2">{notif.time}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{notif.body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state when notifications hidden */}
      {visibleNotifications.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 opacity-50">
          <Bell className="w-12 h-12 text-slate-600 mb-3" />
          <p className="text-slate-500 text-sm">Waiting for notifications...</p>
        </div>
      )}

      {/* Bottom stats */}
      <div className="absolute bottom-8 left-3 right-3">
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Notifications today</span>
            <span className="text-purple-400 font-semibold">12</span>
          </div>
          <div className="flex items-center justify-between text-xs mt-2">
            <span className="text-slate-400">Engagement rate</span>
            <span className="text-emerald-400 font-semibold">94%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: "purple" | "blue" | "emerald" | "amber"
}) {
  const colorClasses = {
    purple: "bg-purple-500/10 border-purple-500/30 hover:border-purple-400/50 text-purple-400",
    blue: "bg-blue-500/10 border-blue-500/30 hover:border-blue-400/50 text-blue-400",
    emerald: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-400/50 text-emerald-400",
    amber: "bg-amber-500/10 border-amber-500/30 hover:border-amber-400/50 text-amber-400",
  }

  const iconBg = {
    purple: "bg-purple-500/20",
    blue: "bg-blue-500/20",
    emerald: "bg-emerald-500/20",
    amber: "bg-amber-500/20",
  }

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${colorClasses[color]}`}>
      <div className={`w-12 h-12 rounded-xl ${iconBg[color]} flex items-center justify-center mb-4`}>{icon}</div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
