import { forwardRef, useMemo, useRef, useEffect } from "react";
import type { RefObject, HTMLAttributes } from "react";
import { motion } from "framer-motion";
import "./styles/VariableProximity.css";

type Callback = () => void;

function useAnimationFrame(callback: Callback) {
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      callback();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
}

function useMousePositionRef(containerRef: RefObject<HTMLElement>) {
  const positionRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };
    const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);
  return positionRef;
}

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  children: string; // texto completo
  excludeWords?: string[]; // palabras a excluir del efecto
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: RefObject<HTMLElement>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    children,
    excludeWords = [],
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = "linear",
    className = "",
    style,
    ...restProps
  } = props;

  const text = children;
  const words = text.split(" ");

  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null as number | null, y: null as number | null });

  const parsedSettings = useMemo(() => {
    const parse = (str: string) =>
      new Map(
        str.split(",").map(s => {
          const [axis, value] = s.trim().split(" ");
          return [axis.replace(/['"]/g, ""), parseFloat(value)];
        })
      );
    const from = parse(fromFontVariationSettings);
    const to = parse(toFontVariationSettings);
    return Array.from(from.entries()).map(([axis, fromVal]) => ({
      axis,
      fromVal,
      toVal: to.get(axis) ?? fromVal,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculate = (distance: number) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    if (falloff === "exponential") return norm ** 2;
    if (falloff === "gaussian") return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
    return norm;
  };

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    const { x, y } = mousePositionRef.current;
    if (x === lastPositionRef.current.x && y === lastPositionRef.current.y) return;
    lastPositionRef.current = { x, y };

  });

  function AnimatedWord({ word }: { word: string }) {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedRef = useRef<string[]>([]);

    useAnimationFrame(() => {
      if (!containerRef.current) return;
      const { x, y } = mousePositionRef.current;
      const rectC = containerRef.current.getBoundingClientRect();
      letterRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - rectC.left;
        const cy = rect.top + rect.height / 2 - rectC.top;
        const d = Math.hypot(x - cx, y - cy);
        if (d >= radius) {
          el.style.fontVariationSettings = fromFontVariationSettings;
        } else {
          const val = calculate(d);
          const fs = parsedSettings.map(({ axis, fromVal, toVal }) => {
            const iv = fromVal + (toVal - fromVal) * val;
            return `'${axis}' ${iv}`;
          }).join(",");
          interpolatedRef.current[i] = fs;
          el.style.fontVariationSettings = fs;
        }
      });
    });

    return (
      <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            ref={el => { letterRefs.current[i] = el; }}
            style={{ display: "inline-block" }}
            aria-hidden="true"
          >
            {ch}
          </motion.span>
        ))}
        &nbsp;
      </span>
    );
  }

  return (
    <span ref={ref} className={`${className} variable-proximity`} style={style} {...restProps}>
      {words.map((w, i) => {
        const clean = w.replace(/[.,;!?]/, "");
        if (excludeWords.includes(clean)) {
          return <span key={i} style={{ whiteSpace: "nowrap" }}>{w}&nbsp;</span>;
        }
        return <AnimatedWord key={i} word={w} />;
      })}
      <span className="sr-only">{text}</span>
    </span>
  );
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
