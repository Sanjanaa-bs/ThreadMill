"use client"

import { useEffect, useRef, useState } from "react"
import { Brain, Zap, Users, BarChart3, Sparkles, Target } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Adaptation",
    description: "Our neural learning engine analyzes your patterns and creates a unique curriculum just for you.",
    color: "#6366F1",
  },
  {
    icon: Zap,
    title: "Micro-Learning Bursts",
    description: "Bite-sized lessons that fit your schedule. Learn in 5-minute sessions that stick.",
    color: "#10B981",
  },
  {
    icon: Users,
    title: "Collaborative Threads",
    description: "Connect with learners worldwide. Share insights, solve problems together.",
    color: "#3B82F6",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Real-time dashboards show exactly where you excel and where to focus.",
    color: "#8B5CF6",
  },
  {
    icon: Sparkles,
    title: "Gamified Milestones",
    description: "Earn badges, unlock achievements, and compete on leaderboards.",
    color: "#F59E0B",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set learning goals and watch as ThreadMill guides you to achieve them.",
    color: "#EC4899",
  },
]

export function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.2 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative z-10 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6">
            <span className="text-white">Features that </span>
            <span className="bg-gradient-to-r from-[#6366F1] to-[#10B981] bg-clip-text text-transparent">
              Revolutionize
            </span>
          </h2>
          <p className="text-lg text-white/60 font-sans max-w-2xl mx-auto">
            Every feature is designed to break the mold of traditional learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleItems.includes(index)

            return (
              <div
                key={index}
                data-index={index}
                className={`relative p-8 rounded-3xl transition-all duration-700 
                  bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20
                  hover:bg-white/10 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                    transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold font-sans mb-3 text-white">{feature.title}</h3>
                <p className="font-sans text-white/60">{feature.description}</p>

                {/* Decorative glow */}
                <div
                  className="absolute -z-10 w-32 h-32 rounded-full blur-3xl opacity-0 
                    group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    backgroundColor: feature.color,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
