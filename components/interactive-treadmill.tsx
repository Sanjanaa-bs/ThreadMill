"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface ConceptCard {
  id: number
  subject: string
  color: string
  difficulty: "Easy" | "Medium" | "Hard"
  position: number
  flipped: boolean
}

const subjects = [
  { name: "Algebra", color: "#6366F1" },
  { name: "Geometry", color: "#10B981" },
  { name: "Calculus", color: "#3B82F6" },
  { name: "Physics", color: "#8B5CF6" },
  { name: "Chemistry", color: "#EC4899" },
  { name: "Biology", color: "#F59E0B" },
]

export function InteractiveTreadmill() {
  const [speed, setSpeed] = useState(50)
  const [conceptsPerHour, setConceptsPerHour] = useState(12)
  const [cards, setCards] = useState<ConceptCard[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; opacity: number }[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number>(null)
  const lastTimeRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize cards
  useEffect(() => {
    const initialCards: ConceptCard[] = subjects.map((subject, i) => ({
      id: i,
      subject: subject.name,
      color: subject.color,
      difficulty: (["Easy", "Medium", "Hard"] as const)[i % 3],
      position: i * 120,
      flipped: false,
    }))
    setCards(initialCards)
  }, [])

  // Update concepts per hour based on speed
  useEffect(() => {
    setConceptsPerHour(Math.floor((speed / 100) * 24 + 6))
  }, [speed])

  // Animation loop
  const animate = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      const currentSpeed = isHovering ? speed * 1.5 : speed
      const moveAmount = (delta * currentSpeed) / 1000

      setCards((prev) =>
        prev.map((card) => {
          let newPosition = card.position - moveAmount * 2
          // Reset position when card goes off screen
          if (newPosition < -100) {
            newPosition = 600
            // Spawn particle effect
            setParticles((p) => [...p, { id: Date.now() + Math.random(), x: 50, y: 180, opacity: 1 }])
          }
          return { ...card, position: newPosition }
        }),
      )

      // Fade particles
      setParticles((prev) =>
        prev.map((p) => ({ ...p, y: p.y - 1, opacity: p.opacity - 0.02 })).filter((p) => p.opacity > 0),
      )

      animationRef.current = requestAnimationFrame(animate)
    },
    [speed, isHovering],
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate])

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "#10B981"
      case "Medium":
        return "#F59E0B"
      case "Hard":
        return "#EF4444"
      default:
        return "#6366F1"
    }
  }

  const tiltAngle = ((speed - 50) / 50) * 5

  const beltAnimationDuration = 10 / (speed / 50)

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[800px] h-[400px] mx-auto select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect behind treadmill */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6366F1]/20 via-[#10B981]/10 to-transparent blur-3xl" />

      {/* Main treadmill container with glassmorphism */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden transition-transform duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)",
          transform: `perspective(1000px) rotateX(${tiltAngle}deg)`,
        }}
      >
        {/* Treadmill frame */}
        <div className="absolute inset-4 rounded-2xl overflow-hidden">
          {/* Belt background with animated gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                rgba(99, 102, 241, 0.3) 0%, 
                rgba(59, 130, 246, 0.3) 50%, 
                rgba(99, 102, 241, 0.3) 100%)`,
            }}
          >
            {/* Belt lines animation - using inline animation */}
            <div
              className="absolute inset-0 animate-belt-move"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  transparent 58px,
                  rgba(255,255,255,0.1) 58px,
                  rgba(255,255,255,0.1) 60px
                )`,
                animationDuration: `${beltAnimationDuration}s`,
              }}
            />
          </div>

          {/* Cards on belt */}
          <div className="absolute inset-0 flex items-center">
            {cards.map((card) => (
              <div
                key={card.id}
                className="absolute transition-all duration-150 cursor-pointer"
                style={{
                  left: `${card.position}px`,
                  top: "50%",
                  transform: `translateY(-50%) ${hoveredCard === card.id ? "scale(1.1) translateZ(30px)" : "scale(1)"}`,
                  zIndex: hoveredCard === card.id ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative w-24 h-32 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background:
                      hoveredCard === card.id
                        ? `linear-gradient(135deg, ${getDifficultyColor(card.difficulty)} 0%, ${card.color} 100%)`
                        : `linear-gradient(135deg, white 0%, #f8fafc 100%)`,
                    border: `3px solid ${card.color}`,
                    boxShadow:
                      hoveredCard === card.id
                        ? `0 20px 40px -10px ${card.color}80, 0 0 20px ${card.color}40`
                        : "0 10px 30px -10px rgba(0,0,0,0.3)",
                    transform: hoveredCard === card.id ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-xl"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: card.color }} />
                    </div>
                    <span className="text-xs font-bold text-[#0F172A] font-sans text-center">{card.subject}</span>
                  </div>

                  {/* Back of card (difficulty) */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-2 rounded-xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span className="text-white text-xs font-bold font-sans">Difficulty</span>
                    <span
                      className="text-white text-lg font-bold font-sans mt-1"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                    >
                      {card.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Particle effects */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full bg-[#10B981] pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}px`,
                opacity: particle.opacity,
                boxShadow: "0 0 10px #10B981, 0 0 20px #10B981",
                transform: "scale(0.5)",
              }}
            />
          ))}
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
          {/* Speed control */}
          <div className="flex-1 bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80 text-sm font-sans font-medium">Your Pace</span>
              <span className="text-[#10B981] text-sm font-bold font-sans">{speed}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer treadmill-slider"
              style={{
                background: `linear-gradient(90deg, #6366F1 0%, #10B981 ${speed}%, rgba(255,255,255,0.2) ${speed}%)`,
              }}
            />
          </div>

          {/* Stats display */}
          <div className="flex gap-3">
            {/* Concepts/Hour counter */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10 text-center">
              <div className="text-2xl font-bold font-sans bg-gradient-to-r from-[#6366F1] to-[#10B981] bg-clip-text text-transparent">
                {conceptsPerHour}
              </div>
              <div className="text-white/60 text-xs font-sans">Concepts/Hour</div>
            </div>

            {/* Difficulty meter */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
              <div className="text-xs text-white/60 font-sans mb-1">Difficulty</div>
              <div className="flex gap-1">
                <div
                  className="w-3 h-6 rounded-sm transition-colors"
                  style={{ backgroundColor: speed < 40 ? "#10B981" : "rgba(255,255,255,0.2)" }}
                />
                <div
                  className="w-3 h-6 rounded-sm transition-colors"
                  style={{ backgroundColor: speed >= 40 && speed < 70 ? "#F59E0B" : "rgba(255,255,255,0.2)" }}
                />
                <div
                  className="w-3 h-6 rounded-sm transition-colors"
                  style={{ backgroundColor: speed >= 70 ? "#EF4444" : "rgba(255,255,255,0.2)" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Neon glow on active elements */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold font-sans transition-all"
          style={{
            background: isHovering ? "#10B981" : "rgba(16, 185, 129, 0.2)",
            color: "white",
            boxShadow: isHovering ? "0 0 20px #10B981, 0 0 40px #10B98150" : "none",
          }}
        >
          {isHovering ? "BOOST MODE" : "HOVER TO BOOST"}
        </div>
      </div>
    </div>
  )
}
