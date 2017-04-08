import { unindent } from '../../util/TextTools';

export default Object.assign((marked: MarkedStatic, $compile: angular.ICompileService) => ({
   restrict: 'AE',
   replace: true,
   transclude: true,
   scope: {
      opts: '=',
      src: '='
   },
   template: '<div ng-transclude></div>',
   link: (scope, element, attrs) => {
      const render = (text) => {
         element.html(marked(unindent(text), scope.opts));
         $compile(element.contents())(scope.$parent);
      };

      if (attrs.src) {
         render(scope.src);
         scope.$watch('src', render);
      } else {
         render(element.text());
      }
   }
}), { $inject: ['marked', '$compile'] });
