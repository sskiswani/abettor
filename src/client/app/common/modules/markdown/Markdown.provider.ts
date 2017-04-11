import * as hljs from 'highlight.js';
import * as marked from 'marked';

export class MarkdownProvider {
   public renderer: MarkedRenderer;

   public options: MarkedOptions = {
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: true,
      smartLists: true,
      smartypants: true,
      highlight: (code, language) => hljs.highlightAuto(code, [language]).value
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
};
