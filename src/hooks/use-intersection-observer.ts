
import { useState, useEffect, useRef, useCallback } from 'react';

type UseIntersectionObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
};

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
    const { threshold = 0.3, root = null, rootMargin = '-50px 0px -100px 0px', triggerOnce = true } = options;
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef<HTMLElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
        const isVisible = entry.isIntersecting;
        
        if (isVisible) {
            setIntersecting(true);
            if (triggerOnce && observerRef.current && ref.current) {
                observerRef.current.unobserve(ref.current);
                observerRef.current.disconnect();
            }
        } else if (!triggerOnce) {
            setIntersecting(false);
        }
    }, [triggerOnce]);

    useEffect(() => {
        // Fallback for browsers that don't support IntersectionObserver
        if (!window.IntersectionObserver) {
            setIntersecting(true);
            return;
        }

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setIntersecting(true);
            return;
        }

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold,
            root,
            rootMargin,
        });

        const currentRef = ref.current;
        if (currentRef && observerRef.current) {
            observerRef.current.observe(currentRef);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [threshold, root, rootMargin, handleIntersection]);

    return { ref, isIntersecting };
}
