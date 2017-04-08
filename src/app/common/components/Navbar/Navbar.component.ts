import {IComponentOptions} from 'angular';
// import NavbarController from './Navbar.controller';

export default {
   restrict: 'E',
   bindings: {},
   transclude: true,
   template: require('./Navbar.html')
} as IComponentOptions;
