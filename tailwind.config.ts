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
        // 语义化颜色（通过 CSS 变量动态切换）
        primary: "var(--color-primary)",
        primaryLight: "var(--color-primary-light)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        // 功能色
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        // 中性色
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        border: "var(--border-color)",
        background: "var(--bg-page)",
        card: "var(--bg-card)",
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
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
      },
      spacing: {
        "nav": "var(--nav-height)",
        "topnav": "56px",
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "12px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        nav: "0 -4px 16px rgba(0, 0, 0, 0.08)",
        topnav: "0 2px 8px rgba(91, 127, 255, 0.04)",
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