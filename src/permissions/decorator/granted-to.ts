import 'reflect-metadata';
import NotAllowed from "../../exceptions/not-allowed";

/**
 * Column decorator used to check a specific class or method can be accessed by the logged in user.
 */
export function GrantedTo(role: string) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
      // Se for um metodo, modifica o comportamento do metodo
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const {currentUser} = args[0];
        if (!currentUser || currentUser.tipo !== role) {
          throw new NotAllowed(`Access denied to method. Required role: ${role}`);
        }
        return originalMethod.apply(this, args);
      };

      return descriptor;
    } else {
      // Se for uma classe, modifica o comportamento da classe
      Reflect.defineMetadata('role', role, target);

      const original = target.prototype;

      const newConstructor: any = function (...args: any[]) {
        console.log(args);


        const instance = new target(...args);
        instance.requiredRole = role;
        return instance;
      };

      newConstructor.prototype = original;
      return newConstructor;
    }
  };
}