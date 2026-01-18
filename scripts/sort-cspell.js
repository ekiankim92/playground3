import fs from 'fs';
import { applyEdits, modify, parse, printParseErrorCode } from 'jsonc-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .cspell.json 파일 경로
const filePath = path.join(__dirname, '../.cspell.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading .cspell.json:', err);
    return;
  }

  const cleanedData = data.replace(/,\s*([\]}])/g, '$1');

  let errors = [];
  const cspellConfig = parse(cleanedData, errors);

  if (errors.length > 0) {
    errors.forEach((error) => {
      console.error(`Error: ${printParseErrorCode(error.error)} at offset ${error.offset}`);
    });
    return;
  }

  const sortedWords = [...cspellConfig.words].sort((a, b) => a.localeCompare(b));

  const edits = modify(cleanedData, ['words'], sortedWords, {
    formattingOptions: { insertSpaces: true, tabSize: 2 },
  });

  const updatedContent = applyEdits(cleanedData, edits);

  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing .cspell.json:', err);
      return;
    }
    console.log('.cspell.json has been sorted and updated, with comments intact.');
  });
});
