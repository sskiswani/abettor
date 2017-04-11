import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import AppController from './app.controller';
import './app.scss';
import Markdown from './common/modules/markdown';
import { LocalStorageProvider } from './services/LocalStorageProvider';

const app = angular
   .module('app', [
      uiRouter,
      Markdown
   ])
   .provider('$localStorage', LocalStorageProvider)
   // .config(($localStorage: LocalStorageProvider) => {
   //    // $localStorage.prefix =
   // })
   .controller('appController', AppController)
   .component('app', {
      template: require<string>('./app.html'),
      controller: AppController
   });

export { app }
export default (app.name);

