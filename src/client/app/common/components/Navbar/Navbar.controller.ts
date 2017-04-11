import { ITranscludeFunction } from 'angular';

export default class NavbarController {
   public haveSlot: (name: string) => boolean;
   public get haveLeft() { return this.haveSlot('leftSlot'); }
   public get haveCenter() { return this.haveSlot('centerSlot'); }
   public get haveRight() { return this.haveSlot('rightSlot'); }

   constructor($transclude: ITranscludeFunction) {
      this.haveSlot = $transclude.isSlotFilled;
   }
}
