import * as angular from 'angular';
import common from '../../common.module';
import NavbarController from './Navbar.controller';

export default angular.module(common)
   .controller('navbarController', NavbarController)
   .component('navbar', {
      bindings: {},
      transclude: {
         leftSlot: '?left',
         centerSlot: '?center',
         rightSlot: '?right'
      },
      template: require<string>('./navbar.html'),
      controller: NavbarController
   });
