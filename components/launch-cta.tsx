"use client"

import { useState, useEffect, useRef } from "react"
import { Check } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "High School Student",
    image: "/asian-female-student-portrait.png",
    quote: "ThreadMill helped me ace my AP exams. The AI knew exactly what I needed to focus on!",
  },
  {
    name: "Marcus Johnson",
    role: "Career Changer",
    image: "/black-male-professional-portrait.png",
    quote: "Went from zero coding knowledge to landing my first dev job in 6 months.",
  },
  {
    name: "Emily Rodriguez",
    role: "Graduate Student",
    image: "/latina-female-graduate-student-portrait.jpg",
    quote: "The personalized learning paths are incredible. It's like having a private tutor 24/7.",
  },
  {
    name: "David Kim",
    role: "Working Professional",
    image: "/korean-male-professional-portrait.jpg",
    quote: "I study during my commute with offline mode. Already completed 3 certifications!",
  },
  {
    name: "Aisha Patel",
    role: "College Freshman",
    image: "/indian-female-college-student-portrait.jpg",
    quote: "The gamification keeps me motivated. I've maintained a 90-day streak!",
  },
]

const trustIndicators = [
  "No Credit Card Required",
  "AI-Powered Adaptation",
  "Works Offline",
  "1M+ Lessons Generated",
  "98% Satisfaction",
]

export function LaunchCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Trigger animation sequence
          const steps = [0, 1, 2, 3, 4, 5, 6]
          steps.forEach((step, i) => {
            setTimeout(() => setAnimationStep(step + 1), i * 300)
          })
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rocketRef.current) {
        const rect = rocketRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        setMousePos({
          x: (e.clientX - centerX) / 50,
          y: (e.clientY - centerY) / 50,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleLaunch = () => {
    setIsLaunching(true)
    setTimeout(() => {
      setIsLaunching(false)
    }, 3000)
  }

  // Generate stars with fixed positions
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    width: (i % 3) + 1,
    left: (i * 17) % 100,
    top: (i * 23) % 100,
    opacity: 0.2 + (i % 8) * 0.1,
    delay: (i % 20) * 0.1,
    duration: 2 + (i % 3),
  }))

  return (
    <section ref={sectionRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1e1b4b] to-[#0F172A]">
        {/* Static stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.width + "px",
              height: star.width + "px",
              left: star.left + "%",
              top: star.top + "%",
              opacity: animationStep >= 1 ? star.opacity : 0,
              transition: `opacity ${star.duration}s ease ${star.delay}s`,
              animation: animationStep >= 1 ? `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s` : "none",
            }}
          />
        ))}

        {/* Shooting stars */}
        {animationStep >= 1 &&
          [0, 1, 2].map((i) => (
            <div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 15}%`,
                boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
                animation: `shootingStar 4s linear infinite ${i * 1.5}s`,
              }}
            />
          ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Rocket */}
        <div
          ref={rocketRef}
          className="flex justify-center mb-12"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <div
            className={`relative transition-all duration-1000 ${
              animationStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
            } ${isLaunching ? "-translate-y-[200vh]" : ""}`}
          >
            {/* Rocket SVG */}
            <svg width="120" height="200" viewBox="0 0 120 200" className="drop-shadow-2xl">
              {/* Rocket body */}
              <defs>
                <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
                <linearGradient id="rocketNose" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
                <linearGradient id="flame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>

              {/* Nose cone */}
              <path d="M60 0 L80 50 L40 50 Z" fill="url(#rocketNose)" />

              {/* Main body */}
              <rect x="40" y="50" width="40" height="100" fill="url(#rocketBody)" rx="2" />

              {/* Window */}
              <circle cx="60" cy="85" r="15" fill="#0F172A" />
              <circle cx="60" cy="85" r="12" fill="#3B82F6" opacity="0.5" />
              <circle cx="55" cy="80" r="4" fill="white" opacity="0.6" />

              {/* Fins */}
              <path d="M40 120 L20 170 L40 150 Z" fill="#6366F1" />
              <path d="M80 120 L100 170 L80 150 Z" fill="#6366F1" />

              {/* Engine */}
              <rect x="45" y="150" width="30" height="15" fill="#4B5563" rx="2" />

              {/* Flames */}
              <g
                className={`${isHoveringButton || isLaunching ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
              >
                <ellipse
                  cx="60"
                  cy="185"
                  rx="15"
                  ry="25"
                  fill="url(#flame)"
                  className="animate-pulse"
                  style={{ animationDuration: "0.15s" }}
                />
                <ellipse
                  cx="60"
                  cy="180"
                  rx="10"
                  ry="18"
                  fill="#FBBF24"
                  className="animate-pulse"
                  style={{ animationDuration: "0.1s" }}
                />
              </g>
            </svg>

            {/* Smoke trail */}
            <div
              className={`absolute -bottom-20 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
                animationStep >= 3 || isHoveringButton || isLaunching ? "opacity-100" : "opacity-30"
              }`}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-gray-400"
                  style={{
                    width: 20 + i * 8 + "px",
                    height: 20 + i * 8 + "px",
                    left: `${-10 - i * 4}px`,
                    top: `${i * 15}px`,
                    opacity: 0.4 - i * 0.04,
                    animation: `smokeRise 1.5s ease-out infinite ${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Particle effects when launching */}
            {isLaunching && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#FBBF24" : "#F97316",
                      left: `${((i * 13) % 60) - 30}px`,
                      animation: `particleFall 1s ease-out infinite ${(i % 5) * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Headline */}
        <div
          className={`text-center mb-8 transition-all duration-1000 ${
            animationStep >= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 font-sans">
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Learning?
          </h2>
          <p className="text-xl text-gray-400">Join 10,000+ students already on their personalized path</p>
        </div>

        {/* CTA Button */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 ${
            animationStep >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={handleLaunch}
            onMouseEnter={() => setIsHoveringButton(true)}
            onMouseLeave={() => setIsHoveringButton(false)}
            disabled={isLaunching}
            className={`
              relative px-12 py-6 text-xl font-bold text-white rounded-2xl
              bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600
              bg-[length:200%_100%]
              transition-all duration-300
              ${isHoveringButton ? "shadow-[0_0_40px_rgba(99,102,241,0.6)] scale-105 bg-right" : "shadow-[0_0_20px_rgba(99,102,241,0.4)] bg-left"}
              ${isLaunching ? "scale-95" : ""}
              ${!isLaunching ? "animate-cta-pulse" : ""}
              disabled:cursor-not-allowed
            `}
          >
            {isLaunching ? (
              <div className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Launching...
              </div>
            ) : (
              "Start Your Journey Free"
            )}

            {/* Button glow effect */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-blue-400 blur-xl transition-opacity duration-300 -z-10 ${
                isHoveringButton ? "opacity-60" : "opacity-30"
              }`}
            />
          </button>
        </div>

        {/* Trust Indicators */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-16 transition-all duration-1000 ${
            animationStep >= 6 ? "opacity-100" : "opacity-0"
          }`}
        >
          {trustIndicators.map((indicator, i) => (
            <div
              key={indicator}
              className={`flex items-center gap-2 text-gray-300 transition-all duration-500 ${
                animationStep >= 6
                  ? "opacity-100 translate-x-0"
                  : `opacity-0 ${i % 2 === 0 ? "-translate-x-5" : "translate-x-5"}`
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              <span className="text-sm font-medium">{indicator}</span>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative overflow-hidden transition-all duration-1000 ${
            animationStep >= 7 ? "opacity-100" : "opacity-0"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />

          <div
            className={`flex gap-6 ${isPaused ? "" : "animate-scroll-testimonials"}`}
            style={{ width: "fit-content" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
