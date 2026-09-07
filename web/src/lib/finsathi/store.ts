"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ChatMessage, FinancialProfile } from "./types";

interface FinSaathiState {
  profile: FinancialProfile | null;
  messages: ChatMessage[];
  isThinking: boolean;
  saveProfile: (profile: FinancialProfile) => void;
  clearProfile: () => void;
  addMessage: (message: ChatMessage) => void;
  setThinking: (thinking: boolean) => void;
  resetChat: () => void;
}

export const useFinSaathi = create<FinSaathiState>()(
  persist(
    (set) => ({
      profile: null,
      messages: [],
      isThinking: false,
      saveProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      setThinking: (isThinking) => set({ isThinking }),
      resetChat: () => set({ messages: [] }),
    }),
    {
      name: "finsaathi-state",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        messages: state.messages,
      }),
    }
  )
);
