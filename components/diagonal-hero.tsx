"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { InteractiveTreadmill } from "@/components/interactive-treadmill"

export function DiagonalHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 z-10">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 mb-8">
              <Sparkles className="w-4 h-4 text-[#10B981]" />
              <span className="text-[#10B981] text-sm font-sans">The Future of Learning</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-sans text-white leading-tight mb-6">
              Transform
              <span className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent">
                {" "}
                Your Learning
              </span>
            </h1>

            <p className="text-xl text-white/60 font-sans max-w-2xl mx-auto mb-10">
              ThreadMill creates personalized learning paths that adapt to how you think and grow. Experience education
              designed for the way your mind works.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="bg-[#10B981] hover:bg-[#059669] text-white font-sans font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-[#10B981]/30 hover:shadow-xl hover:shadow-[#10B981]/40 transition-all"
            >
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-sans px-8 py-6 text-lg rounded-full bg-transparent"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Interactive Treadmill */}
        <div
          className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <InteractiveTreadmill />
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { value: "50K+", label: "Active Learners" },
            { value: "94%", label: "Completion Rate" },
            { value: "4.9", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-sans bg-gradient-to-r from-[#6366F1] to-[#10B981] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 font-sans mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
