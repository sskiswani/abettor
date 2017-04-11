import { IDirective } from 'angular';
import { unindent } from 'common/utils';

export function MarkdownDirective($marked: MarkedStatic, $compile: angular.ICompileService): IDirective {
   return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      scope: {
         opts: '=?',
         src: '=?'
      },
      template: '<div class="markdown content" ng-transclude></div>',
      link: (scope, element, attrs) => {
         const render = (text) => {
            element.html($marked(unindent(text), scope.opts));
            $compile(element.contents())(scope.$parent);
         };

         if (attrs.src) {
            render(scope.src);
            scope.$watch('src', render);
         } else {
            render(element.text());
         }
      }
   };
}
