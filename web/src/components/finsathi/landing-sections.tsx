"use client";

import { motion } from "framer-motion";
import {
  MessageCircleHeart,
  UserRoundSearch,
  TableProperties,
  Zap,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Sparkles,
  Landmark,
  Scale,
  HelpCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SCOPE_AREAS, QUICK_TOPICS } from "@/lib/finsathi/data";
import { Comparator } from "./comparator";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const FEATURES = [
  {
    icon: MessageCircleHeart,
    title: "AI Chat, jargon-free",
    description:
      "Ask anything about SIPs, ELSS, PPF or term insurance in plain language — like asking a financially-savvy friend, complete with relatable Indian analogies.",
    accent: true,
  },
  {
    icon: UserRoundSearch,
    title: "Personalised to your profile",
    description:
      "Share your age, income range, goals and risk comfort once — every explanation afterwards is tailored to your life stage and situation.",
  },
  {
    icon: TableProperties,
    title: "Quick comparison tables",
    description:
      "Term vs ULIP, SIP vs Lumpsum, ELSS vs PPF — side-by-side tables for the products Indians most often confuse, at one tap.",
  },
  {
    icon: Zap,
    title: "One-tap quick topics",
    description:
      "No blank-page paralysis. Tap a starter question like “What is SIP and how do I start?” and learn instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & educational",
    description:
      "No stock tips, no scheme recommendations, no guaranteed-return claims. Just concepts, with references to SEBI, AMFI and IRDAI.",
  },
  {
    icon: MapPin,
    title: "Made for Bharat",
    description:
      "Built for first-time investors from Tier-2 and Tier-3 cities who deserve simple, contextual financial education in their own reality.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Build your financial profile",
    description:
      "Tell FinSaathi your age range, employment type, income band, savings capacity, primary goal, risk comfort and investment horizon. It takes under a minute and stays on your device.",
  },
  {
    step: "2",
    title: "Ask anything, in your words",
    description:
      "“What is SIP and how do I start?” or “ELSS vs PPF — which is better for me?” Type it or tap a quick topic. Full conversation memory means follow-ups just work.",
  },
  {
    step: "3",
    title: "Get personalised guidance",
    description:
      "Every answer is tuned to your profile — explanations adapt to your goal and horizon, comparisons become decisions, and jargon becomes plain language.",
  },
];

const FAQS = [
  {
    q: "Is FinSaathi free to use?",
    a: "Yes. FinSaathi is completely free — it was built for the Flowzint Hackathon 2026 to make financial literacy accessible to every first-time Indian investor. There is no sign-up, no paywall, and your profile data never leaves your browser.",
  },
  {
    q: "Can FinSaathi tell me which stock or mutual fund to buy?",
    a: "No — and that is deliberate. FinSaathi is an educational assistant, not an investment advisor. It never recommends specific schemes, stocks, insurers or products. It explains concepts, compares product categories, and always reminds you to consult a SEBI-registered advisor before investing.",
  },
  {
    q: "How is my financial profile used?",
    a: "Your profile (age, income range, goals, risk comfort) is used only to personalise educational explanations — for example, framing a PPF explanation differently for a 22-year-old student versus a 45-year-old professional. It is stored locally in your browser, not on our servers.",
  },
  {
    q: "What topics does FinSaathi cover?",
    a: "Mutual funds (SIP, lumpsum, ELSS, NAV, direct vs regular), life and vehicle insurance (term, ULIP, IDV, zero-dep), housing (home loan EMI, PMAY), government schemes (PPF, NPS, Sukanya Samriddhi Yojana, Atal Pension Yojana) and tax-saving under Sections 80C and 80D.",
  },
  {
    q: "How accurate is the information?",
    a: "FinSaathi explains concepts and cites the relevant regulator — SEBI for markets, AMFI for mutual funds, IRDAI for insurance. When it is unsure about a current rate, limit or rule, it says so and points you to official sources. Always verify current figures before acting.",
  },
];

interface LandingSectionsProps {
  onAskTopic: (topic: string) => void;
  onLaunch: () => void;
}

export function LandingSections({ onAskTopic, onLaunch }: LandingSectionsProps) {
  return (
    <>
      {/* ===================== FEATURES ===================== */}
      <section id="features" className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs font-semibold">
              <Sparkles className="mr-1 h-3 w-3" /> What FinSaathi does
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything a first-time investor needs,{" "}
              <span className="text-primary">nothing they don’t</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Financial products are not complicated — the way they are explained is.
              FinSaathi fixes the second part.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: "easeOut" }}
              >
                <Card
                  className={`h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    feature.accent ? "border-primary/30 bg-gradient-to-br from-secondary to-card" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-5.5 w-5.5" />
                    </div>
                    <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how-it-works" className="bg-secondary/50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs font-semibold">
              How it works
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Three steps to smarter money decisions
            </h2>
          </motion.div>

          <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 md:block" />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
                className="relative"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-background bg-primary font-display text-xl font-extrabold text-primary-foreground shadow-md">
                  {step.step}
                </div>
                <h3 className="font-display mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== COMPARISONS ===================== */}
      <section id="comparisons" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mb-10 max-w-2xl">
            <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs font-semibold">
              <Scale className="mr-1 h-3 w-3" /> Quick comparisons
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              The products Indians confuse most —{" "}
              <span className="text-primary">cleared up</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tap a pair to see a side-by-side educational comparison. Then ask FinSaathi
              which one fits <em>your</em> profile.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <Comparator compact onAskAbout={onAskTopic} />
          </motion.div>
        </div>
      </section>

      {/* ===================== QUICK TOPICS ===================== */}
      <section className="bg-secondary/50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs font-semibold">
                <Zap className="mr-1 h-3 w-3" /> Quick topics
              </Badge>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Don’t know where to start? Start here.
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                These are the five questions almost every first-time Indian investor asks.
                Tap any of them to jump straight into a personalised answer — no typing needed.
              </p>
              <Button onClick={onLaunch} className="mt-6 rounded-full shadow-sm" size="lg">
                <HelpCircle className="mr-2 h-4 w-4" />
                Try a quick topic
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {QUICK_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => onAskTopic(topic)}
                  className="group rounded-full border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  {topic}
                  <ArrowRight className="ml-1.5 inline h-3.5 w-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== SCOPE ===================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs font-semibold">
              <Landmark className="mr-1 h-3 w-3" /> Scope
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Covered topics, backed by Indian regulators
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every explanation references SEBI, AMFI or IRDAI where relevant — so you learn
              who regulates what, not just what the product does.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCOPE_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-foreground">
                  <Landmark className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold">{area.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="bg-secondary/50 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs font-semibold">
              FAQ
            </Badge>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Questions, answered honestly
            </h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border bg-card px-5 shadow-sm last:border-b"
                >
                  <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            {...fadeUp}
            className="dot-grid relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center shadow-xl sm:px-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <h2 className="font-display relative text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to make your money make sense?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/85">
              Join the first-time investors learning personal finance the simple way —
              free, personalised, and in language you already speak.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={onLaunch}
                className="rounded-full bg-background font-bold text-primary hover:bg-background/90"
              >
                Start learning free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onAskTopic(QUICK_TOPICS[0])}
                className="rounded-full border-primary-foreground/40 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Ask “What is SIP?”
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
