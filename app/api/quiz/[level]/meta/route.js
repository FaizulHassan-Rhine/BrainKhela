import { NextResponse } from 'next/server';
import { getMcqItems } from '@/lib/data/mcqSources';
import { buildSubjectMeta, buildCategoryMeta, dedupeMcqItems } from '@/lib/data/bilingualMcq';

const LEVELS = ['ssc', 'hsc', 'gk'];

export async function GET(request, { params }) {
  const level = params.level;
  if (!LEVELS.includes(level)) {
    return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') === 'en' ? 'en' : 'bn';
  const items = dedupeMcqItems(getMcqItems(level));
  const subjects = level === 'gk'
    ? buildCategoryMeta(items, lang)
    : buildSubjectMeta(items, lang);

  return NextResponse.json({
    level: level.toUpperCase(),
    total: items.length,
    subjects,
  });
}
