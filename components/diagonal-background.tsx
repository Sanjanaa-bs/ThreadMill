"use client"

import { useEffect, useState } from "react"

export function DiagonalBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 transition-all duration-500" style={{ background: "var(--gradient-bg)" }}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-all duration-500"
          style={{
            background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)",
            top: "10%",
            left: "20%",
            transform: `translate(${Math.sin(scrollY * 0.001) * 20}px, ${Math.cos(scrollY * 0.001) * 20}px)`,
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 transition-all duration-500"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
            transform: `translate(${Math.cos(scrollY * 0.001) * 30}px, ${Math.sin(scrollY * 0.001) * 30}px)`,
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-10 transition-all duration-500"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            top: "50%",
            left: "60%",
            transform: `translate(${Math.sin(scrollY * 0.002) * 15}px, ${Math.cos(scrollY * 0.002) * 15}px)`,
          }}
        />

        {/* Floating particles - use foreground color with low opacity */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: "var(--muted-foreground)",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
