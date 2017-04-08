import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import common from './common';
import markdown from './common/modules/Markdown';
import Home from './components/Home';

const app = angular.module('app', [
   uiRouter,
   Home,
   markdown,
   common
]);

import AppConfig from './app.config';
app.constant('config', AppConfig)
   .config((config, $stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state({
         name: 'midi',
         url: '/midi',
         template: '<h1>TODO</h1>'
      });
      $stateProvider.state('about', {
         url: '/about',
         template: '<h1>TODO</h1>'
      });

      $urlRouterProvider.otherwise('/');
   });

import AppComponent from './app.component';
import AppController from './app.controller';
app.component('app', AppComponent)
   .controller('appController', AppController);

//~ include common components
import './common/components';
