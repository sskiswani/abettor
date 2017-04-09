import EditLabelController from './EditLabel.controller';
import './editLabel.scss';
const template = require('./editLabel.html');

export default {
   bindings: {
      disable: '<',
      value: '<',
      type: '@?',
      onUpdate: '&'
   },
   template,
   controller: EditLabelController
};
