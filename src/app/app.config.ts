export class AppConfig {
   public name = 'abettor';
   public nav = [
      { label: 'Home', href: 'home' },
      { label: 'Notes', href: 'notes' },
      { label: 'MIDI', href: 'midi' },
      { label: 'About', href: 'about' }
   ];

   constructor() { }

   public addNav(navItem: { label: string, href: string }) {
      this.nav.push(navItem);
   }
}

const appConfig = new AppConfig();

export default appConfig;
