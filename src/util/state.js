// Player progress: which stations have been mastered. Saved in localStorage when available.
const KEY = 'cottonopolis.progress.v1';

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const done = new Set(load());

function save() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...done]));
  } catch {
    /* storage unavailable (private mode etc.) - progress just lasts for this session */
  }
}

export const progress = {
  has: (id) => done.has(id),
  add(id) { done.add(id); save(); },
  count: () => done.size,
  reset() { done.clear(); save(); },
};
