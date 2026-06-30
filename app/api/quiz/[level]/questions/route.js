import { NextResponse } from 'next/server';
import { getMcqItems } from '@/lib/data/mcqSources';
import { filterMcqItems, filterCategoryItems, dedupeMcqItems } from '@/lib/data/bilingualMcq';

const LEVELS = ['ssc', 'hsc', 'gk'];

export async function GET(request, { params }) {
  const level = params.level;
  if (!LEVELS.includes(level)) {
    return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const chapter = searchParams.get('chapter') || null;

  if (!subject) {
    return NextResponse.json({ error: 'subject required' }, { status: 400 });
  }

  const raw = getMcqItems(level);
  const filtered = level === 'gk'
    ? filterCategoryItems(raw, { category: subject, difficulty: chapter })
    : filterMcqItems(raw, { subject, chapter });
  const items = dedupeMcqItems(filtered);

  return NextResponse.json({
    count: items.length,
    questions: items,
  });
}
