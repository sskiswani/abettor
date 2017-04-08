
/**
 * @example
 *  import {inject} from './decorators';
 *  @Inject('$scope', '$http')
 *  class MyController {
 *    constructor($scope, $http) {
 *      this.$scope = $scope;
 *      this.$http = $http;
 *    }
 *  }
 *
 *  class MyOtherController {
 *    @inject $http = null;
 *    @inject MyService = null;
 *    doSomething () {
 *      this.MyService.doServiceTask();
 *    }
 *  }
 */
export function Inject(...inject: Array<string | Object>): any {
   if (typeof inject[0] === 'string') {
      return (target) => { target.$inject = [...(target.$inject || []), ...inject]; };
   }

   let { constructor } = inject[0] as Object;
   (<any>constructor).$inject = [...(constructor.$inject || []), inject[1]];
}
