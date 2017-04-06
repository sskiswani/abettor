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

export default Object.assign(($compile, $templateRequest) => ({
   restrict: 'AE',
   replace: true,
   scope: {
      opts: '=',
      src: '='
   },
   link: (scope, element, attrs) => {
      const render = (text) => {
         text = marked(unindent(text), scope.opts);
         text = `<div class='content'>${text}</div>`;
         element.html(`<div class='container'>${text}</div>`);
         $compile(element.contents())(scope.$parent);
      };

      if (attrs.src) {
         scope.$watch('src', (src) => {
            $templateRequest(src, true)
               .then((response) => { render(response); },
               (err) => {
                  render('');
                  scope.$emit('error', attrs.src, err);
               });
         });
      } else {
         render(element.text());
      }
   }
}), {$inject: ['$compile', '$templateRequest']});
