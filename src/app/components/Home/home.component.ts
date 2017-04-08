import { IComponentOptions } from 'angular';
import HomeController from './home.controller';
const template = require('./home.html');
import './home.scss';


export default {
   restrict: 'E',
   bindings: {},
   template,
   controller: HomeController
} as IComponentOptions;
