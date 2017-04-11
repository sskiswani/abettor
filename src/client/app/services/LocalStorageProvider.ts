import {
   IDocumentService,
   ILogService,
   IRootScopeService,
   ITimeoutService,
   IWindowService
} from 'angular';
import { LocalStorageService } from './LocalStorageService';

export class LocalStorageProvider {
   public prefix = 'abettor-';
   public $get($rootScope: IRootScopeService,
               $window: IWindowService,
               $log: ILogService,
               $timeout: ITimeoutService,
               $document: IDocumentService
   ) {
      return new LocalStorageService($rootScope, $window, $log, $timeout, $document, this.prefix);
   }
};

export default '$localStorage';
