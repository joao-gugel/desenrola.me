"use client";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { usePathname } from "next/navigation";

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

export function HeaderLink({ children, href }: HeaderLinkProps) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-zinc-500 hover:text-zinc-700 dark:text-zinc-200 dark:hover:text-zinc-50",
        isActive && "text-zinc-700 dark:text-zinc-50"
      )}
    >
      {children}
    </Link>
  );
}
