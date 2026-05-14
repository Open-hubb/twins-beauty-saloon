"use client";

export function MarqueeStrip({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const content = items.join(" — ");
  const repeated = `${content} — ${content} — ${content} — `;

  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div
        className="marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        <span className="whitespace-nowrap text-[clamp(0.75rem,1.5vw,1rem)] font-medium tracking-[0.3em] text-text-dim uppercase px-4">
          {repeated}
        </span>
        <span className="whitespace-nowrap text-[clamp(0.75rem,1.5vw,1rem)] font-medium tracking-[0.3em] text-text-dim uppercase px-4">
          {repeated}
        </span>
      </div>
    </div>
  );
}
