import { IScope } from 'angular';

export class InstrumentEditorController {
   public readonly oscillatorTypes = ['sine', 'square', 'sawtooth', 'triangle'];

   constructor($scope: IScope) {
      $scope.oscillatorTypes = this.oscillatorTypes;
   }
}
