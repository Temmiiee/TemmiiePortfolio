
import { useState, useEffect, useRef } from 'react';

type UseIntersectionObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
};

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
    const { threshold = 0.3, root = null, rootMargin = '-100px 0px -100px 0px', triggerOnce = true } = options;
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Fallback for browsers that don't support IntersectionObserver
        if (!window.IntersectionObserver) {
            setIntersecting(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    if (triggerOnce && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else {
                    if (!triggerOnce) {
                        setIntersecting(false);
                    }
                }
            },
            {
                threshold,
                root,
                rootMargin,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            // Check if element is already visible
            const rect = currentRef.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                setIntersecting(true);
                if (!triggerOnce) {
                    observer.observe(currentRef);
                }
            } else {
                observer.observe(currentRef);
            }
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, root, rootMargin, triggerOnce]);

    return { ref, isIntersecting };
}
