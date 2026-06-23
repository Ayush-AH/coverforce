type SolutionHeroLabelProps = {
  children: string;
};

export default function SolutionHeroLabel({ children }: SolutionHeroLabelProps) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#413CC0] md:text-xs">
      <span className="size-2 shrink-0 rounded-full bg-[#413CC0]" aria-hidden />
      {children}
    </p>
  );
}
