import 'reflect-metadata';

/**
 * Column decorator used to check a specific class or method can be accessed by the logged in user.
 */
export function GrantedWith(role: string | string[]) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {

    console.log('target: ', target);
    console.log('propertyKey: ', propertyKey);
    console.log('descriptor: ', descriptor);


    if (descriptor) {
      // Se for um metodo, modifica o comportamento do metodo
      const originalMethod = descriptor.value;
      descriptor.value = function (...args: any[]) {
        const {currentUser} = args[0]
        console.log('descriptor: ', this);
        console.log('args: ', currentUser);

        if (!currentUser) {
          throw new Error(`Access denied to method. Required role: ${role}`);
        }

        // @ts-ignore
        // const userRole = this.userRole;
        //
        // if (userRole !== role) {
        //   throw new Error(`Access denied to method. Required role: ${role}`);
        // }

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


// export function GrantedWith(role: string) {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//
//     descriptor.value = function (...args: any[]) {
//       // Lógica de controle de acesso baseada no role
//       // @ts-ignore
//       const userRole = this.userRole; // Você pode pegar o role do contexto do usuário aqui
//
//       if (userRole !== role) {
//         throw new Error(`Access denied. Required role: ${role}`);
//       }
//
//       // Executa o método original se a permissão for concedida
//       return originalMethod.apply(this, args);
//     };
//
//     return descriptor;
//   };
// }
//
// export function GrantedWith(role: string) {
//   return function (constructor: Function) {
//     // Aqui você pode armazenar ou modificar a classe como necessário
//     Reflect.defineMetadata('role', role, constructor);
//
//     // Sobrescreve ou modifica métodos da classe, se necessário
//     const original = constructor.prototype;
//
//     // Sobrescreve a função de inicialização (constructor)
//     const newConstructor: any = function (...args: any[]) {
//       const instance = new constructor(...args);
//       instance.requiredRole = role;
//       return instance;
//     };
//
//     newConstructor.prototype = original;
//     return newConstructor;
//   };
// }