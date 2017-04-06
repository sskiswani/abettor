export default class MarkdownEditorController {
   constructor($scope) {
      $scope.onChange = this.updatePreview;
      console.info('hi?', $scope);
   }

   updatePreview() {
      console.info('update preview!');
   }
}
