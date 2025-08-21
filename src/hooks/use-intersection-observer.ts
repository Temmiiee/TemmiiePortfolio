
import { useState, useEffect, useRef } from 'react';

type UseIntersectionObserverOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
};

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
    const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = true } = options;
    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
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
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, root, rootMargin, triggerOnce]);

    return { ref, isIntersecting };
}
