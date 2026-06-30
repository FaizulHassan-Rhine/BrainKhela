import { diffIndex, shuffle } from '@/lib/brain-games/helpers';

const ROUNDS = { easy: 5, medium: 8, hard: 10 };

export function getGamePlayConfig(game, lang = 'bn', difficulty = 'medium') {
  const d = game.dataset || {};
  const di = diffIndex(difficulty);
  const rounds = ROUNDS[difficulty];

  switch (game.id) {
    case 'g01': {
      const grid = d.grid_sizes?.[di] || 12;
      const pairs = Math.floor(grid / 2);
      const icons = shuffle([...(d.icons || [])]).slice(0, pairs);
      return {
        engine: 'memory-pairs',
        props: { items: icons, tileType: 'emoji', cols: grid <= 12 ? 4 : 5 },
      };
    }
    case 'g02': {
      const grid = d.grid_sizes?.[di] || 12;
      const pairs = Math.floor(grid / 2);
      const nums = shuffle([...(d.numbers || [])]).slice(0, pairs);
      return { engine: 'memory-pairs', props: { items: nums.map(String), tileType: 'text', cols: 4 } };
    }
    case 'g03': {
      const hex = shuffle([...(d.hex || [])]).slice(0, 6);
      return { engine: 'memory-pairs', props: { items: hex, tileType: 'color', cols: 4 } };
    }
    case 'g04': {
      const level = d.levels?.[di] || d.levels?.[0] || { digits: 4, display_ms: 3000 };
      return {
        engine: 'recall-number',
        props: { digits: level.digits, displayMs: level.display_ms, rounds, samples: d.sample_numbers || [] },
      };
    }
    case 'g05': {
      const lists = lang === 'en' ? d.word_lists_en : d.word_lists_bn;
      return {
        engine: 'recall-words',
        props: { wordLists: lists || [], displayMs: d.display_ms || 4000, rounds },
      };
    }
    case 'g06':
      return {
        engine: 'simon',
        props: {
          colors: (d.colors_hex || []).map((hex, i) => ({
            hex,
            label: lang === 'en' ? d.buttons_en?.[i] : d.buttons_bn?.[i],
          })),
          startLength: d.start_length || 3,
          maxLength: d.max_length || 12,
        },
      };
    case 'g07': {
      const { rows, cols } = parseSize(d.grid_size || '5x5');
      return {
        engine: 'grid-position',
        props: {
          rows,
          cols,
          highlightCount: d.highlight_counts?.[di] || 3,
          displayMs: d.display_ms || 2000,
          rounds,
        },
      };
    }
    case 'g08': {
      const names = lang === 'en' ? d.names_en : d.names_bn;
      const avatars = d.avatars || [];
      return { engine: 'face-name', props: { names: names || [], avatars, rounds } };
    }
    case 'g09': {
      const stories = (d.stories || []).map((s) => ({
        text: lang === 'en' ? s.text_en : s.text_bn,
        questions: (s.questions || []).map((q) => ({
          question: lang === 'en' ? q.q_en : q.q_bn,
          answer: lang === 'en' ? q.answer_en : q.answer_bn,
        })),
      }));
      return { engine: 'story-mcq', props: { stories } };
    }
    case 'g10':
      return {
        engine: 'n-back',
        props: {
          n: d.n_levels?.[di] || 1,
          pool: d.item_pool || ['🔴', '🔵', '🟢'],
          length: Math.min(d.sequence_length || 20, rounds + 10),
        },
      };
    case 'g11':
      return { engine: 'sequence-input', props: { series: d.series || [], rounds } };
    case 'g12':
      return { engine: 'shape-pattern', props: { shapes: d.shapes || [], answer: d.answer, pool: d.shape_pool || [] } };
    case 'g13':
      return {
        engine: 'odd-one-out',
        props: {
          sets: (d.sets || []).map((s) => ({
            items: lang === 'en' ? s.items_en : s.items_bn,
            oddIndex: s.odd_index,
          })),
          rounds,
        },
      };
    case 'g14':
      return {
        engine: 'text-input',
        props: {
          items: (d.puzzles || []).map((p) => ({
            question: lang === 'en' ? p.q_en : p.q_bn,
            answer: lang === 'en' ? p.answer_en : p.answer_bn,
          })),
          rounds,
        },
      };
    case 'g15':
      return { engine: 'matrix-pick', props: { grid: d.grid_example, answer: d.answer } };
    case 'g16': {
      const ex = d.cipher_examples?.[0];
      return {
        engine: 'cipher-input',
        props: {
          code: ex?.code || 'BCD',
          shift: ex?.shift || 1,
          answer: lang === 'en' ? ex?.answer_en : ex?.answer_bn,
          rule: d.rule,
        },
      };
    }
    case 'g17':
      return {
        engine: 'order-items',
        props: {
          sequences: (d.sequences || []).map((s) => ({
            items: lang === 'en' ? s.items_en : s.items_bn,
          })),
          rounds,
        },
      };
    case 'g18':
      return {
        engine: 'true-false',
        props: {
          items: (d.items || []).map((item) => ({
            premise1: lang === 'en' ? item.premise1_en : item.premise1_bn,
            premise2: lang === 'en' ? item.premise2_en : item.premise2_bn,
            conclusion: lang === 'en' ? item.conclusion_en : item.conclusion_bn,
            valid: item.valid,
          })),
          rounds,
        },
      };
    case 'g19':
      return { engine: 'shape-sort', props: { attributes: d.attributes || [], pool: d.shape_pool || [], rounds } };
    case 'g20': {
      const size = d.grid_sizes?.[di] || '3x3';
      const { rows } = parseSize(size);
      return { engine: 'sliding-puzzle', props: { size: rows } };
    }
    case 'g21':
    case 'g22':
    case 'g23':
    case 'g26': {
      const op = game.id === 'g21' ? '+' : game.id === 'g22' ? '-' : game.id === 'g23' ? '×' : 'mix';
      return {
        engine: 'timed-math',
        props: {
          samples: d.sample || [],
          timeLimit: d.time_limit_sec || 30,
          operation: op,
          tables: d.tables,
          rounds,
        },
      };
    }
    case 'g24':
      return { engine: 'fraction-input', props: { samples: d.sample || [], rounds } };
    case 'g25':
      return {
        engine: 'mcq-quiz',
        props: {
          items: (d.sample || []).map((s) => {
            const built = buildOptions(s.answer);
            return {
              question: lang === 'en' ? s.q_en : s.q_bn,
              options: built.options,
              correct: built.correct,
            };
          }),
          rounds,
        },
      };
    case 'g27':
      return { engine: 'grid-sum', props: { grid: d.grid_example, targetSum: d.target_sum } };
    case 'g28':
      return {
        engine: 'mcq-quiz',
        props: {
          items: (d.sample || []).map((s) => {
            const shape = lang === 'en' ? s.shape_en : s.shape_bn;
            const q = lang === 'en'
              ? `Area of ${shape} (${s.length}×${s.width})?`
              : `${shape} (${s.length}×${s.width}) এর ক্ষেত্রফল?`;
            const opts = shuffle([s.area, s.perimeter, s.area + 1, s.perimeter + 1].map(String));
            return { question: q, options: opts, correct: opts.indexOf(String(s.area)) };
          }),
          rounds,
        },
      };
    case 'g29':
      return {
        engine: 'guess-number',
        props: { min: d.range_min || 1, max: d.range_max || 100, maxAttempts: d.max_attempts || 7 },
      };
    case 'g30':
      return {
        engine: 'equation-input',
        props: {
          items: (d.sample || []).map((s) => ({
            equation: lang === 'en' ? s.equation_en : s.equation_bn,
            answer: s.answer,
          })),
          rounds,
        },
      };
    case 'g31': {
      const words = lang === 'en' ? d.words_en : d.words_bn;
      return { engine: 'word-scramble', props: { words: words || [], rounds } };
    }
    case 'g32': {
      const words = lang === 'en' ? d.words_en : d.words_bn;
      const { rows, cols } = parseSize(d.grid_size || '10x10');
      return { engine: 'word-search', props: { words: words || [], rows, cols } };
    }
    case 'g33':
    case 'g34':
      return {
        engine: 'mcq-quiz',
        props: {
          items: (d.pairs || []).map((p) => {
            const word = lang === 'en' ? p.word_en : p.word_bn;
            const answer = lang === 'en' ? p.answer_en : p.answer_bn;
            const wrong = shuffle((lang === 'en' ? p.wrong_en : p.wrong_bn) || []).slice(0, 3);
            const options = shuffle([answer, ...wrong].filter(Boolean));
            return { question: word, options, correct: options.indexOf(answer) };
          }),
          rounds,
        },
      };
    case 'g35':
      return {
        engine: 'mcq-quiz',
        props: {
          items: (d.items || []).map((item) => {
            const word = lang === 'en' ? item.word_en : item.word_bn;
            const meaning = lang === 'en' ? item.meaning_en : item.meaning_bn;
            const wrong = shuffle(d.items.filter((x) => x !== item)).slice(0, 3).map((x) => (lang === 'en' ? x.meaning_en : x.meaning_bn));
            const options = shuffle([meaning, ...wrong]);
            return { question: word, options, correct: options.indexOf(meaning) };
          }),
          rounds,
        },
      };
    case 'g36':
      return {
        engine: 'mcq-quiz',
        props: {
          items: (d.items || []).map((item) => {
            const correct = lang === 'en' ? item.correct_en : item.correct_bn;
            const wrong = lang === 'en' ? item.wrong_options_en : item.wrong_options_bn;
            const options = shuffle([correct, ...(wrong || [])]);
            return {
              question: lang === 'en' ? 'Correct spelling?' : 'সঠিক বানান?',
              options,
              correct: options.indexOf(correct),
            };
          }),
          rounds,
        },
      };
    case 'g37':
      return {
        engine: 'sentence-blank',
        props: {
          items: (d.items || []).map((item) => ({
            sentence: lang === 'en' ? item.sentence_en : item.sentence_bn,
            answer: lang === 'en' ? item.answer_en : item.answer_bn,
          })),
          rounds,
        },
      };
    case 'g38': {
      const starters = lang === 'en' ? d.starter_words_en : d.starter_words_bn;
      return { engine: 'word-chain', props: { starters: starters || [], rounds } };
    }
    case 'g39': {
      const bank = lang === 'en' ? d.word_bank_en : d.word_bank_bn;
      return { engine: 'hangman', props: { words: bank || [], rounds } };
    }
    case 'g40':
      return {
        engine: 'text-input',
        props: {
          items: (d.items || []).map((item) => ({
            question: lang === 'en' ? item.riddle_en : item.riddle_bn,
            answer: lang === 'en' ? item.answer_en : item.answer_bn,
          })),
          rounds,
        },
      };
    case 'g41':
      return {
        engine: 'reaction-time',
        props: {
          triggerColor: d.trigger_color,
          waitColor: d.wait_color,
          minDelay: d.min_delay_ms || 1000,
          maxDelay: d.max_delay_ms || 4000,
          rounds,
        },
      };
    case 'g42':
      return {
        engine: 'stroop',
        props: {
          items: (d.items || []).map((item) => ({
            word: lang === 'en' ? item.word_en : item.word_bn,
            textColor: item.text_color,
          })),
          rounds,
        },
      };
    case 'g43': {
      const colors = (d.colors_bn || []).map((_, i) => ({
        name: lang === 'en' ? d.colors_en?.[i] : d.colors_bn?.[i],
        hex: d.hex?.[i],
      }));
      return { engine: 'color-match', props: { colors, rounds } };
    }
    case 'g44':
      return {
        engine: 'quick-count',
        props: {
          objects: d.object_pool || ['⭐'],
          countRange: d.count_range || [3, 10],
          displayMs: d.display_ms || 1500,
          rounds,
        },
      };
    case 'g45':
      return {
        engine: 'spot-diff',
        props: {
          pairs: d.image_pairs || [],
          rounds,
        },
      };
    case 'g46':
      return {
        engine: 'focus-tap',
        props: {
          target: d.target_symbol || '⭐',
          distractors: d.distractor_symbols || ['🔴', '🔵'],
          rounds: d.rounds || rounds,
        },
      };
    case 'g47': {
      const { rows, cols } = parseSize(d.grid_size || '3x3');
      return {
        engine: 'whack-mole',
        props: {
          rows,
          cols,
          interval: d.appear_interval_ms?.[di] || 800,
          sessionSec: d.session_sec || 30,
        },
      };
    }
    case 'g48':
      return {
        engine: 'mcq-quiz',
        props: {
          items: (d.items || []).map((item) => {
            const answer = lang === 'en' ? item.answer_en : item.answer_bn;
            const wrong = shuffle((d.items || []).filter((x) => x !== item)).slice(0, 3).map((x) => (lang === 'en' ? x.answer_en : x.answer_bn));
            const options = shuffle([answer, ...wrong]);
            return {
              question: lang === 'en' ? `Sound: ${item.sound}` : `শব্দ: ${item.sound}`,
              options,
              correct: options.indexOf(answer),
            };
          }),
          rounds,
        },
      };
    case 'g49':
      return {
        engine: 'object-track',
        props: {
          objectCount: d.object_count || 5,
          distractorCount: d.distractor_count || 10,
          durationSec: d.duration_sec || 15,
        },
      };
    case 'g50':
      return {
        engine: 'go-nogo',
        props: {
          goColor: d.go_color,
          nogoColor: d.nogo_color,
          goRatio: d.go_ratio || 0.7,
          rounds: d.rounds || 30,
        },
      };
    default:
      return { engine: 'unsupported', props: {} };
  }
}

function parseSize(size) {
  const [r, c] = String(size).split('x').map(Number);
  return { rows: r || 4, cols: c || 4 };
}

function buildOptions(answer) {
  const n = Number(answer);
  const wrong = [n + 1, n - 1, n + 5].filter((x) => x !== n && x >= 0);
  const options = shuffle([String(answer), ...wrong.map(String)]);
  return { options, correct: options.indexOf(String(answer)) };
}
