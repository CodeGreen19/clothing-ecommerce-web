import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(break_point?: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );
  const BREAK_POINT = break_point ? break_point : MOBILE_BREAKPOINT;

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAK_POINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAK_POINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < BREAK_POINT);
    return () => mql.removeEventListener("change", onChange);
  }, [BREAK_POINT]);

  return !!isMobile;
}
