import {IComponentOptions} from 'angular';
import NavbarController from './Navbar.controller';
const template = require('./Navbar.html');

export default {
   restrict: 'E',
   bindings: {
      brand: '<',
      items: '='
   },
   transclude: true,
   template,
   controller: NavbarController
} as IComponentOptions;
