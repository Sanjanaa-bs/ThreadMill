"use client"

import { useState, useEffect } from "react"

export function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Complete loading after progress reaches 100
    const timeout = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setLoading(false), 500)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-[200] bg-[#0F172A] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated logo */}
      <div className="relative mb-8">
        {/* Particle effects */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? "#6366F1" : "#10B981",
              animation: `orbit ${2 + i * 0.2}s linear infinite`,
              animationDelay: `${i * 0.1}s`,
              transformOrigin: "center center",
              left: "50%",
              top: "50%",
              marginLeft: "-4px",
              marginTop: "-4px",
            }}
          />
        ))}
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#10B981] flex items-center justify-center animate-pulse">
          <span className="text-white font-bold text-4xl">T</span>
        </div>
      </div>

      {/* Brand name */}
      <h1 className="text-2xl font-bold text-white mb-8 tracking-wider">ThreadMill</h1>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #6366F1 0%, #10B981 100%)",
          }}
        />
      </div>

      {/* Loading text */}
      <p className="text-white/50 text-sm mt-4">Loading your learning experience...</p>
    </div>
  )
}
