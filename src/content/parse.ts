// Deterministic markdown parser for the site content files in src/content/*.md.
// The .md files are the single source of truth — the build inlines them via ?raw
// imports, so every build produces exactly the same output for the same content.

export type MdItem = {
  title: string;
  meta: Record<string, string>;
  body: string[];
};

export type MdDoc = {
  title: string;
  meta: Record<string, string>;
  body: string[];
  items: MdItem[];
};

const META_LINE = /^([a-z][a-z0-9_-]*):\s*(.*)$/;

export function parseDoc(raw: string): MdDoc {
  const doc: MdDoc = { title: "", meta: {}, body: [], items: [] };
  let current: MdItem | null = null;
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (!text) return;
    (current ? current.body : doc.body).push(text);
  };

  for (const rawLine of raw.replace(/\r\n/g, "\n").split("\n")) {
    const line = rawLine.trim();

    if (line === "") {
      flush();
      continue;
    }

    if (line.startsWith("## ")) {
      flush();
      current = { title: line.slice(3).trim(), meta: {}, body: [] };
      doc.items.push(current);
      continue;
    }

    if (line.startsWith("# ")) {
      flush();
      current = null;
      doc.title = line.slice(2).trim();
      continue;
    }

    const meta = paragraph.length === 0 ? META_LINE.exec(line) : null;
    if (meta) {
      (current ? current.meta : doc.meta)[meta[1]] = meta[2].trim();
      continue;
    }

    paragraph.push(line);
  }

  flush();
  return doc;
}
