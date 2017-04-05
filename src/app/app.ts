import * as ng from 'angular';

const app = ng.module('app', [])
   .directive('markdown', MarkdownDirective);

export default app;
