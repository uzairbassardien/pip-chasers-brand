export const trackedActions = {
  join_now: "Join Now",
  join_pip_chasers: "Join Pip Chasers",
  view_services: "View Services",
  send_message: "Send Message",
  signals_monthly: "Signals — Monthly",
  signals_yearly: "Signals — Yearly",
  mentorship_monthly: "Mentorship — Monthly",
  mentorship_yearly: "Mentorship — Yearly",
  mentorship_lifetime: "Mentorship — Lifetime",
  service_learn_more: "Service — Learn More",
  gallery_view_more: "Gallery — View More",
} as const;

export type TrackedAction = keyof typeof trackedActions;

export type ButtonClickStat = {
  action_key: TrackedAction;
  click_date: string;
  clicks: number;
};

export function isTrackedAction(value: string): value is TrackedAction {
  return Object.prototype.hasOwnProperty.call(trackedActions, value);
}
