import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import HomeComponent from './home.component';

export default angular.module('app.home', [uiRouter])
   .component('home', HomeComponent)
   .config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state('home', {
         url: '/',
         component: 'home',
      });
      $urlRouterProvider.otherwise('/');
   });
