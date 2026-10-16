'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export default function LocalClock() {
  const [label, setLabel] = useState('--:--:--');

  useEffect(() => {
    let interval: number | undefined;
    // Deferred so the first paint matches the server render (no hydration
    // mismatch), then ticks every second.
    const timeout = window.setTimeout(() => {
      setLabel(formatter.format(new Date()));
      interval = window.setInterval(
        () => setLabel(formatter.format(new Date())),
        1000
      );
    }, 0);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  return (
    <span className="font-mono">
      {label} <span className="text-[#5b6167]">IST</span>
    </span>
  );
}
