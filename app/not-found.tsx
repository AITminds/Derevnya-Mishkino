import type { Metadata } from "next";
import { ErrorPage } from "@/components/error-page";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `404 — Страница не найдена | ${siteContent.siteName}`,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Страница не найдена"
      description="Запрошенной страницы не&nbsp;существует. Возможно, вы&nbsp;перешли по&nbsp;неправильной ссылке или страница была перемещена."
    />
  );
}
