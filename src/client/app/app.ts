import * as angular from 'angular';
import * as uiRouter from 'angular-ui-router';
import AppConfig from './app.config';
import AppController from './app.controller';
import './app.scss';
import common from './common';
import './common/components';
import Markdown from './common/modules/markdown';
import { LocalStorageProvider } from './services/LocalStorageProvider';

const app = angular
   .module('app', [uiRouter, Markdown, common])
   .constant('config', AppConfig)
   .provider('$localStorage', LocalStorageProvider)
   .controller('appController', AppController)
   .component('app', {
      replace: true,
      template: require<string>('./app.html'),
      controller: AppController
   } as any);

export { app }
export default (app.name);

