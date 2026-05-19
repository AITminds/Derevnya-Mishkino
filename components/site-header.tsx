"use client";

import { useEffect, useState } from "react";

type NavigationItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navigation: readonly NavigationItem[];
  siteName: string;
  contactHref: string;
};

export function SiteHeader({ navigation, siteName, contactHref }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navigation]);

  const linkClass = (href: string) =>
    activeSection === href
      ? "text-stone"
      : "text-stone transition hover:text-stone";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 py-3 sm:px-6 sm:py-4 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="liquid-glass organic-wash flex min-w-0 items-center justify-between rounded-full px-3 py-3 sm:px-6">
          <a
            href="#home"
            className="relative z-10 max-w-[8.5rem] text-pretty font-brand text-[1.08rem] leading-[0.98] tracking-[0.02em] sm:max-w-none sm:text-[1.82rem]"
            style={{ color: "#000000" }}
          >
            {siteName}
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className={`text-base font-medium ${linkClass(item.href)}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-2 flex shrink-0 items-center gap-2 sm:ml-3 sm:gap-3">
            <a
              href={contactHref}
              className="absolute left-1/2 -translate-x-1/2 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(102,123,87,0.28)] transition hover:bg-accent/90 md:static md:translate-x-0 md:px-6 md:py-3 md:text-base"
            >
              Контакты
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/45 text-stone backdrop-blur-sm lg:hidden"
              aria-label="Открыть или закрыть меню навигации"
              aria-expanded={menuOpen}
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 top-0.5 h-[1.5px] w-5 bg-current transition ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-[13.5px] h-[1.5px] w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="liquid-glass organic-wash mt-3 w-full max-w-full overflow-hidden rounded-[24px] p-2.5 sm:rounded-[28px] sm:p-4 lg:hidden">
            <nav className="grid gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full whitespace-normal break-words rounded-[18px] px-3 py-3 text-left text-sm font-medium ${activeSection === item.href ? "bg-sand text-stone" : "text-stone hover:bg-sand/70 hover:text-stone"}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
