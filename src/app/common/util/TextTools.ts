export function unindent(text = '') {
   let lines = text.replace(/\t/g, '  ').split(/\r?\n/);
   let lineCount = lines.length;
   let min = null;

   for (let i = 0; i < lineCount; ++i) {
      const line = lines[i];
      const len = line.match(/^(\s*)/)[0].length;
      if (len !== line.length) {
         min = (len < min || min === null) ? len : min;
      }
   }

   if (min !== null && min > 0) {
      for (let i = 0; i < lineCount; ++i) {
         lines[i] = lines[i].substr(min);
      }
   }

   return lines.join('\n');
};
