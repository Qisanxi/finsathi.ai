"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, ShieldCheck, Sparkles, Star, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FinSaathiLogo } from "./logo";
import { LandingSections } from "./landing-sections";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Comparisons", href: "#comparisons" },
  { label: "FAQ", href: "#faq" },
];

const TRUST_ITEMS = ["SEBI", "AMFI", "IRDAI", "Section 80C", "PMAY", "NPS"];

function scrollToId(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Header({ onLaunch }: { onLaunch: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <FinSaathiLogo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToId(link.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </nav>
        <Button onClick={onLaunch} className="rounded-full shadow-sm" size="sm">
          Launch App
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

function ChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/15 via-gold/10 to-transparent blur-2xl" />
      <div className="relative rounded-2xl border bg-card shadow-xl">
        {/* Mockup header */}
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold">FinSaathi</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Online · personalised for you
            </p>
          </div>
        </div>
        {/* Mockup messages */}
        <div className="space-y-3 p-4 text-[13px] leading-relaxed">
          <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-primary-foreground">
            I’m 25 and just started my first job. What is a SIP and how do I start?
          </div>
          <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-2.5">
            <p className="font-semibold">Think of a SIP like a piggy bank with discipline.</p>
            <p className="mt-1.5 text-muted-foreground">
              A Systematic Investment Plan lets you invest a fixed amount — say ₹2,000 every
              month — into a mutual fund. It builds the rupee-cost-averaging habit, and AMFI
              data shows small, regular investing beats trying to time the market…
            </p>
          </div>
          <div className="flex items-center gap-1.5 pl-1 pt-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:300ms]" />
          </div>
        </div>
        {/* Mockup input */}
        <div className="border-t p-3">
          <div className="flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">
            Ask about SIP, ELSS, PPF, term insurance…
            <Sparkles className="ml-auto h-3.5 w-3.5 text-gold" />
          </div>
        </div>
      </div>
      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-10 hidden rounded-xl border bg-card px-3 py-2 shadow-md sm:block"
      >
        <p className="flex items-center gap-1.5 text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> SEBI-aware
        </p>
        <p className="text-[10px] text-muted-foreground">regulator-referenced answers</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-4 bottom-14 hidden rounded-xl border bg-card px-3 py-2 shadow-md sm:block"
      >
        <p className="flex items-center gap-1 text-xs font-bold">
          <UserRound className="h-3.5 w-3.5 text-gold-foreground" /> Your profile
        </p>
        <p className="text-[10px] text-muted-foreground">answers tuned to you</p>
      </motion.div>
    </div>
  );
}

function Hero({ onLaunch, onAskTopic }: { onLaunch: () => void; onAskTopic: (t: string) => void }) {
  return (
    <section className="dot-grid relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/70 via-background to-background" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:pb-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-5 rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/10">
              <Sparkles className="mr-1 h-3 w-3" /> Built for Flowzint Hackathon 2026
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            Financial literacy,{" "}
            <span className="relative whitespace-nowrap text-primary">
              made simple
            </span>{" "}
            for India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            FinSaathi is your AI money-mitra. Understand mutual funds, insurance,
            government schemes and tax-saving in plain language — personalised to your
            profile, and always on the side of education, not selling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button size="lg" onClick={onLaunch} className="rounded-full font-bold shadow-md">
              Start learning free
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onAskTopic("What is SIP and how do I start?")}
              className="rounded-full font-semibold"
            >
              Ask “What is SIP?”
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8"
          >
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Concepts explained, regulators referenced
            </p>
            <div className="flex flex-wrap gap-2">
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "6+", label: "Product categories covered" },
    { value: "3", label: "Ready comparison tables" },
    { value: "100%", label: "Educational, never promotional" },
    { value: "₹0", label: "Cost. Free forever." },
  ];
  return (
    <section className="border-y bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <FinSaathiLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An AI-powered financial literacy assistant for Indian users, built for the
              Flowzint Hackathon 2026. Simple language, personal context, regulator-aware.
            </p>
            <div className="mt-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
              ))}
              <span className="ml-1.5 text-xs text-muted-foreground">
                Loved by first-time investors
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToId(link.href)}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display mb-3 text-sm font-bold uppercase tracking-wider">
              Official sources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>SEBI — Securities and Exchange Board of India</li>
              <li>AMFI — Association of Mutual Funds in India</li>
              <li>IRDAI — Insurance Regulatory and Development Authority</li>
              <li>Income Tax Department, Government of India</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="space-y-2 text-center">
          <p className="mx-auto max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Disclaimer: FinSaathi provides educational information only. It is not
            financial, investment, tax, legal, or insurance advice. Please consult a
            SEBI-registered advisor before investing.
          </p>
          <p className="text-xs text-muted-foreground">
            © 2026 FinSaathi · Built with care for Flowzint Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LandingPageProps {
  onLaunch: () => void;
  onAskTopic: (topic: string) => void;
}

export function LandingPage({ onLaunch, onAskTopic }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header onLaunch={onLaunch} />
      <main className="flex-1">
        <Hero onLaunch={onLaunch} onAskTopic={onAskTopic} />
        <StatsBar />
        <LandingSections onAskTopic={onAskTopic} onLaunch={onLaunch} />
      </main>
      <Footer />
    </div>
  );
}
