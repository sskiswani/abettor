import * as angular from 'angular';
import 'angular-ui-router';
import appComponent from './app.component';
import common from './common';
import markdown from './common/modules/Markdown';

export default angular.module('app', [
   common.name,
   markdown.name,
   'ui.router'
]).config(($stateProvider) => {
   const helloState = {
      name: 'hello',
      url: '/hello',
      template: '<h3>hello world!</h3>'
   };

   const aboutState = {
      name: 'about',
      url: '/about',
      template: '<h3>Its the UI-Router hello world app!</h3>'
   };

   $stateProvider.state(helloState);
   $stateProvider.state(aboutState);
}).component('app', appComponent);

import './common/components/Navbar';
import './common/components/Sidebar';
