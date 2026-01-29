"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "ThreadMill completely transformed how I approach learning. The adaptive system feels like having a personal tutor who knows exactly what I need.",
    author: "Sarah Chen",
    role: "Software Engineer @ Google",
    avatar: "/professional-woman-portrait.png",
  },
  {
    quote:
      "I went from struggling with data science to landing my dream job in 6 months. The personalized curriculum was a game-changer.",
    author: "Marcus Johnson",
    role: "Data Scientist @ Netflix",
    avatar: "/professional-man-portrait.png",
  },
  {
    quote:
      "As a lifelong learner, I've tried every platform. ThreadMill is the first that actually adapts to my learning style.",
    author: "Dr. Emily Park",
    role: "Professor @ MIT",
    avatar: "/academic-woman-portrait.jpg",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="relative z-10 py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6">
            <span className="text-white">Loved by </span>
            <span className="bg-gradient-to-r from-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent">Learners</span>
          </h2>
        </div>

        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main testimonial card */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-[#6366F1]/30" />

            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    activeIndex === index ? "opacity-100 translate-x-0" : "opacity-0 absolute inset-0 translate-x-10"
                  }`}
                >
                  <blockquote className="text-xl md:text-2xl text-white font-sans leading-relaxed mb-8 pt-8">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#10B981]"
                    />
                    <div>
                      <div className="text-white font-bold font-sans">{testimonial.author}</div>
                      <div className="text-white/60 font-sans text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 h-2 bg-[#10B981] rounded-full"
                    : "w-2 h-2 bg-white/30 rounded-full hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
