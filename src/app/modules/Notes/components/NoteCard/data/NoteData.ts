export class NoteData {
   public date: Date = new Date();
   public entries: string[] = [];

   public get timestamp() {
      return this.date.toString();
   }

   public toString() {
      return `# Cool Note Bro
- note
   - yep
      - its a note
   - cool`;
   }
}
