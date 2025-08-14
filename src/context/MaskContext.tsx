"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";

interface MaskPosition {
  x: number;
  y: number;
  scrollY: number;
}

interface MaskContextType {
  position: MaskPosition;
  smoothPosition: MaskPosition;
  maskSize: number;
  smoothMaskSize: number;
  hasMouseMoved: React.MutableRefObject<boolean>;
  isMobile: boolean;
  setMaskSize: (size: number) => void;
  setPosition: (position: MaskPosition) => void;
  getRelativePosition: (
    element: HTMLElement,
    x: number,
    y: number
  ) => MaskPosition;
}

const MaskContext = createContext<MaskContextType | undefined>(undefined);

const mobileUserAgents = [
  "Android",
  "webOS",
  "iPhone",
  "iPad",
  "iPod",
  "BlackBerry",
  "IEMobile",
  "Opera Mini",
];

function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return new RegExp(mobileUserAgents.join("|"), "i").test(navigator.userAgent);
}

export const MaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [maskSize, setMaskSize] = useState(0);
  const [smoothMaskSize, setSmoothMaskSize] = useState(0);
  const [position, setPosition] = useState<MaskPosition>({
    x: 0,
    y: 0,
    scrollY: 0,
  });
  const [smoothPosition, setSmoothPosition] = useState<MaskPosition>({
    x: 0,
    y: 0,
    scrollY: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const hasMouseMoved = useRef(false);
  const animationRef = useRef<number | null>(null);
  const mouseMoveTimeout = useRef<NodeJS.Timeout | null>(null);

  const lerp = useCallback((start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
  }, []);

  const lerpPosition = useCallback(
    (start: MaskPosition, end: MaskPosition, t: number): MaskPosition => {
      return {
        x: lerp(start.x, end.x, t),
        y: lerp(start.y, end.y, t),
        scrollY: end.scrollY, // Use the latest scrollY directly
      };
    },
    [lerp]
  );

  const getRelativePosition = useCallback(
    (element: HTMLElement, x: number, y: number): MaskPosition => {
      const rect = element.getBoundingClientRect();
      return {
        x: x - rect.left,
        y: y - rect.top,
        scrollY: window.scrollY,
      };
    },
    []
  );

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (isMobile) {
      setMaskSize(10000);
      setSmoothMaskSize(10000);
    }
  }, [isMobile]);

  useEffect(() => {
    setSmoothPosition((prev) => ({
      x: prev.x,
      y: prev.y,
      scrollY: position.scrollY,
    }));
  }, [position.scrollY]);

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      const sizeLerpFactor = 0.15;
      const positionLerpFactor = 0.2;

      const targetSize = hasMouseMoved.current ? maskSize : 0;
      const newSmoothSize = lerp(smoothMaskSize, targetSize, sizeLerpFactor);

      const newSmoothPosition = lerpPosition(
        smoothPosition,
        position,
        positionLerpFactor
      );

      // Only update state if values changed significantly
      if (Math.abs(newSmoothSize - smoothMaskSize) > 0.1) {
        setSmoothMaskSize(newSmoothSize);
      }

      if (
        Math.abs(newSmoothPosition.x - smoothPosition.x) > 0.1 ||
        Math.abs(newSmoothPosition.y - smoothPosition.y) > 0.1
      ) {
        setSmoothPosition((prev) => ({
          ...newSmoothPosition,
          scrollY: prev.scrollY,
        }));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    position,
    smoothPosition,
    maskSize,
    isMobile,
    smoothMaskSize,
    lerp,
    lerpPosition,
  ]);

  // Mouse and scroll event handlers
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }

      mouseMoveTimeout.current = setTimeout(() => {
        if (!hasMouseMoved.current) {
          hasMouseMoved.current = true;
          setMaskSize(20);
        }

        setPosition((prev) => ({
          x: e.clientX,
          y: e.clientY,
          scrollY: prev.scrollY, // Keep current scrollY
        }));
      });
    };

    const handleScroll = () => {
      setPosition((prev) => ({
        ...prev,
        scrollY: window.scrollY,
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }
    };
  }, [isMobile]);

  const contextValue = useMemo(
    () => ({
      position,
      smoothPosition,
      maskSize,
      smoothMaskSize,
      hasMouseMoved,
      isMobile,
      setMaskSize,
      setPosition,
      getRelativePosition,
    }),
    [
      position,
      smoothPosition,
      maskSize,
      smoothMaskSize,
      isMobile,
      getRelativePosition,
    ]
  );

  return (
    <MaskContext.Provider value={contextValue}>{children}</MaskContext.Provider>
  );
};

export const useMask = (): MaskContextType => {
  const context = useContext(MaskContext);
  if (context === undefined) {
    throw new Error("useMask must be used within a MaskProvider");
  }
  return context;
};
