const pad = (n: number) => String(n).padStart(2, '0');

export const toDateKey = (year: number, month: number, day: number) =>
  `${year}-${pad(month + 1)}-${pad(day)}`;

export const monthPrefix = (year: number, month: number) => `${year}-${pad(month + 1)}-`;

export function expandRange(start: string, end: string): string[] {
  const days: string[] = [];
  const cursor = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cursor <= last) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

export type MonthCell = { day: number; key: string | null; weekday: number };

// Full weeks (Sunday first). Days from adjacent months have a null key.
export function buildMonthCells(year: number, month: number): MonthCell[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: MonthCell[] = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, key: null, weekday: cells.length % 7 });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, key: toDateKey(year, month, d), weekday: cells.length % 7 });
  }
  for (let d = 1; cells.length % 7 !== 0; d++) {
    cells.push({ day: d, key: null, weekday: cells.length % 7 });
  }
  return cells;
}

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  });

export function formatDateRange(start: string, end: string) {
  return start === end ? `${shortDate(start)} (One Day)` : `${shortDate(start)} - ${shortDate(end)}`;
}
