
interface INavItem {
   label?: string;
   href?: string;
}


export default class AppController {
   public name = 'app';
   public nav: INavItem[] = [];
   public config = {};

   constructor(config) {
      Object.assign(this.config, config);

      this.name = config.name;
      this.nav = config.nav;

      console.info(this);
   }
}
