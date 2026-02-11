import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Occurrence } from '../types/game';
import { ItemTypes } from './TimelineGame';

interface DraggableCardProps {
    children: React.ReactNode;
    event: Occurrence;
}

export function DraggableCard({ children, event }: DraggableCardProps) {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: { event },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [event]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0 : 1, // Hide original item completely while dragging
                cursor: 'move',
            }}
        >
            {children}
        </div>
    );
}