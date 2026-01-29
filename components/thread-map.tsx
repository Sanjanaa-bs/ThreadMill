"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"
import {
  Lock,
  Check,
  Calculator,
  FlaskConical,
  Globe,
  Code,
  Brain,
  Lightbulb,
  TrendingUp,
  Atom,
  PenTool,
} from "lucide-react"

interface Node {
  id: string
  label: string
  x: number
  y: number
  status: "completed" | "active" | "locked"
  icon: React.ElementType
  connections: string[]
  unlocksCount: number
}

const nodes: Node[] = [
  {
    id: "fractions",
    label: "Fractions",
    x: 15,
    y: 25,
    status: "completed",
    icon: Calculator,
    connections: ["decimals", "ratios"],
    unlocksCount: 2,
  },
  {
    id: "decimals",
    label: "Decimals",
    x: 30,
    y: 15,
    status: "completed",
    icon: TrendingUp,
    connections: ["percentages", "algebra-basics"],
    unlocksCount: 2,
  },
  {
    id: "percentages",
    label: "Percentages",
    x: 50,
    y: 20,
    status: "completed",
    icon: PenTool,
    connections: ["statistics", "finance"],
    unlocksCount: 2,
  },
  {
    id: "ratios",
    label: "Ratios",
    x: 25,
    y: 45,
    status: "active",
    icon: Atom,
    connections: ["proportions", "algebra-basics"],
    unlocksCount: 2,
  },
  {
    id: "proportions",
    label: "Proportions",
    x: 40,
    y: 55,
    status: "active",
    icon: Brain,
    connections: ["geometry", "physics"],
    unlocksCount: 2,
  },
  {
    id: "algebra-basics",
    label: "Algebra Basics",
    x: 55,
    y: 40,
    status: "active",
    icon: Code,
    connections: ["equations", "functions"],
    unlocksCount: 2,
  },
  {
    id: "equations",
    label: "Equations",
    x: 70,
    y: 30,
    status: "locked",
    icon: Lightbulb,
    connections: ["calculus", "linear-algebra"],
    unlocksCount: 2,
  },
  {
    id: "functions",
    label: "Functions",
    x: 75,
    y: 50,
    status: "locked",
    icon: FlaskConical,
    connections: ["calculus", "data-science"],
    unlocksCount: 2,
  },
  {
    id: "geometry",
    label: "Geometry",
    x: 45,
    y: 75,
    status: "locked",
    icon: Globe,
    connections: ["trigonometry", "physics"],
    unlocksCount: 2,
  },
  {
    id: "statistics",
    label: "Statistics",
    x: 65,
    y: 65,
    status: "locked",
    icon: TrendingUp,
    connections: ["data-science", "probability"],
    unlocksCount: 2,
  },
  {
    id: "trigonometry",
    label: "Trigonometry",
    x: 30,
    y: 80,
    status: "locked",
    icon: Atom,
    connections: ["calculus", "physics"],
    unlocksCount: 2,
  },
  {
    id: "calculus",
    label: "Calculus",
    x: 85,
    y: 45,
    status: "locked",
    icon: Brain,
    connections: ["advanced-math"],
    unlocksCount: 1,
  },
  {
    id: "physics",
    label: "Physics",
    x: 20,
    y: 65,
    status: "locked",
    icon: FlaskConical,
    connections: ["engineering"],
    unlocksCount: 1,
  },
  {
    id: "data-science",
    label: "Data Science",
    x: 80,
    y: 70,
    status: "locked",
    icon: Code,
    connections: ["machine-learning"],
    unlocksCount: 1,
  },
  {
    id: "finance",
    label: "Finance",
    x: 60,
    y: 10,
    status: "locked",
    icon: TrendingUp,
    connections: ["economics"],
    unlocksCount: 1,
  },
]

export function ThreadMap() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedNodes, setAnimatedNodes] = useState<string[]>([])
  const [animatedConnections, setAnimatedConnections] = useState<string[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [expandedNode, setExpandedNode] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Weaving animation - nodes appear one by one
  useEffect(() => {
    if (!isVisible) return

    const nodeOrder = nodes.map((n) => n.id)
    let nodeIndex = 0

    const nodeInterval = setInterval(() => {
      if (nodeIndex < nodeOrder.length) {
        setAnimatedNodes((prev) => [...prev, nodeOrder[nodeIndex]])
        nodeIndex++
      } else {
        clearInterval(nodeInterval)
      }
    }, 150)

    return () => clearInterval(nodeInterval)
  }, [isVisible])

  // Connections animate after nodes
  useEffect(() => {
    if (animatedNodes.length < 3) return

    const allConnections: string[] = []
    nodes.forEach((node) => {
      node.connections.forEach((conn) => {
        const connId = [node.id, conn].sort().join("-")
        if (!allConnections.includes(connId)) {
          allConnections.push(connId)
        }
      })
    })

    let connIndex = 0
    const connInterval = setInterval(() => {
      if (connIndex < allConnections.length) {
        setAnimatedConnections((prev) => [...prev, allConnections[connIndex]])
        connIndex++
      } else {
        clearInterval(connInterval)
      }
    }, 80)

    return () => clearInterval(connInterval)
  }, [animatedNodes])

  const getNodeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10B981"
      case "active":
        return "#3B82F6"
      case "locked":
        return "#6B7280"
      default:
        return "#6B7280"
    }
  }

  const getNodeGradient = (status: string) => {
    switch (status) {
      case "completed":
        return "from-[#10B981] to-[#059669]"
      case "active":
        return "from-[#8B5CF6] to-[#6366F1]"
      case "locked":
        return "from-[#4B5563] to-[#374151]"
      default:
        return "from-[#4B5563] to-[#374151]"
    }
  }

  const isConnectionHighlighted = useCallback(
    (nodeId1: string, nodeId2: string) => {
      if (!hoveredNode) return false
      const node = nodes.find((n) => n.id === hoveredNode)
      if (!node) return false
      return (
        (node.id === nodeId1 && node.connections.includes(nodeId2)) ||
        (node.id === nodeId2 && node.connections.includes(nodeId1)) ||
        nodeId1 === hoveredNode ||
        nodeId2 === hoveredNode
      )
    },
    [hoveredNode],
  )

  return (
    <section ref={sectionRef} className="relative z-10 py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6 text-white">
            Learn How Everything{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#10B981] bg-clip-text text-transparent">Connects</span>
          </h2>
          <p className="text-lg text-white/60 font-sans max-w-2xl mx-auto">
            Our Thread Map visualizes your learning journey. See how concepts connect and unlock new knowledge.
          </p>
        </div>

        {/* Thread Map Visualization */}
        <div className="relative bg-[#0F172A]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-4 md:p-8 min-h-[500px] md:min-h-[600px]">
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 rounded-3xl opacity-10"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <svg
            ref={svgRef}
            className="w-full h-[400px] md:h-[500px]"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Glow filter for connections */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Particle gradient */}
              <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Draw connections (threads) */}
            {nodes.map((node) =>
              node.connections.map((connId) => {
                const targetNode = nodes.find((n) => n.id === connId)
                if (!targetNode) return null

                const connectionId = [node.id, connId].sort().join("-")
                const isAnimated = animatedConnections.includes(connectionId)
                const isHighlighted = isConnectionHighlighted(node.id, connId)

                return (
                  <g key={connectionId}>
                    {/* Main thread line */}
                    <line
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isHighlighted ? "#10B981" : "rgba(255,255,255,0.15)"}
                      strokeWidth={isHighlighted ? "0.4" : "0.2"}
                      strokeDasharray={isHighlighted ? "none" : "1,1"}
                      filter={isHighlighted ? "url(#glow)" : "none"}
                      className={`transition-all duration-500 ${isAnimated ? "opacity-100" : "opacity-0"}`}
                      style={{
                        strokeDashoffset: isAnimated ? 0 : 100,
                        transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out",
                      }}
                    />

                    {/* Animated particles flowing along threads */}
                    {isHighlighted && isAnimated && (
                      <>
                        <circle r="0.5" fill="#10B981" filter="url(#glow)">
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={`M${node.x},${node.y} L${targetNode.x},${targetNode.y}`}
                          />
                        </circle>
                        <circle r="0.3" fill="#10B981" opacity="0.5">
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            begin="0.5s"
                            path={`M${node.x},${node.y} L${targetNode.x},${targetNode.y}`}
                          />
                        </circle>
                      </>
                    )}
                  </g>
                )
              }),
            )}
          </svg>

          {/* Nodes overlay (using absolute positioning for better interactivity) */}
          <div className="absolute inset-4 md:inset-8">
            {nodes.map((node) => {
              const Icon = node.icon
              const isAnimated = animatedNodes.includes(node.id)
              const isHovered = hoveredNode === node.id
              const isExpanded = expandedNode === node.id

              return (
                <div
                  key={node.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                    isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    zIndex: isHovered || isExpanded ? 20 : 10,
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                >
                  {/* Node circle */}
                  <div
                    className={`relative cursor-pointer transition-all duration-300 ${isHovered ? "scale-125" : ""}`}
                  >
                    {/* Glow effect */}
                    {(isHovered || node.status === "active") && (
                      <div
                        className={`absolute inset-0 rounded-full blur-md animate-pulse ${
                          node.status === "completed"
                            ? "bg-[#10B981]/50"
                            : node.status === "active"
                              ? "bg-[#8B5CF6]/50"
                              : "bg-gray-500/30"
                        }`}
                        style={{ transform: "scale(1.5)" }}
                      />
                    )}

                    {/* Main node */}
                    <div
                      className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${getNodeGradient(node.status)} 
                        flex items-center justify-center border-2 ${
                          node.status === "completed"
                            ? "border-[#10B981]"
                            : node.status === "active"
                              ? "border-[#8B5CF6]"
                              : "border-gray-600"
                        } shadow-lg`}
                    >
                      {node.status === "completed" ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : node.status === "locked" ? (
                        <Lock className="w-4 h-4 text-white/60" />
                      ) : (
                        <Icon className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Label */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap
                      text-xs font-sans font-medium transition-all duration-300 ${
                        isHovered ? "opacity-100" : "opacity-70"
                      } ${
                        node.status === "completed"
                          ? "text-[#10B981]"
                          : node.status === "active"
                            ? "text-[#8B5CF6]"
                            : "text-gray-400"
                      }`}
                    >
                      {node.label}
                    </div>

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 
                        bg-[#1E293B] border border-white/10 rounded-lg shadow-xl whitespace-nowrap
                        animate-in fade-in slide-in-from-bottom-2 duration-200"
                      >
                        <p className="text-white text-sm font-sans font-medium">{node.label}</p>
                        <p className="text-[#10B981] text-xs font-sans">
                          {node.status === "completed"
                            ? "Completed!"
                            : node.status === "active"
                              ? `Master this to unlock ${node.unlocksCount} new topics`
                              : `Unlock ${node.unlocksCount} topics when completed`}
                        </p>
                      </div>
                    )}

                    {/* Expanded card on click */}
                    {isExpanded && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-64 p-4
                        bg-[#1E293B]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl
                        animate-in fade-in zoom-in-95 duration-200 z-30"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getNodeGradient(node.status)} 
                            flex items-center justify-center`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-sans font-semibold">{node.label}</h4>
                            <span
                              className={`text-xs font-sans ${
                                node.status === "completed"
                                  ? "text-[#10B981]"
                                  : node.status === "active"
                                    ? "text-[#8B5CF6]"
                                    : "text-gray-400"
                              }`}
                            >
                              {node.status === "completed"
                                ? "Completed"
                                : node.status === "active"
                                  ? "In Progress"
                                  : "Locked"}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${
                                node.status === "completed"
                                  ? "from-[#10B981] to-[#059669]"
                                  : node.status === "active"
                                    ? "from-[#8B5CF6] to-[#6366F1]"
                                    : "from-gray-600 to-gray-700"
                              }`}
                              style={{
                                width: node.status === "completed" ? "100%" : node.status === "active" ? "45%" : "0%",
                              }}
                            />
                          </div>
                          <p className="text-white/60 text-xs font-sans">
                            {node.status === "completed"
                              ? "All lessons complete"
                              : node.status === "active"
                                ? "5 of 12 lessons complete"
                                : "Complete prerequisites to unlock"}
                          </p>
                        </div>
                        {node.status !== "locked" && (
                          <button
                            className="w-full mt-3 px-4 py-2 bg-[#10B981] hover:bg-[#059669] 
                            text-white text-sm font-sans font-medium rounded-lg transition-colors"
                          >
                            {node.status === "completed" ? "Review" : "Continue Learning"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-4 text-xs font-sans">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-white/60">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
              <span className="text-white/60">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-white/60">Locked</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
