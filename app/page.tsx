import type { ReactNode } from "react";
import Image from "next/image";
import { GalleryShowcase } from "@/components/gallery-showcase";
import { HeroParallaxScene } from "@/components/hero-parallax-scene";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";
import { SectionReveal } from "@/components/section-reveal";
import { siteContent } from "@/data/site-content";

const iconMap: Record<string, ReactNode> = {
  quiet: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 12c2.4-4.7 5.1-7 8-7s5.6 2.3 8 7c-2.4 4.7-5.1 7-8 7s-5.6-2.3-8-7Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  ),
  sauna: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18V8.5A2.5 2.5 0 0 1 8.5 6H16a2 2 0 0 1 2 2v10" />
      <path d="M4 18h16" />
      <path d="M9 10.5v4.5" />
      <path d="M12 10.5v4.5" />
      <path d="M15 10.5v4.5" />
      <path d="M8 5.5c0-1 .6-1.5 1.2-2" />
      <path d="M11 5.5c0-1 .6-1.5 1.2-2" />
      <path d="M14 5.5c0-1 .6-1.5 1.2-2" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 8.8a13.2 13.2 0 0 1 15 0" />
      <path d="M7.7 12.1a8 8 0 0 1 8.6 0" />
      <path d="M10.6 15.4a3.15 3.15 0 0 1 2.8 0" />
      <circle cx="12" cy="19.2" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  parking: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M7 19V5h5.5a4 4 0 0 1 0 8H7" />
      <path d="M7 13h5" />
    </svg>
  ),
  room: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 15h18" />
      <path d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20c4-2.7 6-6 6-10a6 6 0 0 0-12 0c0 4 2 7.3 6 10Z" />
      <path d="M12 20v-8" />
      <path d="M9 10c1.3 0 2.2-.7 3-2 1 1.2 1.8 2 3 2" />
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2" />
      <path d="M4 19a4 4 0 0 1 8 0" />
      <path d="M13 19a3.5 3.5 0 0 1 7 0" />
    </svg>
  ),
  pool: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5h9a3 3 0 0 1 0 6H9.5" />
      <path d="M6 5.5v13" />
      <path d="M4 17.2c1 .7 2 .8 3 .8s2-.1 3-.8c1 .7 2 .8 3 .8s2-.1 3-.8c1 .7 2 .8 3 .8" />
      <path d="M4 20c1 .7 2 .8 3 .8s2-.1 3-.8c1 .7 2 .8 3 .8s2-.1 3-.8c1 .7 2 .8 3 .8" />
    </svg>
  ),
  pets: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.2" cy="8.4" r="2.05" />
      <circle cx="12" cy="6.5" r="2.05" />
      <circle cx="16.8" cy="8.4" r="2.05" />
      <path d="M6.9 15.8c0-2.8 2.1-4.9 5.1-4.9s5.1 2.1 5.1 4.9c0 2.1-1.3 3.4-3.1 3.4-1.1 0-1.7-.5-2-1.1-.3.6-.9 1.1-2 1.1-1.8 0-3.1-1.3-3.1-3.4Z" />
    </svg>
  ),
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteContent.siteName,
    description: siteContent.meta.description,
    url: siteContent.siteUrl,
    telephone: siteContent.contacts.phone,
    email: siteContent.contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteContent.contacts.address,
      addressRegion: "Краснодарский край",
      addressLocality: "Новороссийск",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.699538,
      longitude: 37.720493,
    },
    priceRange: "₽₽",
    image: [
      `${siteContent.siteUrl}${siteContent.hero.image}`,
      ...siteContent.gallery.images.map((image) => `${siteContent.siteUrl}${image.src}`),
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Баня" },
      { "@type": "LocationFeatureSpecification", name: "Бассейн с подогревом" },
      { "@type": "LocationFeatureSpecification", name: "Беседка" },
      { "@type": "LocationFeatureSpecification", name: "Мангал" },
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi" },
      { "@type": "LocationFeatureSpecification", name: "Парковка" },
      { "@type": "LocationFeatureSpecification", name: "Можно с животными" },
    ],
    petsAllowed: true,
  };

  return (
    <main className="relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-background" />
      <SiteHeader navigation={siteContent.navigation} siteName={siteContent.siteName} contactHref="#contacts" />

      <section id="home" className="relative isolate min-h-screen overflow-hidden px-3 pb-12 pt-24 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8 lg:pt-32">
        <HeroParallaxScene
          estateImage={siteContent.hero.parallax.estateImage}
          estateImageAlt={siteContent.hero.parallax.estateImageAlt}
          oakFrameImage={siteContent.hero.parallax.oakFrameImage}
          estateSpeed={siteContent.hero.parallax.estateSpeed}
          oakFrameSpeed={siteContent.hero.parallax.oakFrameSpeed}
          hazeSpeed={siteContent.hero.parallax.hazeSpeed}
        />

        <div className="section-shell grid min-h-[calc(100vh-6rem)] items-center gap-6 md:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <SectionReveal className="relative z-10 mx-auto w-full max-w-3xl pt-6 sm:pt-10 sm:text-left lg:pt-0">
            <span className="section-eyebrow">Гостевой дом</span>
            <h1 className="balanced-text max-w-[19rem] font-serif text-[2.35rem] font-semibold leading-[0.98] text-[rgba(0, 0, 0)] drop-shadow-[0_10px_30px_rgba(134,129,25,1)] sm:max-w-3xl sm:text-6xl lg:text-7xl">
              {siteContent.hero.title}
            </h1>
            <p className="balanced-text mt-5 max-w-[19rem] text-[20px] leading-7 text-white [text-shadow:0_0_10px_rgba(0,0,0,0.8),0_2px_6px_rgba(0,0,0,0.5)] sm:mx-0 sm:mt-6 sm:max-w-2xl sm:text-lg sm:leading-8">
              {siteContent.hero.description}
            </p>
            <div className="mt-8 flex w-full max-w-[19rem] flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#contacts"
                className="inline-flex min-h-11 w-full max-w-[19rem] items-center justify-center rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-white shadow-[0_18px_36px_rgba(102,123,87,0.28)] transition hover:bg-accent/90 sm:min-h-0 sm:w-auto sm:max-w-none sm:px-6 sm:justify-center"
              >
                {siteContent.hero.primaryCta}
              </a>
              <a
                href="#rooms"
                className="liquid-glass inline-flex min-h-11 w-full max-w-[19rem] items-center justify-center rounded-full px-5 py-3 text-center text-sm font-medium text-stone transition hover:bg-white/50 sm:min-h-0 sm:w-auto sm:max-w-none sm:px-6 sm:justify-center"
              >
                {siteContent.hero.secondaryCta}
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08} className="relative w-full max-w-[19rem] sm:max-w-xl lg:ml-auto lg:max-w-[34rem]">
            <div className="liquid-glass organic-wash rounded-[24px] p-4 sm:rounded-[32px] sm:p-6 lg:mt-24">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-pine">Тишина и забота</p>
              <p className="mt-3 max-w-md text-sm leading-7 text-stone sm:text-base">
                Пространство для неспешного отдыха, утреннего света, тёплых текстур и мягкого ощущения уединения.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section id="about" className="section-space section-fade pt-10">
        <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <SectionReveal className="relative mx-auto w-full overflow-hidden rounded-[24px] px-0.5 py-0.5 sm:rounded-[38px] sm:px-4 sm:py-4">
            <div className="soft-panel linen-texture p-5 sm:p-10 lg:p-14">
              <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(239,244,231,0.66),rgba(239,244,231,0))] blur-2xl" />
              <div className="relative">
                <SectionHeading eyebrow={siteContent.about.eyebrow} title={siteContent.about.title} description={siteContent.about.description} />
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1} className="grid gap-8 self-center pt-0 sm:pt-3 lg:pt-0">
            {siteContent.about.highlights.map((item, index) => (
              <div key={item.title} className="relative border-l border-accent/18 pl-5 sm:pl-6">
                <div className="absolute -left-2 top-2 h-3.5 w-3.5 rounded-full bg-accent/70" />
                <h3 className="font-serif text-[1.65rem] text-stone sm:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-stone sm:text-base">{item.text}</p>
              </div>
            ))}
          </SectionReveal>
        </div>
      </section>

      <section id="advantages" className="section-space pt-8">
        <div className="section-shell relative">
          <div className="absolute inset-x-0 top-20 -z-10 h-[22rem] rounded-[48px] bg-[radial-gradient(circle_at_top,rgba(242,246,237,0.74),rgba(232,237,226,0))]" />
          <SectionHeading eyebrow={siteContent.advantages.eyebrow} title={siteContent.advantages.title} description={siteContent.advantages.description} centered />
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {siteContent.advantages.items.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.06} className="group relative border-t border-stone/10 pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/52 text-accent shadow-[0_10px_30px_rgba(74,92,60,0.09)] transition duration-300 group-hover:bg-white/72 group-hover:-translate-y-0.5 sm:h-11 sm:w-11">
                  {iconMap[item.icon]}
                </div>
                <h3 className="mt-4 font-serif text-[1.65rem] text-stone sm:mt-5 sm:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-stone sm:text-base">{item.text}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="rooms" className="section-space pt-10">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <SectionReveal className="max-w-xl">
              <SectionHeading eyebrow={siteContent.rooms.eyebrow} title={siteContent.rooms.title} description={siteContent.rooms.description} />
            </SectionReveal>
          </div>

          <div className="mt-12 grid gap-8">
            {siteContent.rooms.items.map((room, index) => (
              <SectionReveal
                key={room.title}
                delay={index * 0.08}
                className={`mx-auto grid w-full gap-4 overflow-hidden rounded-[24px] sm:gap-6 sm:rounded-[40px] ${index % 2 === 0 ? "lg:grid-cols-[1.12fr_0.88fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}
              >
                <div className={`relative overflow-hidden rounded-[26px] shadow-[0_24px_70px_rgba(69,86,58,0.12)] sm:rounded-[36px] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[16/12] sm:aspect-[16/11]">
                    <Image
                      src={room.image}
                      alt={room.imageAlt}
                      fill
                      className="object-cover transition duration-500 hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(49,61,41,0.04),rgba(60,76,49,0.16))]" />
                  </div>
                </div>

                <div className={`flex items-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="soft-panel w-full p-5 sm:p-8 lg:p-10">
                    <h3 className="font-serif text-[1.8rem] text-stone sm:text-4xl">{room.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-stone sm:mt-4 sm:text-base sm:leading-8">{room.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                      {room.amenities.map((amenity) => (
                        <li key={amenity} className="rounded-full border border-white/55 bg-white/45 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-stone backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.16em]">
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="section-space pt-10">
        <div className="section-shell">
          <SectionReveal className="mx-auto max-w-3xl text-center">
            <SectionHeading eyebrow={siteContent.gallery.eyebrow} title={siteContent.gallery.title} description={siteContent.gallery.description} centered />
          </SectionReveal>
          <SectionReveal delay={0.05} className="mt-12">
            <GalleryShowcase images={siteContent.gallery.images} />
          </SectionReveal>
        </div>
      </section>

      <section id="reviews" className="section-space pt-10">
        <div className="section-shell">
          <SectionHeading eyebrow={siteContent.reviews.eyebrow} title={siteContent.reviews.title} description={siteContent.reviews.description} centered />
          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-3">
            {siteContent.reviews.items.map((review, index) => (
              <SectionReveal key={review.name} delay={index * 0.07} className="relative border-t border-stone/10 pt-6">
                <div className="max-w-[34ch] sm:max-w-[36ch]">
                  <p className="mt-1 -mb-1 text-left font-serif text-4xl leading-none text-accent/80">&ldquo;</p>
                  <p className="mt-1 text-justify text-sm leading-8 text-stone sm:text-base">{review.text}</p>
                  <p className="mt-1 -mb-1 text-right font-serif text-4xl leading-none text-accent/80">&rdquo;</p>
                </div>
                <div className="mt-3 text-left pt-0">
                  <p className="font-medium text-stone">{review.name}</p>
                  {review.meta ? <p className="mt-1 text-sm text-stone">{review.meta}</p> : null}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="section-space pt-10">
        <div className="section-shell">
          <SectionReveal className="relative mx-auto w-full overflow-hidden rounded-[24px] p-1 sm:rounded-[42px]">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(241,246,234,0.46),rgba(241,246,234,0)_38%),linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0.04))] sm:rounded-[42px]" />
            <div className="liquid-glass organic-wash relative overflow-hidden rounded-[34px] p-6 sm:rounded-[40px] sm:p-10 lg:p-12">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                <div>
                  <SectionHeading eyebrow={siteContent.contacts.eyebrow} title={siteContent.contacts.title} description={siteContent.contacts.description} />
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-[22px] bg-white/28 p-4 backdrop-blur-sm sm:rounded-[24px] sm:p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Телефон</p>
                      <a href={`tel:${siteContent.contacts.phone}`} className="mt-3 block text-lg text-stone transition hover:text-accent">
                        {siteContent.contacts.phone}
                      </a>
                    </div>
                    <div className="rounded-[22px] bg-white/28 p-4 backdrop-blur-sm sm:rounded-[24px] sm:p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Email</p>
                      <a href={`mailto:${siteContent.contacts.email}`} className="mt-3 block text-lg text-stone transition hover:text-accent">
                        {siteContent.contacts.email}
                      </a>
                    </div>
                    <div className="rounded-[22px] bg-white/28 p-4 backdrop-blur-sm sm:col-span-2 sm:rounded-[24px] sm:p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Адрес</p>
                      <p className="mt-3 text-lg text-stone">{siteContent.contacts.address}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(71,88,60,0.96),rgba(54,67,46,0.98))] px-5 py-6 text-white shadow-[0_28px_70px_rgba(45,55,39,0.24)] sm:rounded-[30px] sm:px-8 sm:py-9">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Мессенджеры и соцсети</p>
                    <div className="mt-6 grid gap-3">
                      {siteContent.contacts.socials.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/90 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <p className="mt-6 text-sm leading-7 text-white/70">{siteContent.contacts.note}</p>
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-white/35 bg-white/24 shadow-soft sm:rounded-[30px]">
                      <div className="border-b border-white/30 px-4 py-3 sm:px-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Яндекс Карты</p>
                    </div>
                    <div className="relative h-[260px] sm:h-[300px]">
                      <iframe
                        src={siteContent.contacts.yandexMapEmbedUrl}
                        title="Карта гостевого дома на Яндекс Картах"
                        className="absolute inset-0 h-full w-full border-0"
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <footer className="pb-10 pt-8">
        <div className="section-shell flex flex-col gap-4 text-sm text-stone md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-2xl text-stone">{siteContent.siteName}</p>
            <p className="mt-1">{siteContent.footer.tagline}</p>
          </div>
          <div className="text-left break-words md:text-right">
            <p>{siteContent.footer.copyright}</p>
            <p className="mt-1">{siteContent.contacts.phone} · {siteContent.contacts.email}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
