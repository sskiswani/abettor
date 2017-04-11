
export class AudioService {
   public readonly context: AudioContext;
   public readonly masterVolume: GainNode;
   public readonly oscillators: Map<number, OscillatorNode[]> = new Map<number, OscillatorNode[]>();

   public get gain() { return this.masterVolume.gain.value; }
   public set gain(value: number) { this.masterVolume.gain.value = value; }

   constructor() {
      this.context = new AudioContext();
      this.masterVolume = this.context.createGain();
   }
}
