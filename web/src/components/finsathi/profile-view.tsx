"use client";

import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarRange,
  CheckCircle2,
  IndianRupee,
  PiggyBank,
  Shield,
  Target,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFinSaathi } from "@/lib/finsathi/store";
import type { FinancialProfile } from "@/lib/finsathi/types";
import {
  AGE_OPTIONS,
  EMPLOYMENT_OPTIONS,
  GOAL_OPTIONS,
  HORIZON_OPTIONS,
  INCOME_OPTIONS,
  RISK_OPTIONS,
  SAVINGS_OPTIONS,
} from "@/lib/finsathi/data";

interface SelectFieldProps {
  label: string;
  icon: React.ElementType;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

function SelectField({ label, icon: Icon, value, options, onChange, placeholder }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-1.5 text-sm font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </Label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder ?? "Select…"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ProfileView({ onGoToChat }: { onGoToChat: () => void }) {
  const profile = useFinSaathi((s) => s.profile);
  const saveProfile = useFinSaathi((s) => s.saveProfile);
  const { toast } = useToast();

  const [form, setForm] = useState<FinancialProfile>({
    age_range: profile?.age_range ?? "25-34",
    employment_type: profile?.employment_type ?? "Salaried",
    monthly_income: profile?.monthly_income ?? "Prefer not to say",
    monthly_savings: profile?.monthly_savings ?? "Not saving yet",
    primary_goal: profile?.primary_goal ?? "Start investing",
    risk_tolerance: profile?.risk_tolerance ?? "Medium",
    investment_horizon: profile?.investment_horizon ?? "3-7 years",
  });

  const [saved, setSaved] = useState(false);

  const set = (key: keyof FinancialProfile) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    saveProfile(form);
    setSaved(true);
    toast({
      title: "Profile saved",
      description: "FinSaathi will now personalise explanations for you.",
    });
  };

  const summaryItems = [
    { icon: Target, label: "Goal", value: form.primary_goal },
    { icon: Briefcase, label: "Employment", value: form.employment_type },
    { icon: Shield, label: "Risk Comfort", value: form.risk_tolerance },
    { icon: PiggyBank, label: "Monthly Savings", value: form.monthly_savings },
    { icon: CalendarRange, label: "Time Horizon", value: form.investment_horizon },
    { icon: UserRound, label: "Age Range", value: form.age_range },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Your financial profile
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Share a few details so FinSaathi can personalise educational guidance.
          Everything stays in your browser — nothing is uploaded.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg">Tell us about yourself</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Age range"
              icon={UserRound}
              value={form.age_range}
              options={AGE_OPTIONS}
              onChange={set("age_range")}
            />
            <SelectField
              label="Employment type"
              icon={Briefcase}
              value={form.employment_type}
              options={EMPLOYMENT_OPTIONS}
              onChange={set("employment_type")}
            />
            <SelectField
              label="Monthly income range"
              icon={IndianRupee}
              value={form.monthly_income}
              options={INCOME_OPTIONS}
              onChange={set("monthly_income")}
            />
            <SelectField
              label="Monthly savings capacity"
              icon={PiggyBank}
              value={form.monthly_savings}
              options={SAVINGS_OPTIONS}
              onChange={set("monthly_savings")}
            />
            <SelectField
              label="Primary financial goal"
              icon={Target}
              value={form.primary_goal}
              options={GOAL_OPTIONS}
              onChange={set("primary_goal")}
            />
            <SelectField
              label="Investment horizon"
              icon={CalendarRange}
              value={form.investment_horizon}
              options={HORIZON_OPTIONS}
              onChange={set("investment_horizon")}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-sm font-semibold">
              <Shield className="h-4 w-4 text-primary" />
              Risk comfort
            </Label>
            <RadioGroup
              value={form.risk_tolerance}
              onValueChange={set("risk_tolerance")}
              className="flex flex-wrap gap-2"
            >
              {RISK_OPTIONS.map((opt) => (
                <Label
                  key={opt}
                  className="flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all has-[button[data-state=checked]]:border-primary has-[button[data-state=checked]]:bg-primary/10 has-[button[data-state=checked]]:text-primary"
                >
                  <RadioGroupItem value={opt} className="sr-only" />
                  {opt}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {saved ? (
                <span className="flex items-center gap-1.5 font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" /> Profile saved — it will persist in this browser.
                </span>
              ) : (
                "You can update this anytime. Answers adapt instantly after saving."
              )}
            </p>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="rounded-full font-semibold shadow-sm">
                {saved ? <CheckCircle2 className="mr-1.5 h-4 w-4" /> : null}
                Save Profile
              </Button>
              <Button
                variant="outline"
                onClick={onGoToChat}
                className="rounded-full font-semibold"
              >
                Go to AI Chat
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {profile && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="font-display mb-4 text-lg font-bold">Profile summary</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border bg-card p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="truncate text-sm font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
