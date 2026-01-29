"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.05,
      y: (e.clientY - rect.top - rect.height / 2) * 0.05,
    })
  }

  return (
    <section ref={sectionRef} onMouseMove={handleMouseMove} className="relative z-10 py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Floating card effect */}
          <div
            className="relative bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#10B981] rounded-3xl p-12 md:p-16 text-center overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Floating elements */}
            {[...Array(5)].map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-white/30 animate-pulse"
                style={{
                  width: 24,
                  height: 24,
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}

            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold font-sans text-white mb-6 text-balance">
                Ready to Transform Your Learning Journey?
              </h2>
              <p className="text-white/80 text-lg font-sans mb-10 max-w-xl mx-auto">
                Join 50,000+ learners who've already discovered a better way to master new skills.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#6366F1] hover:bg-white/90 font-sans font-bold px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                >
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <span className="text-white/60 text-sm font-sans">No credit card required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#10B981] flex items-center justify-center">
                <span className="text-white font-bold font-sans text-sm">T</span>
              </div>
              <span className="text-white font-bold font-sans">ThreadMill Education</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors font-sans text-sm">
                Privacy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors font-sans text-sm">
                Terms
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors font-sans text-sm">
                Support
              </a>
            </div>

            <p className="text-white/40 text-sm font-sans">© 2025 ThreadMill. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
