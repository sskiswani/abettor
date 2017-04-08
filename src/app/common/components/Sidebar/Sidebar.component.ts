import { IComponentOptions } from 'angular';
require('./sidebar.scss');

export default {
   restrict: 'E',
   bindings: {},
   transclude: true,
   template: require('./Sidebar.html')
} as IComponentOptions;
