import Link from "next/link";

type ErrorPageProps = {
  code: string;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export function ErrorPage({
  code,
  title,
  description,
  buttonLabel = "Вернуться на главную",
  buttonHref = "/",
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linen px-4">
      <div className="relative mx-auto max-w-lg text-center">
        <div
          className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(102,123,87,1), transparent)" }}
        />

        <p className="font-brand font-serif text-[9rem] leading-none tracking-[0.04em] text-accent/30 sm:text-[11rem]">
          {code}
        </p>

        <div className="-mt-4">
          <h1 className="font-serif text-2xl font-medium text-stone sm:text-3xl">
            {title}
          </h1>
          <p className="balanced-text mx-auto mt-4 max-w-sm text-sm leading-7 text-stone/70 sm:text-base">
            {description}
          </p>
        </div>

        <Link
          href={buttonHref}
          className="mx-auto mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_18px_36px_rgba(102,123,87,0.24)] transition hover:bg-accent/90"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
