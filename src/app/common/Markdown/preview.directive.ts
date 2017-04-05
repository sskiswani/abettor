import * as ng from 'angular';
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

export const MarkdownDirective = Object.assign(($compile) => ({
   restrict: 'AE',
   replace: true,
   scope: { opts: '=' },
   link: (scope, element, attrs) => {
      element.html(`<div class='content'>${marked(unindent(element.text()), scope.opts)}</div>`);
      $compile(element.contents())(scope.$parent);
   }
}), { $inject: ['$compile'] });

export default (angular: ng.IModule) => angular.directive('markdown', MarkdownDirective);
