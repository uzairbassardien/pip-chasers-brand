import { describe, expect, it } from "vitest";
import { isTrackedAction, trackedActions } from "@/lib/buttonTracking";

describe("button click tracking", () => {
  it("accepts the actions registered for the public website", () => {
    expect(isTrackedAction("join_now")).toBe(true);
    expect(isTrackedAction("signals_yearly")).toBe(true);
    expect(isTrackedAction("send_message")).toBe(true);
    expect(Object.keys(trackedActions)).toHaveLength(11);
  });

  it("rejects unknown action names", () => {
    expect(isTrackedAction("admin_sign_out")).toBe(false);
    expect(isTrackedAction("random-button")).toBe(false);
  });
});
