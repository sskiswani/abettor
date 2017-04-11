export function mixin(ctor: Function, mixinCtors: Function[]) {
   mixinCtors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
         ctor.prototype[name] = baseCtor.prototype[name];
      });
   });
}
