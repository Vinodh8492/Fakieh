import { generateGradient } from "./utils/generateGradient";

const themes = {
     indigo: {
    name: "Indigo",
    primary: "#6366f1",
    gradient: generateGradient("#6366f1"),
  },
  grey: {
    name: "Grey",
    primary: "#6b7280",
    gradient: generateGradient("#6b7280"),
  },
  darkBlue: {
    name: "Dark Blue",
    primary: "#0f172a",
    gradient: generateGradient("#0f172a"),
  },
  green: {
    name: "Green",
    primary: "#22c55e",
    gradient: generateGradient("#22c55e"),
  },
  electricBlue: {
    name: "Electric Blue",
    primary: "#3b82f6",
    gradient: generateGradient("#3b82f6"),
  },
  slateBlue: {
    name: "Slate Blue",
    primary: "#64748b",
    gradient: generateGradient("#64748b"),
  },
  steelBlue: {
    name: "Steel Blue",
    primary: "#60a5fa",
    gradient: generateGradient("#60a5fa"),
  },
  darkMint: {
    name: "Dark Mint",
    primary: "#99f6e4",
    gradient: generateGradient("#99f6e4"),
  },
  mint: {
    name: "Mint",
    primary: "#a7f3d0",
    gradient: generateGradient("#a7f3d0"),
  },
  midnightBlue: {
    name: "Midnight Blue",
    primary: "#1e1b4b",
    gradient: generateGradient("#1e1b4b"),
  },
  cobaltBlue: {
    name: "Cobalt Blue",
    primary: "#2563eb",
    gradient: generateGradient("#2563eb"),
  },
  safetyGreen: {
    name: "Safety Green",
    primary: "#4ade80",
    gradient: generateGradient("#4ade80"),
  },
  signalAmber: {
    name: "Signal Amber",
    primary: "#f59e0b",
    gradient: generateGradient("#f59e0b"),
  },
  hazardRed: {
    name: "Hazard Red",
    primary: "#ef4444",
    gradient: generateGradient("#ef4444"),
  },
  systemCyan: {
    name: "System Cyan",
    primary: "#0e7490",
    gradient: generateGradient("#0e7490"),
  },
};

export default themes;
