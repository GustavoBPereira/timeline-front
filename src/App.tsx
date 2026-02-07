import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import TimelineGame from './game/TimelineGame';

export default function App() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <DndProvider backend={isTouch ? TouchBackend : HTML5Backend} options={isTouch ? { enableMouseEvents: true } : undefined}>
        <TimelineGame />
      </DndProvider>
    </div>
  );
}
