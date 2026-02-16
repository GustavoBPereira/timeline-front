import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Heart, Trophy, Calendar, Globe, HelpCircle, X } from 'lucide-react';

import { useAutoScroll } from '../hooks/useAutoScroll';
import { CustomDragLayer } from './CustomDragLayer';

export const ItemTypes = {
  CARD: 'card',
};
import { EventCard } from './EventCard';
import { DraggableCard } from './DraggableCard';
import { Timeline } from './Timeline';
import { GameOver } from './GameOver';
import { Victory } from './Victory';
import { Match, Occurrence } from '../types/game';
import { createMatch, playCard } from '../services/game';


export default function TimelineGame() {
  const [match, setMatch] = useState<Match | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<'en' | 'pt-br'>('en');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Enable auto-scrolling when dragging
  useAutoScroll();

  // Initialize game and restart when language changes
  useEffect(() => {
    startNewGame();
  }, [lang]);

  const startNewGame = async () => {
    setLoading(true);
    try {
      const initialMatch = await createMatch(lang);
      setMatch(initialMatch);
      setIsCorrect(null);
    } catch (error) {
      console.error('Failed to start new game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlacement = async (position: number) => {
    if (!match || isCorrect !== null || loading) return;

    const currentCard = match.player_hand[0];
    if (!currentCard) return;

    setLoading(true);
    try {
      const response = await playCard(match.id, currentCard.id, position);
      setIsCorrect(response.status === 'correct');
      setMatch(response.match);

      // Delay for visual feedback before clearing isCorrect
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);

    } catch (error) {
      console.error('Failed to play card:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  if (!match && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-2xl font-semibold text-gray-700">Loading game...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-2xl font-semibold text-red-500">Error: Game not loaded.</p>
      </div>
    );
  }

  const currentCard = match.player_hand.length > 0 ? match.player_hand[0] : null;

  if (match.status === 'win') {
    return <Victory onRestart={startNewGame} score={match.timeline.length} occurrences_played={match.timeline.length + match.mistakes.length} />;
  }

  if (match.status === 'lose') {
    return <GameOver onRestart={startNewGame} score={match.timeline.length} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto pb-64">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mt-4 sm:mt-0">ChronoGuess</h1>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md mx-4">
            <Globe className="w-5 h-5 text-indigo-500" />
            <select
              value={lang}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const newLang = e.target.value as 'en' | 'pt-br';
                setLang(newLang);
              }}
              className="bg-transparent font-semibold text-gray-700 outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="pt-br">Português</option>
            </select>
          </div>

          <div className="flex items-center gap-2 sm:gap-6 mt-4 sm:mt-0">
            {/* How to Play */}
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              <span className="font-semibold text-gray-700">How to Play</span>
            </button>

            {/* Lives */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              <span className="font-semibold text-gray-700">Lives: {match.remaining_life}</span>
            </div>

            {/* Remaining Cards */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">
                Remaining: {match.remaining_deck}
              </span>
            </div>
          </div>
        </div>



        {/* Current Card */}
        {currentCard && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-20">
            <DraggableCard event={currentCard}>
              <EventCard event={currentCard} isCorrect={isCorrect} />
            </DraggableCard>
          </div>
        )}

        <CustomDragLayer />

        {/* Timeline */}
        <Timeline
          events={match.timeline}
          onPlacement={handlePlacement}
          disabled={isCorrect !== null || loading}
        />

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setShowInstructions(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">How to Play</h2>
              </div>

              <div className="space-y-4 text-gray-600">
                <p> Goal: finish the remaing deck</p>
                <p>
                  You will receive a new event card at the <strong>bottom of the screen</strong>.
                  This is your current card.
                </p>
                <p>
                  Place it in the correct chronological position on the timeline!
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Read the event on your current card</li>
                  <li>Drag and drop or click in the possition on the timeline</li>
                  <li>If correct, it stays! If wrong, you lose a life</li>
                </ul>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
