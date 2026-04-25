type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = false }: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="balanced-text font-serif text-[2rem] leading-tight text-stone sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="balanced-text mt-4 text-[0.98rem] leading-7 text-stone sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
    </div>
  );
}
