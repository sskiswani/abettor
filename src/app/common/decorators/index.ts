@directive()
export class Test {
   constructor() { }
}


export function directive(opts?) {
   return (constructor: Function) => {
      const proto = constructor.prototype;
      const compileFn = proto.compile || (() => { });

      Object.assign(constructor.prototype, {
         compile() {
            return (...args) => {
               compileFn.apply(this, ...args);
               if (proto.link) { return proto.link.bind(this); }
            };
         }
      });
   };
}
