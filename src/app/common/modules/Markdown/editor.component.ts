import MarkdownEditorController from './editor.controller';
require('./style.scss');

export default {
   restrict: 'E',
   bindings: {},
   template: require('./editor.template.html'),
   controller: MarkdownEditorController
} as ng.IComponentOptions;
