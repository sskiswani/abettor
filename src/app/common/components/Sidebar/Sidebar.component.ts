import { IComponentOptions } from 'angular';
const template = require('./Sidebar.html');
require('./sidebar.scss');

export default {
   restrict: 'E',
   bindings: {},
   transclude: true,
   template
} as IComponentOptions;
