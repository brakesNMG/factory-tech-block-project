// The exhibits are NOT written here. They are plain-text files in /content/exhibits.
// Edit those files (see CONTENT_GUIDE.md); this file just loads them for the game.
import { parseExhibit } from './parse.js';

const files = import.meta.glob('../../content/exhibits/*.md', { query: '?raw', import: 'default', eager: true });

export const STATIONS = Object.keys(files)
  .sort()
  .map((path, i) => parseExhibit(path, files[path], i));

export const STATION_BY_ID = Object.fromEntries(STATIONS.map((s) => [s.id, s]));
