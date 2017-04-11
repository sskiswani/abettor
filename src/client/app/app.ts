import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import AppConfig from './app.config';
import AppController from './app.controller';
import './app.scss';
import common from './common';
import './common/components';
import Markdown from './common/modules/markdown';
import { LocalStorageProvider } from './services/LocalStorageProvider';

const app = angular
   .module('app', [(<string><any>uiRouter), Markdown, common])
   .config((config, $stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state({
         name: 'todo',
         url: '/todo',
         template: '<h1>TODO</h1>'
      });

      $stateProvider.state('home', {
         url: '',
         template: '<h1>welcome home</h1>'
      });

      $urlRouterProvider.otherwise('/');
   })
   .constant('config', AppConfig)
   .provider('$localStorage', LocalStorageProvider)
   .controller('appController', AppController)
   .directive('app', () => ({
      restrict: 'AE',
      template: require<string>('./app.html'),
      controller: AppController
   }));

export { app }
export default (app.name);

