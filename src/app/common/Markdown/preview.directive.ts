import * as marked from 'marked';
import { unindent } from './helpers';

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
      element.html(`<div class='content'>${marked(unindent(element.text()), scope.opts)}</div>`);
      $compile(element.contents())(scope.$parent);
   }
});
MarkdownDirective.$inject = ['$compile'];
