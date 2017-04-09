import * as angular from 'angular';
import notesComponents from '../';
import NoteCard from './NoteCard.component';

angular
   .module(notesComponents)
   .component('noteCard', NoteCard);
