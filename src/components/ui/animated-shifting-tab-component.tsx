"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronDown,
  Code2,
  Download,
  FileText,
  Github,
  Image as ImageIcon,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export const ShiftingDropDown = () => {
  return (
    <div className="flex w-full justify-start text-foreground md:justify-center">
      <Tabs />
    </div>
  )
}

const Tabs = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [dir, setDir] = useState<string | null>(null)

  const handleSetSelected = (val: number | null) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l")
    } else if (val === null) {
      setDir(null)
    }

    setSelected(val)
  }

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2"
    >
      {TABS.map((t) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.title}
          </Tab>
        )
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  )
}

const Tab = ({
  children,
  tab,
  handleSetSelected,
  selected,
}: {
  children: React.ReactNode
  tab: number
  handleSetSelected: (val: number | null) => void
  selected: number | null
}) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <span>{children}</span>
      <ChevronDown
        size={14}
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  )
}

const Content = ({
  selected,
  dir,
}: {
  selected: number
  dir: string | null
}) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-80 rounded-lg border p-4"
      style={{
        borderColor: "var(--border-md)",
        background:
          "linear-gradient(to bottom, rgba(10,16,14,0.98), rgba(12,19,17,0.98))",
        boxShadow: "var(--shadow-lg)",
        backdropFilter: "blur(16px)",
      }}
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        )
      })}
    </motion.div>
  )
}

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
)

const Nub = ({ selected }: { selected: number }) => {
  const [left, setLeft] = useState(0)

  useEffect(() => {
    moveNub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`)
      const overlayContent = document.getElementById("overlay-content")

      if (!hoveredTab || !overlayContent) return

      const tabRect = hoveredTab.getBoundingClientRect()
      const { left: contentLeft } = overlayContent.getBoundingClientRect()

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft

      setLeft(tabCenter)
    }
  }

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
        borderColor: "var(--border-md)",
        background: "rgba(10,16,14,0.98)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border"
    />
  )
}

/* ── Portfolio dropdown panels ── */

const ExplorePanel = () => {
  const links = [
    { icon: Award, label: "Certifications", sub: "NVIDIA · IBM · more", href: "/certifications" },
    { icon: ImageIcon, label: "Gallery", sub: "Life in frames", href: "/gallery" },
    { icon: Sparkles, label: "Stuff", sub: "Blogs & experiments", href: "/stuff" },
    { icon: BookOpen, label: "GitHub Activity", sub: "Live contribution stats", href: "/github-activities" },
  ]
  return (
    <div className="flex flex-col gap-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-white/5"
        >
          <l.icon size={16} style={{ color: "#34D399" }} />
          <span>
            <span className="block text-sm font-medium text-foreground">{l.label}</span>
            <span className="block text-xs text-muted-foreground">{l.sub}</span>
          </span>
        </Link>
      ))}
    </div>
  )
}

const ResumePanel = () => {
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
        GSoC 2026 @ PEcAn Project · Backend Developer (Java · Spring Boot ·
        Python) · 15+ merged open-source PRs.
      </p>
      <div className="flex flex-col gap-1">
        <Link
          href="/resume"
          className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-white/5"
        >
          <FileText size={16} style={{ color: "#34D399" }} />
          <span className="text-sm font-medium text-foreground">View Resume Page</span>
        </Link>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-white/5"
        >
          <Download size={16} style={{ color: "#34D399" }} />
          <span className="text-sm font-medium text-foreground">Download PDF</span>
        </a>
      </div>
    </div>
  )
}

const ConnectPanel = () => {
  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/omkarrr2533" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/om-kapale-b861a228a" },
    { icon: Code2, label: "LeetCode", href: "https://leetcode.com/u/omii_/" },
  ]
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 divide-x" style={{ borderColor: "var(--border)" }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full flex-col items-center justify-center py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <s.icon size={18} className="mb-2" style={{ color: "#34D399" }} />
            <span className="text-xs">{s.label}</span>
          </a>
        ))}
      </div>
      <Link
        href="/contact"
        className="ml-auto mt-4 flex w-fit items-center gap-1 text-sm"
        style={{ color: "#34D399" }}
      >
        <Mail size={13} />
        <span>Send a message</span>
        <ArrowRight size={13} />
      </Link>
    </div>
  )
}

const TABS = [
  {
    title: "Explore",
    Component: ExplorePanel,
  },
  {
    title: "Resume",
    Component: ResumePanel,
  },
  {
    title: "Connect",
    Component: ConnectPanel,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }))
