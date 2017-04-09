export default class EditLabelController {
   public disable = false;
   public editMode = false;
   public type?: string;
   public value?: any;
   public onUpdate: Function;

   private valueCopy?: any;

   private elInput: HTMLInputElement;

   constructor($scope, $element, $attrs) {
      if (!this.onUpdate) { this.onUpdate = $scope.onUpdate; }
      this.elInput = $element[0].querySelector('input');
   }

   $onInit() {
      this.valueCopy = this.value;
      if (!this.type) { this.type = 'text'; }
      if (this.disable) { this.editMode = false; }
   }

   reset() {
      this.value = this.valueCopy;
   }

   toggleEditMode() {
      if (this.editMode) {
         this.onUpdate({ value: this.value });
         this.valueCopy = this.value;
         this.editMode = false;
      } else if (!this.disable) {
         this.editMode = true;
         setTimeout(() => {
            this.elInput.focus();
            this.elInput.setSelectionRange(0, this.elInput.value.length);
         });
      }
   }

   click() {
      if (!this.editMode) {
         this.toggleEditMode();
      }
   }

   keydown(event: KeyboardEvent) {
      if (!this.editMode) { return; }

      let keyCode = event.keyCode || event.which;

      if (keyCode === 13) {
         this.toggleEditMode();
      }
   }

   blur(event: FocusEvent) {
      if (this.editMode) { this.toggleEditMode(); }
   }
}
