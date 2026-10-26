"use client";

import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PrimaryButton({
  children,
  href,
  target,
  onClick,
  className = "",
  size = "md",
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-3 text-[0.8125rem] uppercase tracking-[0.08em]",
    md: "px-6 py-3.5 text-sm",
    lg: "px-6 py-4 text-sm sm:px-8 sm:text-base",
  }[size];

  const classes =
    "primary-button inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-full border font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 " +
    "select-none text-center " +
    sizeClasses +
    " " +
    className;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
