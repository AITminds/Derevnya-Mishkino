import type { Metadata } from "next";
import { ErrorPage } from "@/components/error-page";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `403 — Доступ запрещён | ${siteContent.siteName}`,
  robots: { index: false, follow: false },
};

export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      title="Доступ запрещён"
      description="У&nbsp;вас нет прав для просмотра этой страницы. Если вы&nbsp;считаете, что это ошибка&nbsp;&mdash; свяжитесь с&nbsp;нами."
      buttonLabel="На главную"
    />
  );
}
