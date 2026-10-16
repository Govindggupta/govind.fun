interface Props {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: string;
}

/**
 * CSS-only infinite marquee. The list is rendered twice side by side (second
 * copy aria-hidden) so translating -50% loops seamlessly.
 */
export default function Marquee({ items, className, reverse, duration = '36s' }: Props) {
  const strip = (hidden: boolean) => (
    <ul
      key={hidden ? 'copy' : 'original'}
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-[#39d353]" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div
        className={`marquee-track flex w-max ${reverse ? 'marquee-reverse' : ''}`}
        style={{ ['--marquee-duration' as string]: duration }}
      >
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  );
}
