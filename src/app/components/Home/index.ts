import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import markdown from '../../common/modules/Markdown';
import HomeComponent from './home.component';

export const home = angular
   .module('app.home', [
      uiRouter,
      markdown
   ])
   .config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      'ngInject';
      $stateProvider.state('home', {
         url: '/',
         template: '<home></home>'
      });
   })
   .component('home', HomeComponent);

export default (home.name);
