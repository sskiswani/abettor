import * as angular from 'angular';
import { MarkdownDirective } from './Markdown.directive';
import { MarkdownProvider } from './Markdown.provider';
import './styles.scss';

export const markdown = angular
   .module('markdown', [])
   .provider('$marked', MarkdownProvider)
   .directive('markdown', MarkdownDirective);

export default (markdown.name);
