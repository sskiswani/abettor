import * as angular from 'angular';
import markdown from 'common/modules/Markdown';

export default angular
   .module('notes.components', [markdown])
   .name;

import './Card';
import './EditLabel';
import './NoteCard';
