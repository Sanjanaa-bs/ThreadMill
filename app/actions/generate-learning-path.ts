"use server"

import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.Gemini_API,
})

const getMockData = (subject: string, level: string) => ({
  learningPath: [
    {
      week: 1,
      topic: `Introduction to ${subject}`,
      hours: 3,
      description: `Foundational concepts and setup for ${level} learners.`,
    },
    {
      week: 2,
      topic: `Core ${subject} Fundamentals`,
      hours: 4,
      description: `Deep dive into essential building blocks.`,
    },
    {
      week: 3,
      topic: `Practical ${subject} Applications`,
      hours: 5,
      description: `Hands-on projects and real-world examples.`,
    },
    {
      week: 4,
      topic: `Advanced ${subject} Patterns`,
      hours: 4,
      description: `Best practices and professional techniques.`,
    },
    {
      week: 5,
      topic: `${subject} Mastery Project`,
      hours: 6,
      description: `Build a complete project to solidify your skills.`,
    },
  ],
  firstLesson: {
    title: `Getting Started with ${subject}`,
    explanation: `Welcome to your ${level} journey in ${subject}! This lesson covers the fundamental concepts you'll need to build a strong foundation. We'll start with the basics and gradually work up to more complex topics.`,
    codeExample: subject.toLowerCase().includes("python")
      ? `# Your first Python program\nprint("Hello, ${subject}!")\n\n# Variables and data types\nname = "ThreadMill Learner"\nage = 25\nis_student = True`
      : subject.toLowerCase().includes("javascript")
        ? `// Your first JavaScript program\nconsole.log("Hello, ${subject}!");\n\n// Variables and data types\nconst name = "ThreadMill Learner";\nlet age = 25;\nconst isStudent = true;`
        : null,
    practiceQuestions: [
      `What is the main purpose of ${subject}?`,
      `How would you describe ${subject} to a beginner?`,
      `What are three real-world applications of ${subject}?`,
    ],
  },
  recommendations: [
    { topic: `${subject} Best Practices`, reason: "Helps you write cleaner, more maintainable code" },
    { topic: `${subject} Problem Solving`, reason: "Builds critical thinking skills essential for mastery" },
    { topic: `${subject} Projects Portfolio`, reason: "Apply your knowledge to real-world scenarios" },
  ],
})

export async function generateLearningPath(subject: string, level: string) {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: `You are an expert educational AI. Create a personalized learning path for ${subject} at ${level} level.

Return your response in the following JSON format ONLY (no markdown, no code blocks, just raw JSON):
{
  "learningPath": [
    {"week": 1, "topic": "Topic Name", "hours": 3, "description": "Brief description"},
    {"week": 2, "topic": "Topic Name", "hours": 4, "description": "Brief description"},
    {"week": 3, "topic": "Topic Name", "hours": 5, "description": "Brief description"},
    {"week": 4, "topic": "Topic Name", "hours": 4, "description": "Brief description"},
    {"week": 5, "topic": "Topic Name", "hours": 6, "description": "Brief description"}
  ],
  "firstLesson": {
    "title": "Lesson Title",
    "explanation": "2-3 sentence concept explanation tailored for ${level} level",
    "codeExample": "// Code example if programming subject, otherwise null",
    "practiceQuestions": [
      "Question 1?",
      "Question 2?",
      "Question 3?"
    ]
  },
  "recommendations": [
    {"topic": "Related Topic 1", "reason": "Why this helps"},
    {"topic": "Related Topic 2", "reason": "Why this helps"},
    {"topic": "Related Topic 3", "reason": "Why this helps"}
  ]
}

Make the content genuinely educational and appropriate for ${level} level. For programming subjects, include real code examples.`,
    })

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
    const parsed = JSON.parse(cleanedText)
    return { success: true, data: parsed }
  } catch (error: unknown) {
    console.error("AI Generation Error:", error)

    const errorMessage = error instanceof Error ? error.message : String(error)
    const isRateLimited =
      errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("RESOURCE_EXHAUSTED")

    if (isRateLimited) {
      // Return mock data when rate limited
      return {
        success: true,
        data: getMockData(subject, level),
        isDemo: true,
        message: "Using demo mode (API rate limit reached). Try again later for live AI responses.",
      }
    }

    return { success: false, error: "AI is taking a coffee break. Please try again!" }
  }
}
