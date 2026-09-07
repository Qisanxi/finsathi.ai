"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Bot,
  RotateCcw,
  Send,
  Sparkles,
  TableProperties,
  UserRound,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useFinSaathi } from "@/lib/finsathi/store";
import { QUICK_TOPICS } from "@/lib/finsathi/data";
import type { ChatMessage, TemperatureMode } from "@/lib/finsathi/types";
import { Comparator } from "./comparator";
import { cn } from "@/lib/utils";

const MODE_META: Record<TemperatureMode, { label: string; className: string }> = {
  strict: { label: "Precise comparison", className: "bg-gold/15 text-gold-foreground" },
  creative: { label: "Simple explainer", className: "bg-primary/10 text-primary" },
  balanced: { label: "Balanced", className: "bg-secondary text-secondary-foreground" },
};

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

interface ChatViewProps {
  onGoToProfile: () => void;
  /** Topic requested from the landing page — sent automatically on mount */
  initialTopic?: string | null;
  onInitialTopicConsumed?: () => void;
}

export function ChatView({ onGoToProfile, initialTopic, onInitialTopicConsumed }: ChatViewProps) {
  const { profile, messages, addMessage, isThinking, setThinking, resetChat } = useFinSaathi();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [showComparator, setShowComparator] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isThinking, scrollToBottom]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isThinking) return;

      setError(null);
      setInput("");
      const userMessage: ChatMessage = { id: uid(), role: "user", content: trimmed };
      addMessage(userMessage);
      setThinking(true);

      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history, profile }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Something went wrong.");
        }
        addMessage({
          id: uid(),
          role: "model",
          content: data.response,
          mode: data.mode as TemperatureMode,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to get a response.";
        setError(message);
        toast({
          title: "FinSaathi hit a snag",
          description: message,
          variant: "destructive",
        });
      } finally {
        setThinking(false);
      }
    },
    [addMessage, isThinking, messages, profile, setThinking, toast]
  );

  // Pick up a topic requested from the landing page (run once on mount)
  useEffect(() => {
    if (initialTopic) {
      onInitialTopicConsumed?.();
      send(initialTopic);
    }
    // Run once on mount: initialTopic is intentionally read only here
  }, []);

  const askTopic = (topic: string) => {
    if (isThinking) {
      toast({
        title: "One at a time",
        description: "FinSaathi is still answering your last question.",
      });
      return;
    }
    send(topic);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px]">
      {/* ============ Main chat column ============ */}
      <div className="flex min-h-[70vh] flex-col rounded-2xl border bg-card shadow-sm">
        {/* Chat header */}
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-base font-bold leading-tight">Ask FinSaathi</h1>
              <p className="text-xs text-muted-foreground">
                Mutual funds · insurance · tax-saving · government schemes
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetChat();
                toast({ title: "Chat reset", description: "Started a fresh conversation." });
              }}
              className="shrink-0 rounded-full text-muted-foreground"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset
            </Button>
          )}
        </div>

        {!profile && (
          <button
            onClick={onGoToProfile}
            className="flex items-center gap-2 border-b bg-gold/10 px-4 py-2.5 text-left text-xs font-medium text-gold-foreground transition-colors hover:bg-gold/15 sm:px-5"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Complete your financial profile first for more personalised answers —{" "}
            <span className="font-bold underline">set it up now</span>
          </button>
        )}

        {/* Messages */}
        <div className="nice-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
          {messages.length === 0 && !isThinking && (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-display text-lg font-bold">Namaste! I’m FinSaathi 👋</h2>
              <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                Ask me about SIPs, ELSS, PPF, term insurance, PMAY, tax-saving or any
                beginner money question — in the words you already use.
              </p>
              <div className="mt-5 flex max-w-md flex-wrap justify-center gap-2">
                {QUICK_TOPICS.slice(0, 3).map((t) => (
                  <button
                    key={t}
                    onClick={() => askTopic(t)}
                    className="rounded-full border bg-background px-3.5 py-2 text-xs font-medium transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    msg.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {msg.role === "user" ? (
                    <UserRound className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                    msg.role === "user"
                      ? "rounded-tr-sm bg-primary text-primary-foreground"
                      : "chat-md rounded-tl-sm border bg-background"
                  )}
                >
                  {msg.role === "user" ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <>
                      {msg.mode && (
                        <Badge
                          variant="secondary"
                          className={cn("mb-2 rounded-full text-[10px] font-bold", MODE_META[msg.mode].className)}
                        >
                          {MODE_META[msg.mode].label}
                        </Badge>
                      )}
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border bg-background px-4 py-3 shadow-sm">
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60 [animation-delay:300ms]" />
                <span className="ml-1 text-xs text-muted-foreground">FinSaathi is thinking…</span>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t p-3 sm:p-4">
          {error && (
            <p className="mb-2 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error} — please try again.
            </p>
          )}
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about SIP, ELSS, PPF, term insurance, ULIP, tax saving…"
              className="max-h-32 min-h-[48px] flex-1 resize-none rounded-xl"
              rows={1}
              aria-label="Chat message"
            />
            <Button
              onClick={() => send(input)}
              disabled={!input.trim() || isThinking}
              size="icon"
              className="h-12 w-12 shrink-0 rounded-xl"
              aria-label="Send message"
            >
              <Send className="h-4.5 w-4.5" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Educational information only — not financial, investment, tax, legal or insurance advice.
          </p>
        </div>
      </div>

      {/* ============ Sidebar ============ */}
      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-sm font-bold">
              <Zap className="h-4 w-4 text-gold-foreground" />
              Quick Topics
            </CardTitle>
            <p className="text-xs text-muted-foreground">Tap to ask instantly</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => askTopic(topic)}
                disabled={isThinking}
                className="w-full rounded-lg border bg-background px-3.5 py-2.5 text-left text-xs font-medium transition-all hover:border-primary/40 hover:bg-secondary/60 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {topic}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-display text-sm font-bold">
              <TableProperties className="h-4 w-4 text-primary" />
              Quick Comparisons
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showComparator ? (
              <Comparator compact onAskAbout={askTopic} />
            ) : (
              <>
                <p className="text-xs text-muted-foreground">
                  Term vs ULIP · SIP vs Lumpsum · ELSS vs PPF — side-by-side at one tap.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparator(true)}
                  className="mt-3 w-full rounded-lg text-xs font-semibold"
                >
                  Open comparison tables
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {profile && (
          <Card className="bg-secondary/50">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-sm font-bold">Your profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              {[
                ["Goal", profile.primary_goal],
                ["Risk", profile.risk_tolerance],
                ["Horizon", profile.investment_horizon],
                ["Savings", profile.monthly_savings],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-right font-semibold">{v}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <button
                onClick={onGoToProfile}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Edit profile →
              </button>
            </CardContent>
          </Card>
        )}
      </aside>
    </div>
  );
}
