"use client"

import { useEffect, useState, useCallback } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

interface Confetti {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
}

export function KonamiConfetti() {
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [keySequence, setKeySequence] = useState<string[]>([])

  const triggerConfetti = useCallback(() => {
    const colors = ["#6366F1", "#10B981", "#3B82F6", "#EC4899", "#F59E0B"]
    const newConfetti: Confetti[] = []

    for (let i = 0; i < 150; i++) {
      newConfetti.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      })
    }

    setConfetti(newConfetti)

    // Clear confetti after animation
    setTimeout(() => setConfetti([]), 5000)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.code].slice(-10)
      setKeySequence(newSequence)

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        triggerConfetti()
        setKeySequence([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keySequence, triggerConfetti])

  if (confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[300] overflow-hidden">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute w-3 h-3"
          style={{
            left: c.x,
            top: c.y,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg) scale(${c.scale})`,
            animation: `confettiFall ${3 + Math.random() * 2}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}
