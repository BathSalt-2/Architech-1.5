interface Activity {
  id: number;
  action: string;
  detail: string;
  timestamp: string;
}

export function logActivity(action: string, detail: string) {
  const existing = JSON.parse(localStorage.getItem('arch15-activity') || '[]');
  existing.unshift({ id: Date.now(), action, detail, timestamp: new Date().toISOString() });
  localStorage.setItem('arch15-activity', JSON.stringify(existing.slice(0, 50)));
}

export function getActivity(): Activity[] {
  return JSON.parse(localStorage.getItem('arch15-activity') || '[]');
}
