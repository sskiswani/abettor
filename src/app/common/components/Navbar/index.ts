import NavbarComponent from './Navbar.component';
import NavbarController from './Navbar.controller';

import common from '../../common.module';
export default common.component('navbar', NavbarComponent)
   .controller('navbarController', NavbarController);
