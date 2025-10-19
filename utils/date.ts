
import { format, parseISO } from 'date-fns';

export function formatDueDate(iso: string) {
  return format(parseISO(iso), 'MMM d, yyyy'); // e.g., Oct 19, 2025
}

// utility to determine dueSoon relative to fixed "today"
const TODAY_ISO = new Date().toISOString().split('T')[0];
export function daysUntil(iso: string) {
  const today = parseISO(TODAY_ISO);
  const due = parseISO(iso);
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function isDueSoon(iso: string) {
  const d = daysUntil(iso);
  return d <= 3 && d >= 0;
}

export function isPastDue(iso: string) {
  return daysUntil(iso) < 0;
}

export const getDaysUntilDue = (dueDate: Date): number => {
    const today = new Date();
    // Normalize dates to midnight to compare days accurately
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
  
    const diffTime = due.getTime() - today.getTime();
    // Calculate the number of full days
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };