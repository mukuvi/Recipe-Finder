'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-main/80 backdrop-blur">
      <div className="h-1 w-full bg-primary" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <span className="font-display text-xl tracking-tight text-text-main sm:text-2xl">
            RecipeFinder
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'rounded-full bg-primary px-3 py-1.5 text-sm font-semibold text-bg-main transition-colors'
                    : 'rounded-full px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text-main'
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-bg-secondary px-3 text-text-main shadow-sm transition-colors hover:bg-bg-main md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-sm font-medium">Menu</span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-border bg-bg-main md:hidden"
          >
            <div className="mx-auto w-full max-w-6xl px-4 py-3">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={
                        active
                          ? 'rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-bg-main transition-colors'
                          : 'rounded-xl px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-bg-secondary hover:text-text-main'
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
