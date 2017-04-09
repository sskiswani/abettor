import * as angular from 'angular';
import uiRouter = require('angular-ui-router');
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import components from './components';
import NotesComponent from './Notes.component';

const notes = angular
   .module('notes', [
      (uiRouter as any),
      components
   ])
   .component('notes', NotesComponent)
   .config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state('notes', {
         url: '/notes',
         template: '<notes></notes>'
      });
   });

export default notes;
