"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinSaathiLogo } from "@/components/finsathi/logo";
import { LandingPage } from "@/components/finsathi/landing";
import { ProfileView } from "@/components/finsathi/profile-view";
import { ChatView } from "@/components/finsathi/chat-view";
import { useFinSaathi } from "@/lib/finsathi/store";

type View = "landing" | "profile" | "chat";

const VIEW_TITLES: Record<Exclude<View, "landing">, string> = {
  profile: "Financial Profile",
  chat: "AI Chat",
};

function subscribeToHydration(onChange: () => void) {
  return useFinSaathi.persist.onFinishHydration(onChange);
}

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [initialTopic, setInitialTopic] = useState<string | null>(null);
  // Track zustand persist rehydration to avoid SSR mismatch flicker
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => useFinSaathi.persist.hasHydrated(),
    () => false
  );

  const launchApp = useCallback(() => {
    // If the user already has a profile, jump straight to chat
    setInitialTopic(null);
    setView(useFinSaathi.getState().profile ? "chat" : "profile");
  }, []);

  const askTopic = useCallback((topic: string) => {
    setInitialTopic(topic);
    setView("chat");
  }, []);

  const goLanding = useCallback(() => {
    setInitialTopic(null);
    setView("landing");
  }, []);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm font-medium">Loading FinSaathi…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {view === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LandingPage onLaunch={launchApp} onAskTopic={askTopic} />
          </motion.div>
        )}

        {view !== "landing" && (
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-screen flex-col"
          >
            {/* App header */}
            <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <button onClick={goLanding} aria-label="Back to home">
                  <FinSaathiLogo />
                </button>
                <div className="flex items-center gap-2">
                  <nav className="flex items-center rounded-full border bg-card p-1" aria-label="App navigation">
                    {(["profile", "chat"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setView(v)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
                          view === v
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {VIEW_TITLES[v]}
                      </button>
                    ))}
                  </nav>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goLanding}
                    className="hidden rounded-full text-muted-foreground sm:inline-flex"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Home
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1">
              {view === "profile" && <ProfileView onGoToChat={() => setView("chat")} />}
              {view === "chat" && (
                <ChatView
                  onGoToProfile={() => setView("profile")}
                  initialTopic={initialTopic}
                  onInitialTopicConsumed={() => setInitialTopic(null)}
                />
              )}
            </main>

            <footer className="mt-auto border-t bg-secondary/40 px-4 py-4 sm:px-6">
              <p className="mx-auto max-w-6xl text-center text-[11px] leading-relaxed text-muted-foreground">
                Disclaimer: FinSaathi provides educational information only. It is not
                financial, investment, tax, legal, or insurance advice. Please consult a
                SEBI-registered advisor before investing.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
