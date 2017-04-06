import MarkdownEditorController from './editor.controller';
const template = require('./editor.template.html') as string;

export default {
   restrict: 'E',
   bindings: {},
   template,
   controller: ['$scope', MarkdownEditorController]
} as ng.IComponentOptions;
