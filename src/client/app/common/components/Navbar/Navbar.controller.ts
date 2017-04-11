import { IScope } from 'angular';

export interface INavItem {
   label?: string;
   href?: string;
}

export default class NavbarController {
   public brand = '';
   public items: INavItem[] = [];
   public scope: IScope;

   /* @ngInject */
   constructor($scope: IScope) {
      this.scope = $scope;
   }
}
