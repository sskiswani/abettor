import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import common from './common';
import markdown from './common/modules/Markdown';
import Home from './components/Home';

const app = angular
   .module('app', [
      uiRouter,
      Home,
      markdown,
      common
   ]).config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state('hello', {
         url: '/hello',
         template: '<h3>hello world!</h3>'
      });

      $stateProvider.state('about', {
         url: '/about',
         template: '<h3>Its the UI-Router hello world app!</h3>'
      });

      $urlRouterProvider.otherwise('/');
   });

import AppComponent from './app.component';
import AppConfig from './app.config';
import AppController from './app.controller';

app.constant('config', AppConfig)
   .component('app', AppComponent)
   .controller('appController', AppController);

//~ include common components
import './common/components';
