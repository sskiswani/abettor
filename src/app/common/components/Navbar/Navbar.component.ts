import {IComponentOptions} from 'angular';
import NavbarController from './Navbar.controller';
import './navbar.scss';
require('./navbar.scss');
const template = require('./navbar.html');

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
