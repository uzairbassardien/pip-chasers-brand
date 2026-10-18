import { useEffect } from "react";
import {
  isTrackedAction,
  TrackedAction,
} from "@/lib/buttonTracking";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL?.trim() ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
  "";
const supabaseKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  ""
).trim();
const flushIntervalMs = 60_000;
const flushThreshold = 10;

export default function ButtonClickTracker() {
  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) return;

    let pending: Partial<Record<TrackedAction, number>> = {};
    let isFlushing = false;

    const flush = async () => {
      if (isFlushing || Object.keys(pending).length === 0) return;
      const batch = pending;
      pending = {};
      isFlushing = true;

      try {
        const response = await fetch(
          `${supabaseUrl}/rest/v1/rpc/record_button_clicks`,
          {
            method: "POST",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ p_clicks: batch }),
            keepalive: true,
          },
        );

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`Supabase returned ${response.status}: ${error}`);
        }
      } catch (error) {
        console.warn("Could not save button click analytics; retrying later.", error);
        for (const [action, count] of Object.entries(batch)) {
          if (isTrackedAction(action)) {
            pending[action] = (pending[action] ?? 0) + (count ?? 0);
          }
        }
      } finally {
        isFlushing = false;
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (window.location.pathname.startsWith("/admin")) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trackedElement = target.closest<HTMLElement>("[data-track-click]");
      const action = trackedElement?.dataset.trackClick;
      if (!action || !isTrackedAction(action)) return;

      pending[action] = (pending[action] ?? 0) + 1;
      if (Object.values(pending).reduce((sum, count) => sum + (count ?? 0), 0) >= flushThreshold) {
        void flush();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") void flush();
    };

    const interval = window.setInterval(() => void flush(), flushIntervalMs);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", flush);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", flush);
      void flush();
    };
  }, []);

  return null;
}
