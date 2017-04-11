import * as angular from 'angular';
import {
   IDocumentService,
   ILogService,
   IRootScopeService,
   ITimeoutService,
   IWindowService
} from 'angular';

interface IStorage { [key: string]: any; }

export class LocalStorageService {
   public readonly prefix: string;
   public readonly prefixLength: number;

   private $rootScope: IRootScopeService;
   private $window: IWindowService;
   private $log: ILogService;
   private $timeout: ITimeoutService;
   private $document: IDocumentService;

   private storage: IStorage = {};
   private oldStorage: IStorage;

   constructor(
      $rootScope: IRootScopeService,
      $window: IWindowService,
      $log: ILogService,
      $timeout: ITimeoutService,
      $document: IDocumentService,
      prefix = 'abettor-'
   ) {
      this.$rootScope = $rootScope;
      this.$window = $window;
      this.$log = $log;
      this.$timeout = $timeout;
      this.$document = $document;
      this.prefix = prefix;
      this.prefixLength = this.prefix.length;

      this.pull();
      this.commit();

      $rootScope.$watch(() => { $timeout(this.apply.bind(this), 100, false); });

      $window.addEventListener('storage', (event: StorageEvent) => {
         if (!event.key) { return; }

         const doc = $document[0] || document;
         if ((!doc.hasFocus || !doc.hasFocus()) && this.hasPrefix(event.key)) {
            const key = this.removePrefix(event.key);
            if (event.newValue) {
               this.setValue(key, JSON.parse(event.newValue));
            } else {
               this.delete(key);
            }

            this.commit();
            $rootScope.$apply();
         }
      });

      $window.addEventListener('beforeunload', () => { this.apply(); });
   }

   public hasPrefix(key: string) {
      return this.prefix === key.slice(0, this.prefixLength);
   }

   public delete(key: string) {
      delete this.storage[key];
   }

   public setValue(key: string, value) {
      this.oldStorage[key] = this.storage[key];
      this.storage[key] = value;
   }

   public getValue<T>(key: string): T;
   public getValue<T>(key: string, defaultValue?: T) {
      return this.storage[key] as T || defaultValue;
   }

   public clear() {
      for (let key in this.storage) {
         delete this.storage[key];
         localStorage.removeItem(this.prefix + key);
      }
   }

   public apply() {
      if (!angular.equals(this.storage, this.oldStorage)) {
         this.push();
      }
   }

   private commit() {
      this.oldStorage = angular.copy(this.storage);
   }

   private removePrefix(key: string) {
      return key.slice(this.prefixLength);
   }

   private pull() {
      if (!this.storage) { this.storage = {}; }
      for (let i = 0; i < localStorage.length; ++i) {
         let key = localStorage.key(i);
         if (this.hasPrefix(key)) {
            this.storage[this.removePrefix(key)] = JSON.parse(localStorage.getItem(key));
         }
      }
   }

   private push() {
      for (let key in this.storage) {
         if (this.storage[key]) {
            localStorage.setItem(this.prefix + key, JSON.stringify(this.storage[key]));
         }
      }
   }
}

