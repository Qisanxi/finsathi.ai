import { cn } from "@/lib/utils";

export function FinSaathiLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm">
        <span className="font-display text-lg font-extrabold text-primary-foreground">₹</span>
        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-foreground/80" />
        </span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          FinSaathi
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Money, made simple
        </span>
      </div>
    </div>
  );
}
