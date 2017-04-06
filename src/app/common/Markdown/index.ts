import * as ng from 'angular';
import EditorComponent from './editor.component';
import EditorController from './editor.controller';
import MarkdownDirective from './preview.directive';

require('./style.scss');

export default (angular: ng.IModule) => ((angular || ng.module('markdown', []))
      .directive('markdown', MarkdownDirective)
      .controller('MarkdownController', EditorController)
      .component('markdowneditor', EditorComponent)
);
