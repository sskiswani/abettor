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

   private readonly $rootScope: IRootScopeService;
   private readonly $window: IWindowService;
   private readonly $log: ILogService;
   private readonly $timeout: ITimeoutService;
   private readonly $document: Document;

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
      this.$document = $document ? $document[0] : document;
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
               this.set(key, JSON.parse(event.newValue));
            } else {
               this.delete(key);
            }

            this.commit();
            $rootScope.$apply();
         }
      });

      $window.addEventListener('beforeunload', () => { this.apply(); });
   }

   public delete(key: string) { return delete this.storage[key]; }
   public has(key: string) { return key in this.storage; }

   public get(key: string): any;
   public get<T>(key: string): T;
   public get<T>(key: string, defaultValue?: T): T | undefined {
      return this.storage[key] as T || defaultValue;
   }

   public set(key: string, value: any): this {
      this.oldStorage[key] = this.storage[key];
      this.storage[key] = value;
      return this;
   }

   public get entries() { return this.storage; }
   public get keys() { return Object.keys(this.storage); }
   public get values() { return Object.values(this.storage); }

   public clear() {
      for (let key in this.storage) {
         delete this.storage[key];
         localStorage.removeItem(this.prefix + key);
      }
   }

   public get size(): number { return Object.keys(this.storage).length; }

   public hasPrefix(key: string) {
      return this.prefix === key.slice(0, this.prefixLength);
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

