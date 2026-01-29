import { DiagonalHero } from "@/components/diagonal-hero"
import { FeaturesSection } from "@/components/features-section"
import { ThreadMap } from "@/components/thread-map"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DiagonalBackground } from "@/components/diagonal-background"
import { Navigation } from "@/components/navigation"
import { DashboardMockup } from "@/components/dashboard-mockup"
import { AchievementArcade } from "@/components/achievement-arcade"
import { AIDemoSection } from "@/components/ai-demo-section"
import { MobileExperience } from "@/components/mobile-experience"
import { LaunchCTA } from "@/components/launch-cta"
import { ScrollProgress } from "@/components/scroll-progress"
import { KonamiConfetti } from "@/components/konami-confetti"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <KonamiConfetti />
      <ThemeToggle />

      <DiagonalBackground />
      <Navigation />

      <DiagonalHero />

      <div id="dashboard">
        <DashboardMockup />
      </div>

      <ThreadMap />

      <div id="ai-demo">
        <AIDemoSection />
      </div>

      <div id="achievements">
        <AchievementArcade />
      </div>

      <div id="mobile">
        <MobileExperience />
      </div>

      <div id="features">
        <FeaturesSection />
      </div>

      <TestimonialsSection />

      <LaunchCTA />
    </main>
  )
}
