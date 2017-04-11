import * as marked from 'marked';

export default class MarkdownProvider {
   public renderer: MarkedRenderer;
   public options: MarkedOptions = {
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: true,
      smartLists: true,
      smartypants: true
   };

   public setRenderer(renderer: MarkedRenderer) {
      this.renderer = renderer;
   }

   public setOptions(opts: MarkedOptions) {
      Object.assign(this.options, opts);
   }

   public $get() {
      this.options.renderer = this.renderer || new marked.Renderer();
      return marked.setOptions(this.options);
   }

}
