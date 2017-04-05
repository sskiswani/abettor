import * as ng from 'angular';
import MarkdownDirective from './preview.directive';

export default (angular: ng.IModule) => {
   return MarkdownDirective(angular || ng.module('markdown', []));
};
