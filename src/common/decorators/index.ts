export function enumerable(value = true) {
   return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      if (descriptor.enumerable !== value) {
         descriptor.enumerable = value;
         Object.defineProperty(target, propertyKey, descriptor);
      }
   };
}
