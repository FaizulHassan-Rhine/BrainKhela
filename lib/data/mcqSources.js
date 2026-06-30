import sscJson from '@/data/ssc.json';
import hscJson from '@/data/hsc.json';

function isValidMcq(item) {
  return !!(item?.question?.bn && (item?.category?.en || item?.subject?.en));
}

function prepareMcqList(items) {
  return (items || []).filter(isValidMcq);
}

const hscAll = prepareMcqList(hscJson.hsc);
const gkItems = hscAll.filter((q) => q.category.en === 'GK');
const hscItems = hscAll.filter((q) => q.category.en !== 'GK');

export const MCQ_SOURCES = {
  ssc: prepareMcqList(sscJson.ssc),
  hsc: hscItems,
  gk: gkItems,
};

export function getMcqItems(level) {
  return MCQ_SOURCES[level] || [];
}
