import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //孩子端主色
        child: {
          primary: "#FF6B35",
          primaryLight: "#FF8A50",
          secondary: "#4ECDC4",
          accent: "#FFD93D",
        },
        // 家长端主色
        parent: {
          primary: "#5B7FFF",
          primaryLight: "#7B9FFF",
          secondary: "#34D399",
        },
        // 功能色
        success: "#4ECDC4",
        warning: "#FFD93D",
        error: "#FF6B6B",
        info: "#60A5FA",
        // 中性色
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: "#E5E7EB",
        background: "#F9FAFB",
      },
      fontFamily: {
        sans: [
          "Smiley Sans Oblique",
          "PingFang SC",
          "Microsoft YaHei",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.4" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["24px", { lineHeight: "1.3" }],
        "2xl": ["32px", { lineHeight: "1.2" }],
        "5xl": ["56px", { lineHeight: "1.1" }],
      },
      spacing: {
        "nav": "56px",
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "12px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(255, 107, 53, 0.15)",
        "card-parent": "0 2px 8px rgba(0, 0, 0, 0.08)",
        nav: "0 -4px 16px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "pop-in": "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "toast-pop": "toastPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "spin-slow": "rotate 20s linear infinite",
      },
      keyframes: {
        popIn: {
          "0%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: "0" },
          "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
        },
        toastPop: {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "0" },
          "60%": { transform: "translate(-50%, -50%) scale(1.1)" },
          "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;