import { IScope } from 'angular';
import { AudioService } from './AudioService';

export default class SynthController {
   public frequency = 1;
   public get isPlaying() { return this._isPlaying; }
   public get gain() { return parseFloat(this.$audioService.gain.toFixed(2)); }
   public set gain(value) { this.$audioService.gain = parseFloat(value.toFixed(2)); }

   private $audioService: AudioService;
   private $scope: IScope;
   private _isPlaying = false;

   constructor($audioService: AudioService, $scope: IScope) {
      this.$audioService = $audioService;
      this.$scope = $scope;
   }


   play() {
      if (this._isPlaying) { return; }
      console.info('play!');
      this._isPlaying = true;

      const { context, masterVolume } = this.$audioService;
      const osc = context.createOscillator();
      const osc2 = context.createOscillator();

      osc.frequency.value = 440;
      osc.type = 'square';
      osc.detune.value = 20;

      // osc2.frequency.value = this.frequency;
      // osc2.type = 'triangle';
      // osc2.detune.value = 10;

      osc.connect(masterVolume);
      // osc2.connect(masterVolume);

      masterVolume.connect(context.destination);

      this.$audioService.oscillators.set(this.frequency, [osc, osc2]);
      // this.$audioService.oscillators[frequency] = [osc, osc2];

      osc.start(context.currentTime);
      osc2.start(context.currentTime);
   }

   stop() {
      if (!this._isPlaying) { return; }
      console.info('stop!');
      this._isPlaying = false;
      this.$audioService.oscillators.get(this.frequency)
         .forEach((osc) => {
            osc.stop(this.$audioService.context.currentTime);
         });
   }
}
