"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Assess",
    description: "Our AI analyzes your learning style, pace, and goals in a 5-minute onboarding.",
    visual: "assessment",
  },
  {
    number: "02",
    title: "Personalize",
    description: "ThreadMill creates your unique learning DNA - a curriculum tailored just for you.",
    visual: "personalize",
  },
  {
    number: "03",
    title: "Learn",
    description: "Engage with interactive content that adapts in real-time to your progress.",
    visual: "learn",
  },
  {
    number: "04",
    title: "Master",
    description: "Achieve mastery through spaced repetition and practical application.",
    visual: "master",
  },
]

export function TransformationSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const viewportHeight = window.innerHeight
      const scrolled = viewportHeight - rect.top
      const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + viewportHeight * 0.5)))
      setScrollProgress(progress)
      setActiveStep(Math.min(3, Math.floor(progress * 4)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="transform" ref={sectionRef} className="relative z-10 py-32 min-h-[200vh]">
      <div className="sticky top-0 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-[#10B981] to-[#3B82F6] bg-clip-text text-transparent">
                ThreadMill
              </span>
              <span className="text-white"> Method</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-6 transition-all duration-500 ${
                    activeStep >= index ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                      activeStep === index
                        ? "bg-[#10B981] scale-110"
                        : activeStep > index
                          ? "bg-[#10B981]/50"
                          : "bg-white/10"
                    }`}
                  >
                    <span className="text-white font-bold font-sans text-xl">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-sans text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 font-sans">{step.description}</p>
                  </div>
                </div>
              ))}

              {/* Progress bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6366F1] via-[#10B981] to-[#3B82F6] transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative h-96">
              {/* Assessment Visual */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  activeStep === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-[#6366F1] border-dashed animate-spin-slow flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#6366F1] to-[#3B82F6] flex items-center justify-center">
                      <span className="text-white text-4xl">🧠</span>
                    </div>
                  </div>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-[#10B981] animate-ping"
                      style={{
                        top: `${25 + Math.sin((i * Math.PI) / 2) * 40}%`,
                        left: `${25 + Math.cos((i * Math.PI) / 2) * 40}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Personalize Visual */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  activeStep === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-xl animate-pulse"
                      style={{
                        backgroundColor: ["#6366F1", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"][i % 5],
                        animationDelay: `${i * 0.1}s`,
                        transform: `rotate(${(i - 4) * 5}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Learn Visual */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  activeStep === 2 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M 10,50 Q 30,20 50,50 T 90,50"
                      stroke="#10B981"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="200"
                      className="animate-dash"
                    />
                    <circle cx="50" cy="50" r="8" fill="#6366F1" className="animate-pulse" />
                  </svg>
                  <div className="absolute top-0 right-0 bg-[#10B981] text-white px-3 py-1 rounded-full text-sm font-sans font-bold animate-bounce">
                    +15 XP
                  </div>
                </div>
              </div>

              {/* Master Visual */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                  activeStep === 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#10B981] via-[#6366F1] to-[#3B82F6] flex items-center justify-center animate-pulse">
                    <span className="text-6xl">🏆</span>
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center animate-bounce">
                    <span className="text-white text-xl">✓</span>
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
