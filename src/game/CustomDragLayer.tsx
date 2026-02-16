import React from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from './TimelineGame';
import { EventCard } from './EventCard';

const layerStyles: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(initialOffset: { x: number; y: number } | null, currentOffset: { x: number; y: number } | null) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    let { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px) rotate(5deg)`;
    return {
        transform,
        WebkitTransform: transform,
    };
}

export function CustomDragLayer({ lang }: { lang: string }) {
    const { isDragging, item, initialOffset, currentOffset, itemType } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging) {
        return null;
    }

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset)}>
                {itemType === ItemTypes.CARD && (
                    <div className="w-full max-w-xs px-4">
                        <EventCard event={item.event} isCorrect={null} lang={lang} />
                    </div>
                )}
            </div>
        </div>
    );
}
