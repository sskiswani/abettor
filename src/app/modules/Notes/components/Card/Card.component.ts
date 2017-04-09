import CardController from './Card.controller';
const template = require('./card.html');
import './card.scss';

export default {
   bindings: {
      title: '<?',
      subtitle: '<?'
   },
   transclude: {
      headerSlot: '?header',
      contentSlot: '?content',
      footerSlot: '?footer'
   },
   template,
   controller: CardController,
};
