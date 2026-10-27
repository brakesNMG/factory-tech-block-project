// The Works Cited list is a plain-text file: /content/works-cited.md
import { parseSources } from './parse.js';
import raw from '../../content/works-cited.md?raw';

export const SOURCES = parseSources(raw);
