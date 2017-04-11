import { LocalStorageService } from './services/LocalStorageService';
export default class AppController {
   public name = 'app';
   public config = {};

   constructor($localStorage: LocalStorageService) {
      $localStorage.set('hello', { test: 'a' });
   }
}
