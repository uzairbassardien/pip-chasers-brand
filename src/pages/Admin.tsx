import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Inquiry,
  isSupabaseConfigured,
  supabase,
  Testimonial,
} from "@/lib/supabase";

type AdminTab = "overview" | "inquiries" | "testimonials";
type TestimonialDraft = Omit<Testimonial, "id" | "created_at">;

const emptyDraft: TestimonialDraft = {
  name: "",
  role: "",
  content: "",
  rating: 5,
  category: "Trading",
  is_published: false,
};

const navigation: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

function AdminSetup() {
  return (
    <main className="min-h-screen bg-[#f4f6fa] px-5 py-12 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="font-display text-xl font-bold text-slate-900">
          Pip Chasers <span className="text-blue-600">/ Admin</span>
        </a>
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Settings className="h-7 w-7" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">One-time setup</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Connect your Supabase project
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            The admin panel is ready. Add your project keys and database schema to enable secure sign-in,
            inquiry management, and testimonials.
          </p>
          <ol className="mt-8 space-y-5">
            {[
              ["Create a Supabase project", "In Supabase, create a project and open Project Settings → API."],
              ["Add your local keys", "Copy .env.example to .env.local and fill in your Project URL and publishable/anon key."],
              ["Create the tables", "Run supabase/schema.sql in the Supabase SQL Editor."],
              ["Allow your account", "Create or invite a user in Authentication → Users, then run the admin access SQL from the schema comments."],
            ].map(([title, text], index) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <strong>Security note:</strong> use only the browser-safe anon/publishable key here. Never add a
            Supabase service-role key to a Vite environment variable or browser code.
          </div>
          <p className="mt-6 text-sm text-slate-500">
            After saving .env.local, restart the dev server and visit <code>/admin</code>.
          </p>
          <Button className="mt-6" variant="outline" onClick={() => window.location.reload()}>
            Check configuration
          </Button>
        </section>
      </div>
    </main>
  );
}

function AdminLogin({
  onSignedIn,
}: {
  onSignedIn: (session: Session) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setIsSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    onSignedIn(data.session);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6fa] px-5 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <a href="/" className="font-display text-xl font-bold">
          Pip Chasers <span className="text-blue-600">/ Admin</span>
        </a>
        <div className="mb-6 mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Sign in with the admin account you authorized in Supabase.
        </p>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">
            Email
            <Input
              className="mt-2 h-11"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <Input
              className="mt-2 h-11"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
            />
          </label>
          <Button className="h-11 w-full bg-blue-700 text-white hover:bg-blue-800" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in to dashboard"}
          </Button>
        </form>
        <a href="/" className="mt-6 inline-flex text-sm font-medium text-slate-500 hover:text-slate-900">
          <ArrowDownRight className="mr-2 h-4 w-4 rotate-45" /> Back to website
        </a>
      </section>
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const statusStyles: Record<Inquiry["status"], string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-200",
  read: "bg-amber-50 text-amber-700 ring-amber-200",
  replied: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function AdminDashboard({ session }: { session: Session }) {
  const [tab, setTab] = useState<AdminTab>("overview");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false);
  const [draft, setDraft] = useState<TestimonialDraft>(emptyDraft);
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);
    setLoadError("");
    const [inquiryResult, testimonialResult] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    ]);
    setIsLoading(false);
    if (inquiryResult.error || testimonialResult.error) {
      const message = inquiryResult.error?.message ?? testimonialResult.error?.message ?? "Could not load dashboard data.";
      setLoadError(message);
      toast.error(message);
      return;
    }
    setInquiries((inquiryResult.data ?? []) as Inquiry[]);
    setTestimonials((testimonialResult.data ?? []) as Testimonial[]);
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const filteredInquiries = useMemo(() => {
    const term = search.trim().toLowerCase();
    return inquiries.filter((inquiry) =>
      [inquiry.full_name, inquiry.email, inquiry.subject, inquiry.message]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [inquiries, search]);

  const newInquiries = inquiries.filter((inquiry) => inquiry.status === "new").length;
  const updateInquiryStatus = async (inquiry: Inquiry, status: Inquiry["status"]) => {
    if (!supabase) return;
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", inquiry.id);
    if (error) {
      toast.error(`Could not update inquiry: ${error.message}`);
      return;
    }
    setInquiries((current) => current.map((item) => item.id === inquiry.id ? { ...item, status } : item));
    setActiveInquiry((current) => current?.id === inquiry.id ? { ...current, status } : current);
    toast.success("Inquiry status updated.");
  };

  const deleteInquiry = async (inquiry: Inquiry) => {
    if (!supabase || !window.confirm(`Delete the inquiry from ${inquiry.full_name}? This cannot be undone.`)) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", inquiry.id);
    if (error) {
      toast.error(`Could not delete inquiry: ${error.message}`);
      return;
    }
    setInquiries((current) => current.filter((item) => item.id !== inquiry.id));
    setActiveInquiry(null);
    toast.success("Inquiry deleted.");
  };

  const openCreateTestimonial = () => {
    setEditingTestimonial(null);
    setDraft(emptyDraft);
    setIsTestimonialDialogOpen(true);
  };

  const openEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setDraft({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
      category: testimonial.category,
      is_published: testimonial.is_published,
    });
    setIsTestimonialDialogOpen(true);
  };

  const saveTestimonial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setIsSaving(true);
    const query = editingTestimonial
      ? supabase.from("testimonials").update(draft).eq("id", editingTestimonial.id)
      : supabase.from("testimonials").insert(draft);
    const { error } = await query;
    setIsSaving(false);
    if (error) {
      toast.error(`Could not save testimonial: ${error.message}`);
      return;
    }
    setIsTestimonialDialogOpen(false);
    toast.success(editingTestimonial ? "Testimonial updated." : "Testimonial added.");
    await loadData();
  };

  const togglePublished = async (testimonial: Testimonial) => {
    if (!supabase) return;
    const isPublished = !testimonial.is_published;
    const { error } = await supabase.from("testimonials").update({ is_published: isPublished }).eq("id", testimonial.id);
    if (error) {
      toast.error(`Could not update testimonial: ${error.message}`);
      return;
    }
    setTestimonials((current) => current.map((item) => item.id === testimonial.id ? { ...item, is_published: isPublished } : item));
    toast.success(isPublished ? "Testimonial published on the website." : "Testimonial unpublished.");
  };

  const deleteTestimonial = async (testimonial: Testimonial) => {
    if (!supabase || !window.confirm(`Delete the testimonial from ${testimonial.name}? This cannot be undone.`)) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", testimonial.id);
    if (error) {
      toast.error(`Could not delete testimonial: ${error.message}`);
      return;
    }
    setTestimonials((current) => current.filter((item) => item.id !== testimonial.id));
    toast.success("Testimonial deleted.");
  };

  const signOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(`Could not sign out: ${error.message}`);
  };

  const sidebar = (
    <aside className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0`}>
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
        <a href="/" className="font-display text-xl font-extrabold tracking-tight text-slate-900">
          Pip Chasers<span className="text-blue-700">.</span>
        </a>
        <button className="text-slate-500 lg:hidden" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
        <nav className="space-y-1">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setTab(id); setIsSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${tab === id ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span>{label}</span>
              {id === "inquiries" && newInquiries > 0 && (
                <span className="ml-auto rounded-full bg-blue-700 px-2 py-0.5 text-[10px] font-bold text-white">{newInquiries}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
            {session.user.email?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-800">Administrator</p>
            <p className="truncate text-[11px] text-slate-500">{session.user.email}</p>
          </div>
        </div>
        <button onClick={() => void signOut()} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-900">
      {sidebar}
      {isSidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" aria-label="Close navigation" onClick={() => setIsSidebarOpen(false)} />}
      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button className="text-slate-600 lg:hidden" aria-label="Open menu" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Admin workspace</p>
              <h1 className="font-display text-lg font-bold">{navigation.find((item) => item.id === tab)?.label}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-slate-500 hover:text-slate-900 sm:block">View website</a>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
              {session.user.email?.[0]?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          {loadError && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <span>Dashboard data could not be loaded: {loadError}</span>
              <Button variant="outline" size="sm" onClick={() => void loadData()}>Try again</Button>
            </div>
          )}
          {isLoading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading your workspace…</div>
          ) : tab === "overview" ? (
            <Overview
              inquiries={inquiries}
              newInquiries={newInquiries}
              testimonials={testimonials}
              onViewInquiries={() => setTab("inquiries")}
              onViewTestimonials={() => setTab("testimonials")}
              onOpenInquiry={setActiveInquiry}
            />
          ) : tab === "inquiries" ? (
            <InquiriesView
              inquiries={filteredInquiries}
              search={search}
              onSearch={setSearch}
              onOpen={setActiveInquiry}
            />
          ) : (
            <TestimonialsView
              testimonials={testimonials}
              onCreate={openCreateTestimonial}
              onEdit={openEditTestimonial}
              onToggle={togglePublished}
              onDelete={deleteTestimonial}
            />
          )}
        </main>
      </div>

      <InquiryDialog
        inquiry={activeInquiry}
        onClose={() => setActiveInquiry(null)}
        onStatusChange={updateInquiryStatus}
        onDelete={deleteInquiry}
      />
      <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? "Edit testimonial" : "Add a testimonial"}</DialogTitle>
            <DialogDescription>Published testimonials appear on the public website.</DialogDescription>
          </DialogHeader>
          <form onSubmit={(event) => void saveTestimonial(event)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Name
                <Input required maxLength={100} className="mt-1.5" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
              </label>
              <label className="text-sm font-medium">Role
                <Input required maxLength={100} className="mt-1.5" value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} />
              </label>
            </div>
            <label className="block text-sm font-medium">Quote
              <Textarea required maxLength={1200} rows={5} className="mt-1.5" value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Category
                <Input required maxLength={50} className="mt-1.5" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
              </label>
              <label className="text-sm font-medium">Rating
                <select className="mt-1.5 h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={draft.rating} onChange={(event) => setDraft({ ...draft, rating: Number(event.target.value) })}>
                  {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}
                </select>
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={draft.is_published} onChange={(event) => setDraft({ ...draft, is_published: event.target.checked })} className="h-4 w-4 accent-blue-700" />
              Publish on the website
            </label>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTestimonialDialogOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800" disabled={isSaving}>{isSaving ? "Saving…" : "Save testimonial"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Overview({
  inquiries,
  newInquiries,
  testimonials,
  onViewInquiries,
  onViewTestimonials,
  onOpenInquiry,
}: {
  inquiries: Inquiry[];
  newInquiries: number;
  testimonials: Testimonial[];
  onViewInquiries: () => void;
  onViewTestimonials: () => void;
  onOpenInquiry: (inquiry: Inquiry) => void;
}) {
  const recent = inquiries.slice(0, 5);
  const cards = [
    { label: "Total inquiries", value: inquiries.length, icon: Inbox, note: `${newInquiries} need attention`, trend: true },
    { label: "New this week", value: inquiries.filter((item) => Date.now() - new Date(item.created_at).getTime() < 7 * 24 * 60 * 60 * 1000).length, icon: Activity, note: "Last 7 days", trend: true },
    { label: "Testimonials", value: testimonials.length, icon: MessageSquareQuote, note: `${testimonials.filter((item) => item.is_published).length} published`, trend: false },
  ];
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-700">Your brand, at a glance</p>
          <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Good to see you.</h2>
          <p className="mt-2 text-sm text-slate-500">Here’s what’s happening with Pip Chasers today.</p>
        </div>
        <Button onClick={onViewInquiries} className="bg-blue-700 text-white hover:bg-blue-800">
          <Inbox className="mr-2 h-4 w-4" /> Open inbox
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, note, trend }) => (
          <section key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-[18px] w-[18px]" /></span>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <p className="font-display text-3xl font-bold">{value}</p>
              <span className={`flex items-center text-xs font-semibold ${trend ? "text-emerald-700" : "text-slate-500"}`}>
                {trend && <ArrowUpRight className="mr-1 h-4 w-4" />}{note}
              </span>
            </div>
          </section>
        ))}
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 md:px-6">
          <div>
            <h3 className="font-display text-lg font-bold">Recent inquiries</h3>
            <p className="mt-0.5 text-xs text-slate-500">Latest messages from your website</p>
          </div>
          <button onClick={onViewInquiries} className="text-sm font-semibold text-blue-700 hover:text-blue-900">View all <span aria-hidden="true">→</span></button>
        </div>
        {recent.length ? (
          <div className="divide-y divide-slate-100">
            {recent.map((inquiry) => (
              <button key={inquiry.id} onClick={() => onOpenInquiry(inquiry)} className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 md:px-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">{inquiry.full_name.charAt(0).toUpperCase()}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{inquiry.full_name}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{inquiry.subject} · {inquiry.email}</p>
                </div>
                <span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ring-1 ring-inset sm:inline-flex ${statusStyles[inquiry.status]}`}>{inquiry.status}</span>
                <span className="hidden text-xs text-slate-400 md:block">{formatDate(inquiry.created_at)}</span>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState icon={Inbox} title="Your inbox is clear" description="New messages from your contact form will appear here." />
        )}
      </section>
      <button onClick={onViewTestimonials} className="flex w-full items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/70 p-5 text-left hover:bg-blue-50">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700"><FileText className="h-5 w-5" /></div>
          <div><p className="text-sm font-bold">Manage social proof</p><p className="mt-1 text-xs text-slate-600">Edit and publish testimonials to your site.</p></div>
        </div>
        <ArrowUpRight className="h-5 w-5 text-blue-700" />
      </button>
    </div>
  );
}

function InquiriesView({
  inquiries,
  search,
  onSearch,
  onOpen,
}: {
  inquiries: Inquiry[];
  search: string;
  onSearch: (value: string) => void;
  onOpen: (inquiry: Inquiry) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold text-blue-700">Messages</p><h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Inquiry inbox</h2><p className="mt-2 text-sm text-slate-500">Read and track messages submitted through your website.</p></div>
        <div className="relative w-full sm:w-72"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search inquiries…" className="pl-9" /></div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {inquiries.length ? (
          <div className="divide-y divide-slate-100">
            {inquiries.map((inquiry) => (
              <button key={inquiry.id} onClick={() => onOpen(inquiry)} className="flex w-full flex-wrap items-center gap-4 px-5 py-4 text-left transition hover:bg-slate-50 md:flex-nowrap md:px-6">
                <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${inquiry.status === "new" ? "bg-blue-600" : "bg-transparent"}`} />
                <div className="min-w-[140px] flex-1">
                  <p className="text-sm font-bold">{inquiry.full_name}</p>
                  <p className="mt-1 text-xs text-slate-500">{inquiry.email}</p>
                </div>
                <div className="min-w-0 flex-[2]">
                  <p className="truncate text-sm font-semibold">{inquiry.subject}</p>
                  <p className="mt-1 truncate text-xs text-slate-500">{inquiry.message}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ring-1 ring-inset ${statusStyles[inquiry.status]}`}>{inquiry.status}</span>
                <span className="w-36 text-right text-xs text-slate-400">{formatDate(inquiry.created_at)}</span>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState icon={Inbox} title={search ? "No matching inquiries" : "No inquiries yet"} description={search ? "Try a different search term." : "When someone sends your contact form, it will show up here."} />
        )}
      </div>
    </div>
  );
}

function TestimonialsView({
  testimonials,
  onCreate,
  onEdit,
  onToggle,
  onDelete,
}: {
  testimonials: Testimonial[];
  onCreate: () => void;
  onEdit: (testimonial: Testimonial) => void;
  onToggle: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold text-blue-700">Website content</p><h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Testimonials</h2><p className="mt-2 text-sm text-slate-500">Manage the stories visitors see on your website.</p></div>
        <Button onClick={onCreate} className="bg-blue-700 text-white hover:bg-blue-800"><Plus className="mr-2 h-4 w-4" /> Add testimonial</Button>
      </div>
      {testimonials.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-1 text-amber-400">{Array.from({ length: testimonial.rating }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${testimonial.is_published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{testimonial.is_published ? "Published" : "Draft"}</span>
              </div>
              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">“{testimonial.content}”</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <div><p className="text-sm font-bold">{testimonial.name}</p><p className="mt-0.5 text-xs text-slate-500">{testimonial.role} · {testimonial.category}</p></div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => onToggle(testimonial)}>{testimonial.is_published ? "Unpublish" : "Publish"}</Button>
                  <Button size="sm" variant="outline" onClick={() => onEdit(testimonial)}>Edit</Button>
                  <Button size="icon" variant="ghost" aria-label={`Delete testimonial from ${testimonial.name}`} onClick={() => onDelete(testimonial)} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState icon={MessageSquareQuote} title="No testimonials added" description="Add a customer quote to feature it on your website." action={<Button onClick={onCreate} className="mt-4 bg-blue-700 text-white hover:bg-blue-800"><Plus className="mr-2 h-4 w-4" /> Add testimonial</Button>} />
      )}
    </div>
  );
}

function InquiryDialog({
  inquiry,
  onClose,
  onStatusChange,
  onDelete,
}: {
  inquiry: Inquiry | null;
  onClose: () => void;
  onStatusChange: (inquiry: Inquiry, status: Inquiry["status"]) => void;
  onDelete: (inquiry: Inquiry) => void;
}) {
  return (
    <Dialog open={Boolean(inquiry)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        {inquiry && <>
          <DialogHeader>
            <DialogTitle>{inquiry.subject}</DialogTitle>
            <DialogDescription>Received {formatDate(inquiry.created_at)} from {inquiry.full_name}</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact</p>
            <a className="mt-2 block text-sm font-semibold text-blue-700 hover:underline" href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
          </div>
          <div className="whitespace-pre-wrap rounded-xl border border-slate-100 p-4 text-sm leading-7 text-slate-700">{inquiry.message}</div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Status</span>
              <select className="h-9 rounded-md border border-input bg-background px-2 text-sm capitalize" value={inquiry.status} onChange={(event) => onStatusChange(inquiry, event.target.value as Inquiry["status"])}>
                <option value="new">New</option><option value="read">Read</option><option value="replied">Replied</option>
              </select>
            </div>
            <a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: ${inquiry.subject}`)}`} className="inline-flex h-9 items-center rounded-md bg-blue-700 px-3 text-sm font-semibold text-white hover:bg-blue-800">Reply by email</a>
          </div>
          <DialogFooter className="flex-row justify-between sm:justify-between">
            <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => void onDelete(inquiry)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DialogFooter>
        </>}
      </DialogContent>
    </Dialog>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof Inbox;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
      {action}
    </div>
  );
}

function AdminAccessDenied({ email }: { email?: string }) {
  const signOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(`Could not sign out: ${error.message}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f6fa] px-5 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-bold">Admin access required</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {email} is signed in, but has not been added to <code>admin_users</code>. Ask the project owner to grant access in Supabase.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => void signOut()}>Sign out</Button>
      </section>
    </main>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let isMounted = true;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return;
      if (error) toast.error(`Could not check your session: ${error.message}`);
      setSession(data.session);
      setIsCheckingSession(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session || !supabase) {
      setIsAdmin(null);
      return;
    }
    let isMounted = true;
    void supabase.rpc("is_admin").then(({ data, error }) => {
      if (!isMounted) return;
      if (error) {
        toast.error(`Could not verify admin access: ${error.message}`);
        setIsAdmin(false);
        return;
      }
      setIsAdmin(data === true);
    });
    return () => {
      isMounted = false;
    };
  }, [session]);

  if (!isSupabaseConfigured) return <AdminSetup />;
  if (isCheckingSession) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f4f6fa] text-sm text-slate-500">Checking secure session…</main>;
  }
  if (!session) return <AdminLogin onSignedIn={setSession} />;
  if (isAdmin === null) return <main className="flex min-h-screen items-center justify-center bg-[#f4f6fa] text-sm text-slate-500">Verifying administrator access…</main>;
  return isAdmin ? <AdminDashboard session={session} /> : <AdminAccessDenied email={session.user.email} />;
}
