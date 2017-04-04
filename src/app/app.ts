import * as ng from 'angular';
import * as marked from 'marked';

const unindent = (text: string) => {
   let lines = text.replace(/\t/g, '  ').split(/\r?\n/);
   console.info('got lines', lines);
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

marked.setOptions({
   renderer: new marked.Renderer(),
   gfm: true,
   tables: true,
   breaks: false,
   sanitize: false,
   smartLists: true,
   smartypants: true
});

const MarkdownDirective = ($compile) => ({
   restrict: 'AE',
   replace: true,
   scope: { opts: '=' },
   link: (scope, element, attrs) => {
      console.info('linking...');
      let text = `<div class='content'>${marked(unindent(element.text()), scope.opts)}</div>`;
      console.info('setting...', text);

      element.html(`<div class='container'>${text}</div>`);
      $compile(element.contents())(scope.$parent);
   }
});
MarkdownDirective.$inject = ['$compile'];

const app = ng.module('app', [])
   .directive('markdown', MarkdownDirective);

export default app;
