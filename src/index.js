#!/usr/bin/env node
import fsp from 'node:fs/promises';
import gfm from "remark-gfm";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import docx from "remark-docx";
import * as fs from "fs";
const processor = unified().use(remarkParse).use(gfm).use(docx, { output: "buffer" });
const text = String(await fsp.readFile(new URL('../closure.md', import.meta.url)));
(async () => {
    const doc = await processor.process(text);
    const buffer = await doc.result;
    fs.writeFileSync("closure.docx", buffer);
})();
