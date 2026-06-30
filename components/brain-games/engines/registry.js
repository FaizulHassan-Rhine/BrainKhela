import {
  MemoryPairs, RecallNumber, RecallWords, Simon, GridPosition, FaceName, NBack,
} from './MemoryEngines';
import {
  McqQuiz, StoryMcq, SequenceInput, ShapePattern, OddOneOut, TextInputGame,
  MatrixPick, CipherInput, OrderItems, TrueFalse, ShapeSort, SlidingPuzzle,
} from './LogicEngines';
import { TimedMath, FractionInput, GridSum, GuessNumber, EquationInput } from './MathEngines';
import { WordScramble, WordSearch, SentenceBlank, WordChain, Hangman } from './WordEngines';
import {
  ReactionTime, Stroop, ColorMatch, QuickCount, SpotDiff, FocusTap, WhackMole, ObjectTrack, GoNogo,
} from './ReactionEngines';

export const ENGINE_MAP = {
  'memory-pairs': MemoryPairs,
  'recall-number': RecallNumber,
  'recall-words': RecallWords,
  simon: Simon,
  'grid-position': GridPosition,
  'face-name': FaceName,
  'story-mcq': StoryMcq,
  'n-back': NBack,
  'sequence-input': SequenceInput,
  'shape-pattern': ShapePattern,
  'odd-one-out': OddOneOut,
  'text-input': TextInputGame,
  'matrix-pick': MatrixPick,
  'cipher-input': CipherInput,
  'order-items': OrderItems,
  'true-false': TrueFalse,
  'shape-sort': ShapeSort,
  'sliding-puzzle': SlidingPuzzle,
  'timed-math': TimedMath,
  'fraction-input': FractionInput,
  'mcq-quiz': McqQuiz,
  'grid-sum': GridSum,
  'guess-number': GuessNumber,
  'equation-input': EquationInput,
  'word-scramble': WordScramble,
  'word-search': WordSearch,
  'sentence-blank': SentenceBlank,
  'word-chain': WordChain,
  hangman: Hangman,
  'reaction-time': ReactionTime,
  stroop: Stroop,
  'color-match': ColorMatch,
  'quick-count': QuickCount,
  'spot-diff': SpotDiff,
  'focus-tap': FocusTap,
  'whack-mole': WhackMole,
  'object-track': ObjectTrack,
  'go-nogo': GoNogo,
};
