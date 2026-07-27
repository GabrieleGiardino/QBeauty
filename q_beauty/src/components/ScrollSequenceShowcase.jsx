import { useEffect, useRef, useState } from "react";
import "./ScrollSequenceShowcase.css";

const explosionSteps = [
  { src: "/scroll-sequence/explosion/step-01.png" },
  { src: "/scroll-sequence/explosion/step-02.png" },
  { src: "/scroll-sequence/explosion/step-03.png" },
  { src: "/scroll-sequence/explosion/step-04.png" },
  { src: "/scroll-sequence/explosion/step-05.png" },
];

const LAST_STEP_INDEX = explosionSteps.length - 1;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollSequenceShowcase() {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener?.("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    explosionSteps.forEach((step) => {
      const image = new Image();
      image.decoding = "async";
      image.src = step.src;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const forcedProgressParam = searchParams.get("sequenceProgress");
    const forcedProgressValue =
      forcedProgressParam === null
        ? null
        : clamp(Number(forcedProgressParam), 0, 1);

    const updateProgress = (nextProgress) => {
      const boundedProgress = clamp(nextProgress, 0, 1);
      section.style.setProperty("--sequence-progress", boundedProgress.toFixed(4));
      setProgress((previousProgress) =>
        Math.abs(previousProgress - boundedProgress) < 0.001
          ? previousProgress
          : boundedProgress,
      );
    };

    const updateFromScroll = () => {
      const viewportHeight = window.innerHeight;
      const sectionRect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const nextProgress = clamp(-sectionRect.top / scrollableDistance, 0, 1);

      updateProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    if (Number.isFinite(forcedProgressValue)) {
      updateProgress(forcedProgressValue);
    } else if (reducedMotion) {
      updateProgress(0);
    } else {
      updateFromScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const progressPosition = progress * LAST_STEP_INDEX;
  const currentIndex = clamp(Math.floor(progressPosition), 0, LAST_STEP_INDEX);
  const nextIndex = clamp(currentIndex + 1, 0, LAST_STEP_INDEX);
  const transitionProgress =
    reducedMotion || currentIndex === LAST_STEP_INDEX
      ? 0
      : progressPosition - currentIndex;
  const currentStep = explosionSteps[currentIndex];
  const nextStep = explosionSteps[nextIndex];
  const easedTransition = transitionProgress ** 0.9;
  const currentLayerStyle = reducedMotion
    ? {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      }
    : {
        opacity: currentIndex === LAST_STEP_INDEX ? 1 : 1 - easedTransition * 0.72,
        transform: `translate3d(0, ${easedTransition * -4.6}vh, 0) scale(${
          1 - easedTransition * 0.045
        })`,
      };
  const nextLayerStyle = reducedMotion
    ? {
        opacity: 0,
        transform: "translate3d(0, 0, 0) scale(1)",
      }
    : {
        opacity: currentIndex === LAST_STEP_INDEX ? 0 : easedTransition,
        transform: `translate3d(0, ${(1 - easedTransition) * 8.2}vh, 0) scale(${
          1.08 - easedTransition * 0.08
        })`,
      };

  return (
    <section
      ref={sectionRef}
      id="sequenza"
      className="scroll-sequence-section"
      aria-label="Sequenza esplosiva prodotti Q.BEAUTY"
    >
      <div className="scroll-sequence-sticky">
        <div className="scroll-sequence-media" aria-hidden="true">
          <img
            key={currentStep.src}
            src={currentStep.src}
            alt=""
            className="scroll-sequence-layer is-current"
            style={currentLayerStyle}
          />
          {currentIndex !== LAST_STEP_INDEX ? (
            <img
              key={nextStep.src}
              src={nextStep.src}
              alt=""
              className="scroll-sequence-layer is-next"
              style={nextLayerStyle}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
