import * as angular from 'angular';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import { AudioService } from './AudioService';
import './style.scss';
import SynthController from './Synth.controller';

angular.module('app')
   .config(($stateProvider: IStateProvider, $urlRouterProvider: IUrlRouterProvider) => {
      $stateProvider.state('synth', {
         url: '/synth',
         template: '<synth></synth>'
      });
   })
   .factory('$audioService', () => new AudioService())
   .component('synth', {
      template: require<string>('./synth.html'),
      controller: SynthController
   });
