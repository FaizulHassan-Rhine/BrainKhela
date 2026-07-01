'use client';

import { useMemo } from 'react';
import { getGamePreviewConfig } from '@/lib/brain-games/getGamePlayConfig';
import Num from '@/components/ui/Num';

const CATEGORY_BG = {
  memory: 'bg-gradient-to-br from-violet-100/95 via-indigo-50/90 to-cream-light',
  logic: 'bg-gradient-to-br from-sky-100/95 via-cyan-50/90 to-cream-light',
  math: 'bg-gradient-to-br from-amber-100/95 via-orange-50/90 to-cream-light',
  word: 'bg-gradient-to-br from-emerald-100/95 via-teal-50/90 to-cream-light',
  reaction: 'bg-gradient-to-br from-rose-100/95 via-red-50/90 to-cream-light',
};

function formatMathSample(sample, operation = '+') {
  if (sample == null) return null;
  if (typeof sample === 'string' || typeof sample === 'number') return String(sample);
  if (typeof sample === 'object') {
    if (sample.expression) return sample.expression;
    if (sample.a != null && sample.b != null) {
      const op = sample.op || (operation === '×' ? '×' : operation === '-' ? '-' : '+');
      return `${sample.a} ${op} ${sample.b}`;
    }
  }
  return null;
}

function formatFractionSample(sample) {
  if (sample == null) return '1/2 + 1/4';
  if (typeof sample === 'string') return sample;
  if (typeof sample === 'object' && sample.frac1 && sample.frac2) {
    const op = sample.operation === 'subtract' ? '-' : '+';
    return `${sample.frac1} ${op} ${sample.frac2}`;
  }
  return '1/2 + 1/4';
}

function resolveWordEntry(entry, field = 'answer') {
  if (entry == null) return '';
  if (typeof entry === 'string') return entry;
  if (typeof entry === 'object') {
    return entry[field] || entry.word || entry.answer || entry.scrambled || '';
  }
  return String(entry);
}

function MiniGrid({ rows, cols, cells, cellClass = 'bg-white/70 border border-accent/50' }) {
  return (
    <div
      className="grid gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, width: cols * 22 + (cols - 1) * 4 }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          className={`w-[22px] h-[22px] rounded-md flex items-center justify-center text-[10px] font-semibold ${cellClass} ${cell.className || ''}`}
          style={cell.style}
        >
          {typeof cell.content === 'object' && cell.content !== null && !Array.isArray(cell.content)
            ? null
            : cell.content}
        </div>
      ))}
    </div>
  );
}

function MemoryPairsPreview({ items, tileType }) {
  const sample = (items || []).slice(0, 3);
  const tiles = [
    { content: tileType === 'color' ? '' : sample[0], style: tileType === 'color' ? { background: sample[0] } : {}, className: 'bg-white/90' },
    { content: '?' },
    { content: tileType === 'color' ? '' : sample[1], style: tileType === 'color' ? { background: sample[1] } : {}, className: 'bg-white/90' },
    { content: '?' },
    { content: '?' },
    { content: tileType === 'color' ? '' : sample[2], style: tileType === 'color' ? { background: sample[2] } : {}, className: 'bg-white/90' },
  ];
  return <MiniGrid rows={2} cols={3} cells={tiles} />;
}

function RecallNumberPreview({ digits, samples }) {
  const value = samples?.[0] || '4'.repeat(digits || 4);
  return <p className="text-3xl font-bold tracking-[0.35em] text-primary"><Num value={value} /></p>;
}

function RecallWordsPreview({ wordLists }) {
  const words = wordLists?.[0]?.slice(0, 4) || ['Word', 'Memory', 'Game'];
  return (
    <div className="flex flex-wrap gap-1.5 justify-center max-w-[220px]">
      {words.map((w) => (
        <span key={w} className="text-[10px] px-2 py-1 rounded-full bg-white/80 border border-accent/60 text-primary font-medium">
          {w}
        </span>
      ))}
    </div>
  );
}

function SimonPreview({ colors }) {
  const palette = colors?.length ? colors : [{ hex: '#e74c3c' }, { hex: '#3498db' }, { hex: '#2ecc71' }, { hex: '#f1c40f' }];
  return (
    <div className="grid grid-cols-2 gap-2">
      {palette.slice(0, 4).map((c, i) => (
        <span
          key={i}
          className="w-10 h-10 rounded-xl shadow-sm border border-white/40"
          style={{ background: c.hex }}
        />
      ))}
    </div>
  );
}

function GridPositionPreview({ rows = 5, cols = 5 }) {
  const total = rows * cols;
  const cells = Array.from({ length: total }, (_, i) => ({
    content: '',
    className: [2, 7, 16].includes(i) ? 'bg-primary/25 border-primary/30' : '',
  }));
  return <MiniGrid rows={rows} cols={cols} cells={cells} />;
}

function FaceNamePreview({ avatars, names }) {
  const faces = avatars?.slice(0, 3) || ['🙂', '😊', '🤓'];
  const labels = names?.slice(0, 3) || ['A', 'B', 'C'];
  return (
    <div className="flex gap-3">
      {faces.map((face, i) => (
        <div key={i} className="text-center">
          <div className="w-9 h-9 rounded-full bg-white/80 border border-accent flex items-center justify-center text-lg">
            {face}
          </div>
          <p className="text-[8px] mt-1 text-primary/70 max-w-[48px] truncate">{labels[i]}</p>
        </div>
      ))}
    </div>
  );
}

function StoryPreview({ stories }) {
  const story = stories?.[0];
  const q = story?.questions?.[0];
  return (
    <div className="max-w-[230px] space-y-2 text-center">
      <p className="text-[9px] text-primary/75 line-clamp-2 leading-relaxed">{story?.text}</p>
      <div className="flex gap-1.5 justify-center">
        <span className="text-[8px] px-2 py-1 rounded-md bg-white/80 border border-accent">{q?.question || '?'}</span>
        <span className="text-[8px] px-2 py-1 rounded-md bg-white/50 border border-accent/50">B</span>
      </div>
    </div>
  );
}

function SequencePreview({ pool }) {
  const items = pool?.slice(0, 5) || ['🔴', '🔵', '🟢', '🔴', '🔵'];
  return (
    <div className="flex gap-1.5">
      {items.map((item, i) => (
        <span key={i} className="w-8 h-8 rounded-full bg-white/70 border border-accent flex items-center justify-center text-sm">
          {item}
        </span>
      ))}
    </div>
  );
}

function ShapePatternPreview({ shapes, pool }) {
  const list = shapes?.length ? shapes : pool?.slice(0, 4) || ['●', '■', '▲', '●'];
  return (
    <div className="flex gap-2 text-xl text-primary">
      {list.map((s, i) => <span key={i}>{s}</span>)}
    </div>
  );
}

function OddOneOutPreview({ sets }) {
  const set = sets?.[0];
  const items = set?.items?.slice(0, 4) || ['🍎', '🍎', '🍌', '🍎'];
  return (
    <div className="flex gap-2 text-2xl">
      {items.map((item, i) => (
        <span key={i} className={i === set?.oddIndex ? 'ring-2 ring-primary/40 rounded-lg px-0.5' : 'opacity-80'}>
          {item}
        </span>
      ))}
    </div>
  );
}

function InputPreview({ label = '?' }) {
  return (
    <div className="w-40 space-y-2">
      <p className="text-[10px] text-center text-primary/80 line-clamp-1">{label}</p>
      <div className="h-8 rounded-lg border border-accent bg-white/80 flex items-center px-2 text-[10px] text-muted-foreground">
        Type here...
      </div>
    </div>
  );
}

function MatrixPreview({ grid }) {
  const cells = (grid || [[1, 0, 1], [0, 1, 0], [1, 0, 1]]).flat().map((n) => ({
    content: '',
    className: n ? 'bg-primary/30 border-primary/20' : '',
  }));
  return <MiniGrid rows={3} cols={3} cells={cells} />;
}

function CipherPreview({ code, shift }) {
  return (
    <div className="text-center space-y-1">
      <p className="text-xl font-bold tracking-widest text-primary">{code || 'ABC'}</p>
      <p className="text-[10px] text-primary/60">shift +{shift || 1}</p>
    </div>
  );
}

function OrderPreview({ sequences }) {
  const items = sequences?.[0]?.items?.slice(0, 3) || ['1st', '2nd', '3rd'];
  return (
    <div className="flex gap-2">
      {items.map((item, i) => (
        <span key={item} className="text-[10px] px-2.5 py-1.5 rounded-lg bg-white/80 border border-accent font-medium text-primary">
          {i + 1}. {item}
        </span>
      ))}
    </div>
  );
}

function TrueFalsePreview() {
  return (
    <div className="flex gap-2">
      <span className="text-[10px] px-3 py-2 rounded-lg bg-green-100 text-green-800 border border-green-200 font-semibold">✓ True</span>
      <span className="text-[10px] px-3 py-2 rounded-lg bg-white/70 border border-accent text-primary/70">✗ False</span>
    </div>
  );
}

function SlidingPreview({ size = 3 }) {
  const nums = Array.from({ length: size * size }, (_, i) => i + 1);
  nums[nums.length - 1] = '';
  const cells = nums.map((n) => ({ content: n ? <Num value={n} /> : '', className: n ? 'bg-white/80' : 'bg-primary/10' }));
  return <MiniGrid rows={size} cols={size} cells={cells} />;
}

function MathPreview({ samples, operation }) {
  const fallback = operation === '×' ? '6 × 7' : operation === '-' ? '15 - 8' : '9 + 4';
  const expr = formatMathSample(samples?.[0], operation) || fallback;
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-primary">{expr} = ?</p>
      <div className="mt-2 h-1.5 w-28 mx-auto bg-accent/80 rounded-full overflow-hidden">
        <div className="h-full w-3/5 bg-primary rounded-full" />
      </div>
    </div>
  );
}

function FractionPreview({ samples }) {
  const frac = formatFractionSample(samples?.[0]);
  return <p className="text-xl font-bold text-primary">{frac} = ?</p>;
}

function SequenceInputPreview({ series }) {
  const seq = series?.[0]?.sequence || [2, 4, 6, 8];
  return (
    <p className="text-lg font-bold text-primary tracking-wide">
      {seq.join(' ')} <span className="text-primary/40">?</span>
    </p>
  );
}

function McqPreview({ items }) {
  const item = items?.[0];
  if (!item) return <InputPreview />;
  return (
    <div className="w-full max-w-[220px] space-y-2">
      <p className="text-[10px] font-medium text-primary/85 line-clamp-2 text-center leading-snug">{item.question}</p>
      <div className="grid grid-cols-2 gap-1.5">
        {(item.options || []).slice(0, 4).map((opt, i) => (
          <div
            key={i}
            className={`text-[9px] px-2 py-1.5 rounded-lg border text-center truncate ${
              i === item.correct ? 'border-primary/40 bg-white/90 font-semibold' : 'border-accent/60 bg-white/50'
            }`}
          >
            {String(opt)}
          </div>
        ))}
      </div>
    </div>
  );
}

function GridSumPreview({ grid, targetSum }) {
  const flat = (grid || [[2, 4, 1], [3, 5, 2], [1, 2, 4]]).flat();
  const cells = flat.map((n) => ({ content: <Num value={n} />, className: 'bg-white/80 text-[9px]' }));
  return (
    <div className="space-y-2 text-center">
      <MiniGrid rows={3} cols={3} cells={cells} />
      <p className="text-[9px] text-primary/70">Σ = <Num value={targetSum || 12} /></p>
    </div>
  );
}

function GuessNumberPreview({ min, max }) {
  return (
    <div className="w-44 space-y-2 text-center">
      <div className="flex justify-between text-[9px] text-primary/60">
        <Num value={min || 1} />
        <span className="font-bold text-primary text-sm">?</span>
        <Num value={max || 100} />
      </div>
      <div className="h-2 rounded-full bg-accent relative">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-white" />
      </div>
    </div>
  );
}

function WordScramblePreview({ words }) {
  const scrambled = resolveWordEntry(words?.[0], 'scrambled') || 'BRAIN';
  const display = scrambled.split('').join(' ');
  return <p className="text-xl font-bold tracking-widest text-primary uppercase">{display}</p>;
}

function WordSearchPreview() {
  const letters = ['B', 'R', 'A', 'I', 'N', 'X', 'Q', 'Z', 'K', 'L'];
  const cells = letters.map((l, i) => ({
    content: l,
    className: i < 5 ? 'bg-primary/20 text-[8px] font-bold' : 'bg-white/60 text-[8px]',
  }));
  return <MiniGrid rows={2} cols={5} cells={cells} />;
}

function SentenceBlankPreview({ items }) {
  const item = items?.[0];
  const text = item?.sentence || 'The cat ___ on the mat';
  return <p className="text-[11px] text-primary font-medium text-center max-w-[220px] leading-relaxed">{text}</p>;
}

function WordChainPreview({ starters }) {
  const chain = starters?.slice(0, 3) || ['Sun', 'Light', 'House'];
  return (
    <div className="flex items-center gap-1 text-[10px] font-semibold text-primary">
      {chain.map((w, i) => (
        <span key={w} className="flex items-center gap-1">
          <span className="px-2 py-1 rounded-full bg-white/80 border border-accent">{w}</span>
          {i < chain.length - 1 && <span className="text-primary/40">→</span>}
        </span>
      ))}
    </div>
  );
}

function HangmanPreview({ words }) {
  const word = resolveWordEntry(words?.[0]) || 'GAME';
  return (
    <div className="text-center space-y-2">
      <div className="flex gap-1 justify-center">
        {word.split('').map((_, i) => (
          <span key={i} className="w-5 border-b-2 border-primary/50" />
        ))}
      </div>
      <p className="text-[9px] text-primary/60">
        {word.split('').map(() => '_').join(' ')}
      </p>
    </div>
  );
}

function ReactionPreview({ waitColor, triggerColor }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 h-12 rounded-full border-2 border-white/60 shadow-inner" style={{ background: waitColor || '#95a5a6' }} />
      <span className="text-lg text-primary/40">→</span>
      <span className="w-12 h-12 rounded-full border-2 border-white/60 shadow-md ring-2 ring-green-300/50" style={{ background: triggerColor || '#2ecc71' }} />
    </div>
  );
}

function StroopPreview({ items }) {
  const item = items?.[0];
  return (
    <p className="text-2xl font-bold" style={{ color: item?.textColor || '#3498db' }}>
      {item?.word || 'RED'}
    </p>
  );
}

function ColorMatchPreview({ colors }) {
  const target = colors?.[0];
  const options = colors?.slice(0, 3) || [{ hex: '#e74c3c' }, { hex: '#3498db' }, { hex: '#2ecc71' }];
  return (
    <div className="space-y-2 text-center">
      <p className="text-sm font-bold text-primary">{target?.name || 'Blue'}</p>
      <div className="flex gap-2 justify-center">
        {options.map((c) => (
          <span key={c.hex} className="w-8 h-8 rounded-lg border border-white/50 shadow-sm" style={{ background: c.hex }} />
        ))}
      </div>
    </div>
  );
}

function QuickCountPreview({ objects, countRange }) {
  const symbol = objects?.[0] || '⭐';
  const count = countRange?.[1] || 7;
  return (
    <div className="flex flex-wrap gap-1 max-w-[120px] justify-center text-sm">
      {Array.from({ length: Math.min(count, 9) }).map((_, i) => (
        <span key={i}>{symbol}</span>
      ))}
    </div>
  );
}

function SpotDiffPreview() {
  const left = Array.from({ length: 16 }, () => ({ content: '■', className: 'bg-white/70 text-[8px] text-primary/50' }));
  const right = [...left];
  right[5] = { content: '■', className: 'bg-primary/25 text-[8px] text-primary ring-1 ring-primary/40' };
  return (
    <div className="flex gap-2">
      <MiniGrid rows={4} cols={4} cells={left} />
      <MiniGrid rows={4} cols={4} cells={right} />
    </div>
  );
}

function FocusTapPreview({ target, distractors }) {
  const symbols = [distractors?.[0] || '🔴', target || '⭐', distractors?.[1] || '🔵', '🔴', target || '⭐', '🔵'];
  const cells = symbols.map((s) => ({
    content: s,
    className: s === (target || '⭐') ? 'bg-amber-100 ring-1 ring-amber-400/60 text-xs' : 'bg-white/60 text-xs opacity-70',
  }));
  return <MiniGrid rows={2} cols={3} cells={cells} />;
}

function WhackPreview({ rows = 3, cols = 3 }) {
  const total = rows * cols;
  const cells = Array.from({ length: total }, (_, i) => ({
    content: i === 4 ? '🐹' : '',
    className: i === 4 ? 'bg-amber-200/90 text-sm scale-110' : 'bg-white/50',
  }));
  return <MiniGrid rows={rows} cols={cols} cells={cells} />;
}

function GoNoGoPreview({ goColor, nogoColor }) {
  return (
    <div className="flex gap-3">
      <span className="w-11 h-11 rounded-full border-2 border-white/50 shadow-sm" style={{ background: goColor || '#2ecc71' }} />
      <span className="w-11 h-11 rounded-full border-2 border-white/50 shadow-sm opacity-80" style={{ background: nogoColor || '#e74c3c' }} />
    </div>
  );
}

function ObjectTrackPreview() {
  return (
    <div className="relative w-36 h-16">
      {['🔵', '🔴', '🟢', '🟡', '🔵'].map((dot, i) => (
        <span
          key={i}
          className="absolute text-sm"
          style={{ left: `${i * 18}%`, top: `${(i % 2) * 12}px` }}
        >
          {dot}
        </span>
      ))}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-lg ring-2 ring-primary/30 rounded-full">⭐</span>
    </div>
  );
}

function PreviewRenderer({ engine, props }) {
  switch (engine) {
    case 'memory-pairs':
      return <MemoryPairsPreview items={props.items} tileType={props.tileType} />;
    case 'recall-number':
      return <RecallNumberPreview digits={props.digits} samples={props.samples} />;
    case 'recall-words':
      return <RecallWordsPreview wordLists={props.wordLists} />;
    case 'simon':
      return <SimonPreview colors={props.colors} />;
    case 'grid-position':
      return <GridPositionPreview rows={props.rows} cols={props.cols} />;
    case 'face-name':
      return <FaceNamePreview avatars={props.avatars} names={props.names} />;
    case 'story-mcq':
      return <StoryPreview stories={props.stories} />;
    case 'n-back':
      return <SequencePreview pool={props.pool} />;
    case 'sequence-input':
      return <SequenceInputPreview series={props.series} />;
    case 'shape-pattern':
    case 'shape-sort':
      return <ShapePatternPreview shapes={props.shapes} pool={props.pool} />;
    case 'odd-one-out':
      return <OddOneOutPreview sets={props.sets} />;
    case 'text-input':
      return <InputPreview label={props.items?.[0]?.question} />;
    case 'matrix-pick':
      return <MatrixPreview grid={props.grid} />;
    case 'cipher-input':
      return <CipherPreview code={props.code} shift={props.shift} />;
    case 'order-items':
      return <OrderPreview sequences={props.sequences} />;
    case 'true-false':
      return <TrueFalsePreview />;
    case 'sliding-puzzle':
      return <SlidingPreview size={props.size} />;
    case 'timed-math':
      return <MathPreview samples={props.samples} operation={props.operation} />;
    case 'fraction-input':
      return <FractionPreview samples={props.samples} />;
    case 'mcq-quiz':
      return <McqPreview items={props.items} />;
    case 'grid-sum':
      return <GridSumPreview grid={props.grid} targetSum={props.targetSum} />;
    case 'guess-number':
      return <GuessNumberPreview min={props.min} max={props.max} />;
    case 'equation-input':
      return <p className="text-xl font-bold text-primary">{props.items?.[0]?.equation || 'x + 5 = 12'}</p>;
    case 'word-scramble':
      return <WordScramblePreview words={props.words} />;
    case 'word-search':
      return <WordSearchPreview />;
    case 'sentence-blank':
      return <SentenceBlankPreview items={props.items} />;
    case 'word-chain':
      return <WordChainPreview starters={props.starters} />;
    case 'hangman':
      return <HangmanPreview words={props.words} />;
    case 'reaction-time':
      return <ReactionPreview waitColor={props.waitColor} triggerColor={props.triggerColor} />;
    case 'stroop':
      return <StroopPreview items={props.items} />;
    case 'color-match':
      return <ColorMatchPreview colors={props.colors} />;
    case 'quick-count':
      return <QuickCountPreview objects={props.objects} countRange={props.countRange} />;
    case 'spot-diff':
      return <SpotDiffPreview />;
    case 'focus-tap':
      return <FocusTapPreview target={props.target} distractors={props.distractors} />;
    case 'whack-mole':
      return <WhackPreview rows={props.rows} cols={props.cols} />;
    case 'go-nogo':
      return <GoNoGoPreview goColor={props.goColor} nogoColor={props.nogoColor} />;
    case 'object-track':
      return <ObjectTrackPreview />;
    default:
      return <ShapePatternPreview shapes={['●', '■', '▲', '◆']} />;
  }
}

export default function BrainGamePreview({ game, lang }) {
  const config = useMemo(() => getGamePreviewConfig(game, lang), [game, lang]);
  const bg = CATEGORY_BG[game.category] || CATEGORY_BG.logic;

  return (
    <div className={`relative h-40 overflow-hidden border-b border-accent/50 ${bg}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.55),transparent_50%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none select-none transition-transform duration-300 group-hover:scale-[1.03]">
        <PreviewRenderer engine={config.engine} props={config.props} />
      </div>
    </div>
  );
}
