import { IScope } from 'angular';

export default class MarkdownEditorController {
   public src = '# hi';

   /* @ngInject */
   constructor($scope: IScope) {
      $scope.src = this.src;
   }

   keydown($event: KeyboardEvent) {
      let keyCode = $event.keyCode || $event.which;
      let target = $event.target as HTMLTextAreaElement;

      //~ implement tabbing
      if (keyCode === 9) {
         $event.preventDefault();

         //~ splice in the tab
         const { selectionStart, selectionEnd } = target;
         target.value = `${target.value.substring(0, selectionStart)}   ${target.value.substr(selectionEnd)}`;

         //~ move cursor to right side of tab
         target.selectionEnd = (target.selectionStart += 3);
      }
   }
}
