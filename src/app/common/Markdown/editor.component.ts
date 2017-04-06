import MarkdownEditorController from './editor.controller';
const template = require('./editor.template.html') as string;

export default {
   restrict: 'E',
   bindings: {},
   transclude: true,
   template,
   controller: ['$scope', MarkdownEditorController],
   require: { ngModel: 'ngModel' }
} as ng.IComponentOptions;
