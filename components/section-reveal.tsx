"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right"
  delay?: number
  stagger?: boolean
}

export function SectionReveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  stagger = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getAnimationClasses = () => {
    const base = "transition-all duration-700 ease-out"
    const hidden = {
      "fade-up": "opacity-0 translate-y-8",
      "fade-in": "opacity-0",
      "scale-in": "opacity-0 scale-95",
      "slide-left": "opacity-0 -translate-x-8",
      "slide-right": "opacity-0 translate-x-8",
    }
    const visible = "opacity-100 translate-y-0 translate-x-0 scale-100"

    return `${base} ${isVisible ? visible : hidden[animation]}`
  }

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`} data-stagger={stagger}>
      {children}
    </div>
  )
}
