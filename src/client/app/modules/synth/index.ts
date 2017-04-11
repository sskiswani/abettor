import * as angular from 'angular';
import { IStateProvider, IUrlRouterProvider } from 'angular-ui-router';
import { AudioService } from './AudioService';
import {InstrumentEditorController} from './InstrumentEditor.controller';
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
   })
   .component('instrumentEditor', {
      template: require<string>('./instrumentEditor.html'),
      controller: InstrumentEditorController
   });
