"use client";

import { useEffect, useState } from "react";

// The merchant's whole-site content, edited in the Flot dashboard and served
// from its public API (hard-isolated by merchant). Every field is optional —
// each section component falls back to its own bundled copy, so the site never
// renders blank if the API is unreachable or a field is left empty.
const SITE_CONTENT_API =
  "https://dashboard.flotme.ai/api/public/site-content/5d43fac9-9f53-4892-a7f2-817987d9ea5e";

export interface SiteContent {
  hero: { badge: string; title: string; subtitle: string; ctaText: string };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    stats: { value: string; label: string }[];
  };
  testimonials: { name: string; role: string; quote: string }[];
  contact: {
    address: string;
    addressLink: string;
    phone: string;
    email: string;
    hours: string;
    whatsapp: string;
    mapEmbed: string;
  };
  footer: { tagline: string; email: string; instagram: string };
  marquee: { primary: string[]; secondary: string[] };
}

const EMPTY: SiteContent = {
  hero: { badge: "", title: "", subtitle: "", ctaText: "" },
  about: { eyebrow: "", title: "", body: "", stats: [] },
  testimonials: [],
  contact: { address: "", addressLink: "", phone: "", email: "", hours: "", whatsapp: "", mapEmbed: "" },
  footer: { tagline: "", email: "", instagram: "" },
  marquee: { primary: [], secondary: [] },
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

function normalize(d: Record<string, unknown> | null | undefined): SiteContent {
  if (!d) return EMPTY;
  const hero = (d.hero ?? {}) as Record<string, unknown>;
  const about = (d.about ?? {}) as Record<string, unknown>;
  const contact = (d.contact ?? {}) as Record<string, unknown>;
  const footer = (d.footer ?? {}) as Record<string, unknown>;
  const marquee = (d.marquee ?? {}) as Record<string, unknown>;
  return {
    hero: { badge: str(hero.badge), title: str(hero.title), subtitle: str(hero.subtitle), ctaText: str(hero.ctaText) },
    about: {
      eyebrow: str(about.eyebrow),
      title: str(about.title),
      body: str(about.body),
      stats: arr<{ value: string; label: string }>(about.stats).map((s) => ({ value: str(s?.value), label: str(s?.label) })),
    },
    testimonials: arr<{ name: string; role: string; quote: string }>(d.testimonials).map((t) => ({
      name: str(t?.name),
      role: str(t?.role),
      quote: str(t?.quote),
    })),
    contact: {
      address: str(contact.address),
      addressLink: str(contact.addressLink),
      phone: str(contact.phone),
      email: str(contact.email),
      hours: str(contact.hours),
      whatsapp: str(contact.whatsapp),
      mapEmbed: str(contact.mapEmbed),
    },
    footer: { tagline: str(footer.tagline), email: str(footer.email), instagram: str(footer.instagram) },
    marquee: { primary: arr<string>(marquee.primary).map(str).filter(Boolean), secondary: arr<string>(marquee.secondary).map(str).filter(Boolean) },
  };
}

// Live preview: the Flot dashboard CMS editor streams unsaved content via
// postMessage when the site is embedded in its preview iframe. We prefer that
// draft over the fetched content.
let previewData: Record<string, unknown> | null = null;
const previewSubs = new Set<() => void>();
function initPreview() {
  if (typeof window === "undefined" || window.parent === window) return;
  const w = window as unknown as { __flotSCPreviewInit?: boolean };
  if (w.__flotSCPreviewInit) return;
  w.__flotSCPreviewInit = true;
  window.addEventListener("message", (e: MessageEvent) => {
    if (e.origin !== "https://dashboard.flotme.ai") return;
    const d = e.data;
    if (!d || d.source !== "flot-dashboard" || d.type !== "site-content-preview" || !d.content) return;
    previewData = d.content as Record<string, unknown>;
    previewSubs.forEach((fn) => fn());
  });
  window.parent.postMessage({ source: "flot-site", type: "preview-ready" }, "https://dashboard.flotme.ai");
}

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(EMPTY);

  useEffect(() => {
    let cancelled = false;
    initPreview();
    const apply = () => { if (!cancelled && previewData) setContent(normalize(previewData)); };
    const sub = () => apply();
    previewSubs.add(sub);
    if (previewData) apply();
    else {
      fetch(SITE_CONTENT_API)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => { if (!cancelled && !previewData && data) setContent(normalize(data)); })
        .catch(() => {});
    }
    return () => { cancelled = true; previewSubs.delete(sub); };
  }, []);

  return content;
}
