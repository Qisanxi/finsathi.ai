"use client";

import { useState } from "react";
import { COMPARISONS } from "@/lib/finsathi/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Scale } from "lucide-react";

interface ComparatorProps {
  /** Called when a quick topic should be sent into chat */
  onAskAbout?: (topic: string) => void;
  compact?: boolean;
}

export function Comparator({ onAskAbout, compact = false }: ComparatorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const comparison = COMPARISONS.find((c) => c.key === selected);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {COMPARISONS.map((c) => (
          <Button
            key={c.key}
            variant={selected === c.key ? "default" : "outline"}
            size={compact ? "sm" : "default"}
            onClick={() => setSelected(selected === c.key ? null : c.key)}
            className={cn(
              "rounded-full transition-all",
              selected === c.key && "shadow-sm"
            )}
          >
            <Scale className="mr-1.5 h-4 w-4" />
            {c.title}
          </Button>
        ))}
        {selected && (
          <Button
            variant="ghost"
            size={compact ? "sm" : "default"}
            onClick={() => setSelected(null)}
            className="rounded-full"
          >
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      {comparison && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="border-b bg-secondary/60 px-4 py-3">
            <h4 className="font-display text-sm font-bold text-foreground sm:text-base">
              {comparison.title}
            </h4>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[160px] text-muted-foreground">Feature</TableHead>
                  <TableHead className="text-primary font-semibold">{comparison.columns[0]}</TableHead>
                  <TableHead className="text-gold-foreground font-semibold">{comparison.columns[1]}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.rows.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium text-foreground/80">{row.feature}</TableCell>
                    <TableCell className="text-sm">{row.left}</TableCell>
                    <TableCell className="text-sm">{row.right}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-t bg-muted/40 px-4 py-2.5">
            <p className="text-xs text-muted-foreground">
              Educational comparison only. Please verify current rules, rates, and product details from official sources before acting.
            </p>
            {onAskAbout && (
              <Button
                variant="link"
                size="sm"
                className="mt-1 h-auto p-0 text-xs font-semibold text-primary"
                onClick={() => onAskAbout(`Which is better for me: ${comparison.columns[0]} or ${comparison.columns[1]}?`)}
              >
                Ask FinSaathi which suits you →
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
