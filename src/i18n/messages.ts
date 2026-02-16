interface Messages {
  loadingGame: string;
  errorGameNotLoaded: string;
  howToPlay: string;
  lives: string;
  remaining: string;
  goal: string;
  instruction1_1: string;
  instruction1_2: string;
  instruction1_3: string;
  instruction2: string;
  instruction3_1: string;
  instruction3_2: string;
  instruction3_3: string;
  gotIt: string;
  english: string;
  portuguese: string;
  chronoGuess: string;
  place_here_earliest: string;
  place_here_latest: string;
  place_here: string;
  your_card: string;
  congratulations_title: string;
  congratulations_message: string;
  lose_title: string;
  lose_message: string;
  perfect_score: string;
  your_score: string;
  try_again: string;
  play_again: string;
  events_placed: string;
}

type Language = 'en' | 'pt-br';


export const messages: Record<Language, Messages> = {
  en: {
    loadingGame: 'Loading game...',
    errorGameNotLoaded: 'Error: Game not loaded.',
    howToPlay: 'How to Play',
    lives: 'Lives:',
    remaining: 'Remaining:',
    goal: 'Goal: finish the remaining deck',
    instruction1_1: 'You will receive a new event card at the ',
    instruction1_2: 'bottom of the screen. ',
    instruction1_3: 'This is your current card.',
    instruction2: 'Place it in the correct chronological position on the timeline!',
    instruction3_1: 'Read the event on your current card',
    instruction3_2: 'Drag and drop or click in the position on the timeline',
    instruction3_3: 'If correct, it stays! If wrong, you lose a life',
    gotIt: 'Got it!',
    english: 'English',
    portuguese: 'Português',
    chronoGuess: 'ChronoGuess',
    place_here_earliest: 'Place here (earliest)',
    place_here_latest: 'Place here (latest)',
    place_here: 'Place here',
    your_card: 'Your Card',
    congratulations_title: 'Congratulations!',
    congratulations_message: 'You have successfully placed all events in chronological order!',
    lose_title: 'You lose!',
    lose_message: 'You have run out of lives. Game over.',
    your_score: 'Your Score',
    perfect_score: 'Perfect Score',
    try_again: 'Try Again',
    events_placed: 'Events Placed',
    play_again: 'Play Again',
  },
  'pt-br': {
    loadingGame: 'Carregando jogo...',
    errorGameNotLoaded: 'Erro: Jogo não carregado.',
    howToPlay: 'Como Jogar',
    lives: 'Vidas:',
    remaining: 'Restante:',
    goal: 'Objetivo: terminar o baralho restante',
    instruction1_1: 'Você receberá uma nova carta de evento na ',
    instruction1_2: 'parte inferior da tela. ',
    instruction1_3: 'Esta é a sua carta atual.',
    instruction2: 'Coloque-a na posição cronológica correta na linha do tempo!',
    instruction3_1: 'Leia o evento na sua carta atual',
    instruction3_2: 'Arraste e solte ou clique na posição na linha do tempo',
    instruction3_3: 'Se correto, fica! Se errado, você perde uma vida',
    gotIt: 'Entendi!',
    english: 'Inglês',
    portuguese: 'Português',
    chronoGuess: 'ChronoGuess',
    place_here_earliest: 'Coloque aqui (mais cedo)',
    place_here_latest: 'Coloque aqui (mais tarde)',
    place_here: 'Coloque aqui',
    your_card: 'Sua Carta',
    congratulations_title: 'Parabéns!',
    congratulations_message: 'Você colocou todos os eventos na ordem cronológica correta!',
    lose_title: 'Você perdeu!',
    lose_message: 'Você esgotou suas vidas. Game over.',
    your_score: 'Sua pontuação',
    perfect_score: 'Pontuação perfeita',
    try_again: 'Tente novamente',
    events_placed: 'Eventos colocados',
    play_again: 'Jogar novamente',
  },
};
