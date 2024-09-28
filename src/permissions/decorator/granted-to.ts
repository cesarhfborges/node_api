import 'reflect-metadata';
import NotAllowed from "../../exceptions/not-allowed";

/**
 * Usado para checar a permissão de acesso a um metodo especifico ou classe.
 *
 * Requisito: Classe ou metodo precisa estar encapsulado pela autenticação.
 * Atenção: O Uso em classes esta em construcao e ate o momento não esta disponivel.
 */
export function GrantedTo(role: string) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    if (descriptor) {
      // Se for um metodo, modifica o comportamento do metodo
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const {currentUser} = args[0];
        if (!currentUser || currentUser.tipo !== role) {
          throw new NotAllowed(`Acesso negado, usuário não possui permissão ao ce acesso ao recurso.`);
        }
        return originalMethod.apply(this, args);
      };
      return descriptor;
    } else {
      // Se for uma classe, modifica o comportamento da classe
      Reflect.defineMetadata('role', role, target);
      const original = target.prototype;
      const newConstructor: any = function (...args: any[]) {
        const instance = new target(...args);
        instance.requiredRole = role;
        return instance;
      };
      newConstructor.prototype = original;
      return newConstructor;
    }
  };
}