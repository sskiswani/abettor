import * as angular from 'angular';
import { auto, IModule } from 'angular';

let _module: IModule = null;
let _injector: auto.IInjectorService = null;
let injectorPending = false;

const requestInjector = () => {
   if (_module && !injectorPending) {
      _module.run(['$injector', ($injector) => _injector = $injector]);
      injectorPending = true;
   }
};

export function locate() {
   try {
      if (_module) { return _module; }

      let ngApp = angular.element(document.querySelector('[ng-app]'));
      if (!ngApp.length) { throw new Error("Couldn't locate angular module."); }

      let name = ngApp[0].getAttribute('ng-app');
      return _module = angular.module(name);
   } finally {
      requestInjector();
   }
}

export function use(useModule: IModule) {
   _module = useModule;
   requestInjector();
}

export const injector = () => _injector;

export const getModule = new Promise<IModule>((resolve, reject) => {
   try {
      let appModule = locate();
      requestInjector();
      resolve(appModule);
   } catch (e) {
      let $ngApp = angular.element(document.querySelector('[ng-app]'));

      //~ if ng-app is defined on the DOM, proxy `angular.module` and await its creation.
      if ($ngApp.length) {
         let moduleName = $ngApp[0].getAttribute('ng-app');

         //~ proxy `angular.module` to detect module creation
         const fnModule = angular.module;
         (<any>angular).module = (name, dependencies) => {
            let newModule = fnModule(name, dependencies);

            //~ located?
            if (name === moduleName && dependencies) {
               (<any>angular).module = fnModule;
               _module = newModule;
               requestInjector();
               resolve(newModule);
            }

            return newModule;
         };
      } else {
         reject('Cannot find module!');
      }
   }
});

export default getModule;
