"use client"

import { useState, useEffect, useCallback } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [isRotating, setIsRotating] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [showSunRays, setShowSunRays] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("threadmill-theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("light-mode", savedTheme === "light")
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"

    // Start rotation animation
    setIsRotating(true)

    // Show transition effect
    if (newTheme === "dark") {
      setShowStars(true)
      setTimeout(() => setShowStars(false), 1500)
    } else {
      setShowSunRays(true)
      setTimeout(() => setShowSunRays(false), 1500)
    }

    // Update theme
    setTheme(newTheme)
    localStorage.setItem("threadmill-theme", newTheme)
    document.documentElement.classList.toggle("light-mode", newTheme === "light")

    // Stop rotation after animation
    setTimeout(() => setIsRotating(false), 500)
  }, [theme])

  if (!mounted) return null

  return (
    <>
      {/* Stars appearing animation (dark mode transition) */}
      {showStars && (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animation: `starAppear 1.5s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun rays animation (light mode transition) */}
      {showSunRays && (
        <div className="fixed inset-0 pointer-events-none z-[9998] flex items-center justify-center">
          <div className="relative">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-[200vh] w-1 bg-gradient-to-b from-amber-300/60 via-amber-200/30 to-transparent"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                  animation: `sunRayExpand 1.5s ease-out forwards`,
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0,
                }}
              />
            ))}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-amber-300/40 blur-xl"
              style={{
                animation: `sunCoreExpand 1.5s ease-out forwards`,
              }}
            />
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-[9999] p-3 rounded-full backdrop-blur-md border transition-all duration-500 group"
        style={{
          background: theme === "dark" ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
          borderColor: theme === "dark" ? "rgba(99, 102, 241, 0.5)" : "rgba(59, 130, 246, 0.5)",
          boxShadow: theme === "dark" ? "0 0 20px rgba(99, 102, 241, 0.3)" : "0 0 20px rgba(251, 191, 36, 0.3)",
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <div
          className="relative w-6 h-6 transition-transform duration-500"
          style={{
            transform: isRotating ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          {theme === "dark" ? (
            <Moon className="w-6 h-6 text-indigo-400 transition-all duration-300 group-hover:text-indigo-300" />
          ) : (
            <Sun className="w-6 h-6 text-amber-500 transition-all duration-300 group-hover:text-amber-400" />
          )}
        </div>

        {/* Glow ring on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)",
          }}
        />
      </button>
    </>
  )
}
