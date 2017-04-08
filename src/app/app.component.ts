import AppController from './app.controller';
import './app.scss';

let appComponent = {
   template: require('./app.html'),
   restrict: 'E',
   controller: AppController
};

export default appComponent;
