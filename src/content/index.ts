// Single source of truth for the site copy: the markdown files in this folder.
// They are inlined at build time (?raw), so editing a .md file on master and
// rebuilding is all that is needed to publish new content.
import oMneRaw from "./o-mne.md?raw";
import prinosyRaw from "./přínosy.md?raw";
import sluzbyRaw from "./služby.md?raw";
import referenceRaw from "./reference.md?raw";
import dotazyRaw from "./dotazy.md?raw";
import { parseDoc } from "./parse";

export const oMne = parseDoc(oMneRaw);
export const prinosy = parseDoc(prinosyRaw);
export const sluzby = parseDoc(sluzbyRaw);
export const reference = parseDoc(referenceRaw);
export const dotazy = parseDoc(dotazyRaw);
