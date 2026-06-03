import Link from "next/link";
import {
  MapPin,
  Camera,
  Bell,
  Users,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Zap,
  Eye,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col w-full overflow-x-hidden">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Civic<span className="text-primary">Solve</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#dashboards"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboards
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-primary px-3 sm:px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden w-full px-4 sm:px-0">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-full max-w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl pb-24 pt-16 sm:pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary max-w-full truncate">
              <Zap className="h-3.5 w-3.5 flex-shrink-0" />
              AI-Powered Civic Platform
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-tight">
              See it. Snap it.{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent block sm:inline">
                Solve it.
              </span>{" "}
              Together.
            </h1>
            <p className="mt-6 text-base sm:text-xl leading-relaxed text-muted-foreground px-2 sm:px-0">
              CivicSolve bridges the gap between citizens and local government.
              Report civic issues with AI-powered clarity checks, track
              resolutions in real-time, and build a smarter community together.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 px-4 sm:px-0 sm:flex-row w-full max-w-md mx-auto sm:max-w-none">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 w-full sm:w-auto"
              >
                Report an Issue
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-semibold transition-all hover:bg-accent w-full sm:w-auto"
              >
                <Eye className="h-4 w-4" />
                See How It Works
              </a>
            </div>
          </div>

          {/* Stats Section - Updated to single column scaling up to 4-column layout */}
          <div className="mx-auto mt-20 grid grid-cols-1 gap-6 px-4 sm:px-0 xs:grid-cols-2 sm:grid-cols-4 max-w-4xl">
            {[
              { label: "Issues Reported", value: "10K+" },
              { label: "Issues Resolved", value: "8.5K+" },
              { label: "Active Citizens", value: "5K+" },
              { label: "Cities Covered", value: "25+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-card/40 sm:bg-transparent p-4 sm:p-0 rounded-xl border border-border/50 sm:border-none shadow-sm sm:shadow-none">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t bg-muted/30 py-20 sm:py-24 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Everything you need to fix your city
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              From reporting potholes to tracking resolutions — CivicSolve
              handles the entire lifecycle of civic issues.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Camera,
                title: "AI Image Analysis",
                description:
                  "Our AI checks photo clarity and identifies issue types automatically, ensuring actionable reports every time.",
              },
              {
                icon: CheckCircle2,
                title: "Duplicate Detection",
                description:
                  "Smart duplicate detection compares location, images, and descriptions to prevent redundant reports.",
              },
              {
                icon: Bell,
                title: "Real-Time Tracking",
                description:
                  "Track your reported issues from 'Submitted' through 'In Progress' to 'Resolved' with live timeline updates.",
              },
              {
                icon: Users,
                title: "Gamified Leaderboard",
                description:
                  "Earn points for valid reports and climb the community leaderboard. Make civic engagement fun!",
              },
              {
                icon: Shield,
                title: "Role-Based Access",
                description:
                  "Dedicated dashboards for Citizens, Admins, Department Heads, and Field Workers — each tailored to their needs.",
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description:
                  "Department heads get system-wide analytics, SLA tracking, and performance insights to optimize services.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md sm:hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors sm:group-hover:bg-primary sm:group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 sm:py-24 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              How it works
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Three simple steps to make your city better.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Snap & Report",
                description:
                  "Take a photo of the civic issue — pothole, overflowing trash, broken streetlight — and submit it with a description and location.",
              },
              {
                step: "02",
                title: "AI Validates",
                description:
                  "Our AI checks image clarity, categorizes the issue, and ensures it's not a duplicate before forwarding to the authorities.",
              },
              {
                step: "03",
                title: "Track & Resolve",
                description:
                  "Follow your issue in real-time as it gets assigned to a field worker, worked on, and finally resolved.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center px-4 sm:px-0">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section id="dashboards" className="border-t bg-muted/30 py-20 sm:py-24 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Dashboards for every role
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Tailored experiences for citizens, admins, heads, and field workers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                role: "Citizen",
                color: "from-blue-500 to-cyan-500",
                features: [
                  "AI-powered issue reporting",
                  "Real-time status tracking",
                  "Gamified leaderboard",
                  "Community engagement",
                ],
              },
              {
                role: "Admin",
                color: "from-violet-500 to-purple-500",
                features: [
                  "Central command hub",
                  "Priority-based triage",
                  "Worker assignment",
                  "Issue management",
                ],
              },
              {
                role: "Department Head",
                color: "from-amber-500 to-orange-500",
                features: [
                  "System-wide analytics",
                  "SLA breach alerts",
                  "Performance insights",
                  "Cross-city monitoring",
                ],
              },
              {
                role: "Field Worker",
                color: "from-emerald-500 to-teal-500",
                features: [
                  "Mobile-first task queue",
                  "On-the-go status updates",
                  "Photo upload for proof",
                  "Comment & collaborate",
                ],
              },
            ].map((dashboard) => (
              <div
                key={dashboard.role}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all sm:hover:shadow-lg"
              >
                <div
                  className={`bg-gradient-to-r ${dashboard.color} px-6 py-4`}
                >
                  <h3 className="text-lg font-bold text-white">
                    {dashboard.role} Dashboard
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {dashboard.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{feature}</span>
                      </ul>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 w-full px-4 sm:px-0">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-4 py-16 text-center shadow-2xl shadow-primary/20 sm:px-16">
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-1/4 top-0 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-white/5 blur-3xl" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-primary-foreground max-w-md mx-auto sm:max-w-none leading-tight">
              Ready to make your city better?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-primary-foreground/80">
              Join thousands of citizens who are already using CivicSolve to
              report and resolve civic issues in their communities.
            </p>
            <div className="mt-8 px-4 sm:px-0">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl w-full sm:w-auto"
              >
                Start Reporting Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">
                Civic<span className="text-primary">Solve</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CivicSolve. Distributed under
              the MIT License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
