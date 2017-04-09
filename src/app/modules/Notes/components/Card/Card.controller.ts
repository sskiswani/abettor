export default class CardController {
   public title?: string;
   public subtitle?: string;

   public content?: string;
   public footer?: string;

   public $transclude;
   public haveSlot: (name: string) => boolean;

   public get haveHeader() {
      return !!(this.title || this.subtitle) || this.haveSlot('headerSlot');
   }

   public get haveContent() {
      return this.haveSlot('contentSlot') || !!this.content;
   }
   public get haveFooter() {
      return this.haveSlot('footerSlot') || !!this.footer;
   }

   constructor($transclude) {
      this.haveSlot = $transclude.isSlotFilled;
   }
}
