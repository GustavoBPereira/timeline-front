import { useEffect, useRef } from 'react';
import { useDragLayer } from 'react-dnd';

const SCROLL_ZONE_SIZE = 100; // pixels from edge to trigger scroll
const SCROLL_SPEED_BASE = 5; // base scroll speed
const MAX_SCROLL_SPEED = 20; // max scroll speed

export function useAutoScroll() {
    const { isDragging, currentOffset } = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getClientOffset(),
    }));

    const scrollFrameId = useRef<number | null>(null);

    useEffect(() => {
        if (!isDragging || !currentOffset) {
            if (scrollFrameId.current) {
                cancelAnimationFrame(scrollFrameId.current);
                scrollFrameId.current = null;
            }
            return;
        }

        const scrollLoop = () => {
            const { y } = currentOffset;
            const windowHeight = window.innerHeight;

            let scrollAmount = 0;

            // Scroll Up
            if (y < SCROLL_ZONE_SIZE) {
                const intensity = (SCROLL_ZONE_SIZE - y) / SCROLL_ZONE_SIZE;
                scrollAmount = -(SCROLL_SPEED_BASE + intensity * (MAX_SCROLL_SPEED - SCROLL_SPEED_BASE));
            }
            // Scroll Down
            else if (y > windowHeight - SCROLL_ZONE_SIZE) {
                const intensity = (y - (windowHeight - SCROLL_ZONE_SIZE)) / SCROLL_ZONE_SIZE;
                scrollAmount = SCROLL_SPEED_BASE + intensity * (MAX_SCROLL_SPEED - SCROLL_SPEED_BASE);
            }

            if (scrollAmount !== 0) {
                window.scrollBy(0, scrollAmount);
            }

            scrollFrameId.current = requestAnimationFrame(scrollLoop);
        };

        scrollFrameId.current = requestAnimationFrame(scrollLoop);

        return () => {
            if (scrollFrameId.current) {
                cancelAnimationFrame(scrollFrameId.current);
                scrollFrameId.current = null;
            }
        };
    }, [isDragging, currentOffset?.y]); // Depend on y coordinate specifically to trigger updates
}
