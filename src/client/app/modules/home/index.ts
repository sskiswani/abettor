import * as angular from 'angular';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';

angular.module('app')
   .config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state('home', {
         url: '',
         template: '<home></home>'
      });
   })
   .component('home', {
      template: require<string>('./home.html')
   });
