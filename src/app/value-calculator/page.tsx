"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Zap, Database, Settings, Check } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  employees: string;
  revenue: string;
  manualHours: number;
  capabilities: string[];
}

interface CapabilityResult {
  id: string;
  name: string;
  low: number;
  high: number;
  metric: string;
}

interface Results {
  totalLow: number;
  totalHigh: number;
  breakdown: CapabilityResult[];
  hoursSaved: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPLOYEE_LABELS = ["1 – 10", "11 – 50", "51 – 200", "201 – 500", "501 – 1K", "1K+"];
const EMPLOYEE_VALUES = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const REVENUE_LABELS = ["< $1M", "$1M – $5M", "$5M – $25M", "$25M – $100M", "$100M – $500M", "$500M+"];
const REVENUE_VALUES = ["<$1M", "$1M-$5M", "$5M-$25M", "$25M-$100M", "$100M-$500M", "$500M+"];

const EMP_MID: Record<string, number> = {
  "1-10": 5,
  "11-50": 30,
  "51-200": 125,
  "201-500": 350,
  "501-1000": 750,
  "1000+": 2000,
};

const REV_MID: Record<string, number> = {
  "<$1M": 500_000,
  "$1M-$5M": 3_000_000,
  "$5M-$25M": 15_000_000,
  "$25M-$100M": 62_500_000,
  "$100M-$500M": 300_000_000,
  "$500M+": 750_000_000,
};

const CAPABILITIES = [
  {
    id: "ai",
    name: "AI Orchestration",
    subtitle: "RAG · Agents · LLM Ops",
    description:
      "Automate decisions and workflows by deploying production AI systems across your organization — from RAG pipelines to autonomous multi-agent frameworks.",
    Icon: Zap,
  },
  {
    id: "data",
    name: "Data Engineering",
    subtitle: "Snowflake · dbt · Pipelines",
    description:
      "Transform raw enterprise data into reliable, AI-ready pipelines with governance, quality observability, and semantic layers built in.",
    Icon: Database,
  },
  {
    id: "ops",
    name: "Operational Redesign",
    subtitle: "M&A Integration · Process · Automation",
    description:
      "Compress multi-year integration timelines and redesign technical operations post-acquisition to protect projected deal value.",
    Icon: Settings,
  },
];

const TOTAL_STEPS = 3;
const WEEKS_TO_PRODUCTION = "< 6";
const DAYS_TO_ROI = 90;

// ─── Utilities ────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

function calculate(data: FormData): Results {
  const emp = EMP_MID[data.employees] ?? 125;
  const rev = REV_MID[data.revenue] ?? 15_000_000;
  const hourlyRate = rev / emp / 2000;
  const caps = data.capabilities.length > 0 ? data.capabilities : ["ai", "data", "ops"];
  const manHrs = data.manualHours || 8;

  let totalLow = 0;
  let totalHigh = 0;
  let hoursSaved = 0;
  const breakdown: CapabilityResult[] = [];

  if (caps.includes("ai")) {
    const saved = emp * manHrs * 52 * 0.65;
    hoursSaved += saved;
    const base = saved * hourlyRate + rev * 0.015;
    const low = Math.round(base * 0.85);
    const high = Math.round(base * 1.35);
    totalLow += low;
    totalHigh += high;
    breakdown.push({
      id: "ai",
      name: "AI Orchestration",
      low,
      high,
      metric: `${Math.round(saved).toLocaleString()} hrs/yr automated`,
    });
  }

  if (caps.includes("data")) {
    const saved = emp * 3.5 * 52 * 0.65;
    hoursSaved += saved;
    const base = saved * hourlyRate + rev * 0.018;
    const low = Math.round(base * 0.8);
    const high = Math.round(base * 1.4);
    totalLow += low;
    totalHigh += high;
    breakdown.push({
      id: "data",
      name: "Data Engineering",
      low,
      high,
      metric: `${Math.round(saved).toLocaleString()} reporting hrs/yr reclaimed`,
    });
  }

  if (caps.includes("ops")) {
    const base = rev * 0.3 * 0.2;
    const low = Math.round(base * 0.85);
    const high = Math.round(base * 1.5);
    totalLow += low;
    totalHigh += high;
    breakdown.push({
      id: "ops",
      name: "Operational Redesign",
      low,
      high,
      metric: "20 – 30% process efficiency gain",
    });
  }

  return { totalLow, totalHigh, breakdown, hoursSaved: Math.round(hoursSaved) };
}

// ─── Animated Number Counter ──────────────────────────────────────────────────

function Counter({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let rafId = 0;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * to));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [to, duration]);

  return <>{fmt(val)}</>;
}

// ─── Step: Company Profile ────────────────────────────────────────────────────

function StepCompany({
  form,
  setForm,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  return (
    <div>
      <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">01 / Company Profile</span>
      <h1
        className="text-3xl md:text-4xl text-white mt-3 mb-3"
        style={{ fontWeight: 300, letterSpacing: "0.05em" }}
      >
        Tell us about your organization.
      </h1>
      <p className="text-zinc-500 font-light text-sm mb-10 leading-relaxed">
        A few data points let us model real impact — not guesswork. Skip any field to use an estimate.
      </p>

      {/* Employees */}
      <div className="mb-8">
        <label className="block text-xs tracking-[0.15em] uppercase text-zinc-400 mb-3">
          Number of Employees
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {EMPLOYEE_LABELS.map((label, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setForm((f) => ({ ...f, employees: EMPLOYEE_VALUES[i] }))}
              className={`py-3 text-xs tracking-wider border transition-all duration-200 ${
                form.employees === EMPLOYEE_VALUES[i]
                  ? "border-zinc-400 text-white bg-zinc-800"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Revenue */}
      <div className="mb-8">
        <label className="block text-xs tracking-[0.15em] uppercase text-zinc-400 mb-3">
          Annual Revenue
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REVENUE_LABELS.map((label, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setForm((f) => ({ ...f, revenue: REVENUE_VALUES[i] }))}
              className={`py-3 text-xs tracking-wider border transition-all duration-200 ${
                form.revenue === REVENUE_VALUES[i]
                  ? "border-zinc-400 text-white bg-zinc-800"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Manual Hours Slider */}
      <div>
        <label className="block text-xs tracking-[0.15em] uppercase text-zinc-400 mb-4">
          Hours / Week Employees Spend on Manual or Repetitive Tasks
        </label>
        <div className="flex items-center gap-5">
          <span className="text-xs text-zinc-700 font-mono w-4">1</span>
          <div className="relative flex-1">
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={form.manualHours}
              onChange={(e) => setForm((f) => ({ ...f, manualHours: +e.target.value }))}
              className="w-full h-px bg-zinc-800 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-300 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-300 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
          <span className="text-xs text-zinc-700 font-mono w-4">20</span>
          <motion.span
            key={form.manualHours}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-zinc-300 font-light font-mono w-16 text-right"
          >
            {form.manualHours} hrs
          </motion.span>
        </div>
      </div>
    </div>
  );
}

// ─── Step: Capabilities ───────────────────────────────────────────────────────

function StepCapabilities({
  form,
  toggleCap,
}: {
  form: FormData;
  toggleCap: (id: string) => void;
}) {
  return (
    <div>
      <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">02 / Capabilities</span>
      <h2
        className="text-3xl md:text-4xl text-white mt-3 mb-3"
        style={{ fontWeight: 300, letterSpacing: "0.05em" }}
      >
        Where can we create the most impact?
      </h2>
      <p className="text-zinc-500 font-light text-sm mb-10 leading-relaxed">
        Select the capabilities relevant to your organization. Skip to include all three in your estimate.
      </p>

      <div className="space-y-3">
        {CAPABILITIES.map((cap, i) => {
          const selected = form.capabilities.includes(cap.id);
          return (
            <motion.button
              key={cap.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              onClick={() => toggleCap(cap.id)}
              className={`w-full text-left p-5 border transition-all duration-200 group ${
                selected
                  ? "border-zinc-400 bg-zinc-900"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2 border flex-shrink-0 transition-colors duration-200 ${
                    selected
                      ? "border-zinc-400 text-zinc-200"
                      : "border-zinc-800 text-zinc-600 group-hover:border-zinc-700 group-hover:text-zinc-400"
                  }`}
                >
                  <cap.Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-light text-zinc-200 tracking-wide">{cap.name}</span>
                    <motion.div
                      animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="w-4 h-4 bg-zinc-300 flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-2.5 h-2.5 text-zinc-900" />
                    </motion.div>
                  </div>
                  <span className="text-xs font-mono text-zinc-600 tracking-wider block mt-0.5">
                    {cap.subtitle}
                  </span>
                  <p className="text-xs text-zinc-500 font-light mt-2 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Results ────────────────────────────────────────────────────────────

function StepResults({ results }: { results: Results }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-mono">03 / Your Estimate</span>
        <p
          className="text-xl text-zinc-400 mt-3 mb-1"
          style={{ fontWeight: 300, letterSpacing: "0.04em" }}
        >
          Estimated annual value from Vantix engagement
        </p>
      </motion.div>

      {/* Main value number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="py-8 border-b border-zinc-800 mb-8"
      >
        <div
          className="text-5xl md:text-7xl text-white leading-none"
          style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          <Counter to={results.totalLow} duration={1200} />
          <span className="text-zinc-600 mx-3">–</span>
          <Counter to={results.totalHigh} duration={1500} />
        </div>
        <p className="text-zinc-600 text-xs tracking-[0.1em] uppercase mt-4">
          Conservative to optimistic annual range
        </p>
      </motion.div>

      {/* Capability breakdown */}
      <div className="space-y-2.5 mb-8">
        {results.breakdown.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
            className="flex items-center justify-between p-4 border border-zinc-800 bg-zinc-900/40"
          >
            <div>
              <span className="text-sm text-zinc-200 font-light block tracking-wide">{item.name}</span>
              <span className="text-xs font-mono text-zinc-600 mt-0.5 block">{item.metric}</span>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <span className="text-sm text-zinc-300 font-light block">
                {fmt(item.low)} – {fmt(item.high)}
              </span>
              <span className="text-xs text-zinc-700 font-mono">per year</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key metrics strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.65 }}
        className="border border-zinc-800 p-5 grid grid-cols-3 gap-4 mb-5"
      >
        <div className="text-center border-r border-zinc-800">
          <div className="text-2xl text-white font-light">
            {results.hoursSaved > 0 ? results.hoursSaved.toLocaleString() : "—"}
          </div>
          <div className="text-xs text-zinc-600 tracking-wider mt-1 leading-snug">Hrs Freed / Yr</div>
        </div>
        <div className="text-center border-r border-zinc-800">
          <div className="text-2xl text-white font-light">{WEEKS_TO_PRODUCTION}</div>
          <div className="text-xs text-zinc-600 tracking-wider mt-1 leading-snug">Wks to Production</div>
        </div>
        <div className="text-center">
          <div className="text-2xl text-white font-light">{DAYS_TO_ROI}</div>
          <div className="text-xs text-zinc-600 tracking-wider mt-1 leading-snug">Days to Positive ROI</div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="text-xs text-zinc-700 font-light leading-relaxed"
      >
        Estimates are modeled from industry benchmarks and your inputs. Actual results vary by engagement scope,
        existing infrastructure, and organizational readiness. Contact us for a tailored assessment.
      </motion.p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ x: dir * 50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -50, opacity: 0 }),
};

export default function ValueCalculatorPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>({
    employees: "",
    revenue: "",
    manualHours: 8,
    capabilities: [],
  });

  const results = step === 2 ? calculate(form) : null;

  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const toggleCap = (id: string) => {
    setForm((f) => ({
      ...f,
      capabilities: f.capabilities.includes(id)
        ? f.capabilities.filter((c) => c !== id)
        : [...f.capabilities, id],
    }));
  };

  const progressPct = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen pt-14 bg-[#09090b]">
      {/* Thin progress bar below navbar */}
      <div className="fixed top-14 left-0 right-0 z-40 h-px bg-zinc-800">
        <motion.div
          className="h-full bg-zinc-400"
          initial={{ width: "33.3%" }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28">
        {/* Step dots indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-14"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: i === step ? 1.5 : 1,
                  backgroundColor: i <= step ? "#d4d4d8" : "#27272a",
                }}
                transition={{ duration: 0.3 }}
                className="w-1.5 h-1.5 rounded-full"
              />
              {i < 2 && (
                <motion.div
                  className="h-px bg-zinc-800"
                  style={{ width: 40 }}
                  animate={{ backgroundColor: i < step ? "#52525b" : "#27272a" }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-xs tracking-[0.15em] uppercase text-zinc-600 font-mono">
            {step === 0 ? "Company" : step === 1 ? "Capabilities" : "Your Estimate"}
          </span>
        </motion.div>

        {/* Animated step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {step === 0 && <StepCompany form={form} setForm={setForm} />}
            {step === 1 && <StepCapabilities form={form} toggleCap={toggleCap} />}
            {step === 2 && results && <StepResults results={results} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons — steps 0 and 1 */}
        {step < 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800"
          >
            <button
              onClick={goBack}
              className={`flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors ${
                step === 0 ? "invisible pointer-events-none" : ""
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>

            <div className="flex items-center gap-5">
              <button
                onClick={goNext}
                className="text-xs tracking-[0.12em] uppercase text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Skip
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goNext}
                className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase bg-white text-zinc-900 px-6 py-2.5 hover:bg-zinc-200 transition-colors font-medium"
              >
                {step === 1 ? "Calculate" : "Continue"}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Navigation buttons — results step */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-between mt-10 pt-8 border-t border-zinc-800"
          >
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Recalculate
            </button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2 text-xs tracking-[0.12em] uppercase bg-white text-zinc-900 px-6 py-2.5 hover:bg-zinc-200 transition-colors font-medium"
              >
                Discuss Your Estimate
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
