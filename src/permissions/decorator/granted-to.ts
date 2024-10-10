import 'reflect-metadata';
import NotAllowed from "../../exceptions/not-allowed";
import {appDataSource} from "../../database/datasource";

/**
 * Usado para checar a permissão de acesso a um metodo especifico ou classe.
 *
 * Requisito: Classe ou metodo precisa estar encapsulado pela autenticação.
 * Atenção: O Uso em classes esta em construcao e ate o momento não esta disponivel.
 *
 * @param role informe a(s) regra(s) que deseja validar, como string ou um array de strings.
 */
export function GrantedTo(role: string | string[]) {
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    const applyPermissionCheck = async function (this: any, currentUser: any, args: any[], originalMethod: (...args: any[]) => any) {
      const query: string = `
        SELECT DISTINCT p.chave as chave
        FROM tb_permissoes as p
        LEFT JOIN tb_grupos_permissoes as g ON g.id_permissao = p.id
        LEFT JOIN tb_usuarios_grupos as u ON u.id_grupo = g.id_grupo
        LEFT JOIN tb_usuarios_permissoes as pp ON pp.id_permissao = p.id
        WHERE u.id_usuario = ${currentUser.id} OR pp.id_usuario = ${currentUser.id};
      `;

      const permissions: any[] = await appDataSource.query(query);

      if (!currentUser) {
        throw new NotAllowed(`Acesso negado, usuário não identificado.`);
      }

      const hasPermission = permissions.some(p =>
        typeof role === 'string' ? p.chave === role : role.includes(p.chave)
      );

      if (!hasPermission) {
        throw new NotAllowed(`Acesso negado, usuário não possui permissão de acesso ao recurso.`);
      }

      if (originalMethod) {
        return originalMethod.apply(this, args); // Uso de 'this' com tipo anotado
      }
    };

    if (descriptor) {
      console.log('method');
      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any[]) {
        const {currentUser} = args[0];
        return await applyPermissionCheck.call(this, currentUser, args, originalMethod);
      };

      return descriptor;
    } else {
      console.log('Class');
      Reflect.defineMetadata('role', role, target);

      const originalConstructor = target;

      const newConstructor: any = function (this: any, ...args: any[]) {
        // const {currentUser} = args[0];
        // const currentUser = {id: 1}
        // Verifica a permissão ao instanciar a classe
        // return applyPermissionCheck.call(this, currentUser, args, () => new originalConstructor(...args));
        return new originalConstructor(...args);
      };

      newConstructor.prototype = originalConstructor.prototype;
      return newConstructor;
    }
  };
}

// if (descriptor) {
//   // Se for um metodo, modifica o comportamento do metodo
//   const originalMethod = descriptor.value;
//   descriptor.value = async function (...args: any[]) {
//     const {currentUser} = args[0];
//     const query: string = `
//           SELECT DISTINCT p.chave as chave
//           FROM tb_permissoes as p
//           LEFT JOIN tb_grupos_permissoes as g ON g.id_permissao = p.id
//           LEFT JOIN tb_usuarios_grupos as u ON u.id_grupo = g.id_grupo
//           LEFT JOIN tb_usuarios_permissoes as pp ON pp.id_permissao = p.id
//           WHERE u.id_usuario = ${currentUser.id} OR pp.id_usuario = ${currentUser.id};
//          `;
//     const permissions: any[] = await appDataSource.query(query);
//     if (!currentUser) {
//       throw new NotAllowed(`Acesso negado, usuário não identificado.`);
//     }
//     const hasPermission = permissions.some(p =>
//       typeof role === 'string' ? p.chave === role : role.includes(p.chave)
//     );
//     if (!hasPermission) {
//       throw new NotAllowed(`Acesso negado, usuário não possui permissão ao de acesso ao recurso.`);
//     }
//     return originalMethod.apply(this, args);
//   };
//   return descriptor;
// } else {
//   // Se for uma classe, modifica o comportamento da classe
//   Reflect.defineMetadata('role', role, target);
//   const original = target.prototype;
//   const newConstructor: any = function (...args: any[]) {
//     const instance = new target(...args);
//     instance.requiredRole = role;
//     return instance;
//   };
//   newConstructor.prototype = original;
//   return newConstructor;
// }
// return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
//   const applyPermissionCheck = async function (this: any, currentUser: any, args: any[], originalMethod: (...args: any[]) => any) {
//     const query: string = `
//         SELECT DISTINCT p.chave as chave
//         FROM tb_permissoes as p
//         LEFT JOIN tb_grupos_permissoes as g ON g.id_permissao = p.id
//         LEFT JOIN tb_usuarios_grupos as u ON u.id_grupo = g.id_grupo
//         LEFT JOIN tb_usuarios_permissoes as pp ON pp.id_permissao = p.id
//         WHERE u.id_usuario = ${currentUser.id} OR pp.id_usuario = ${currentUser.id};
//       `;
//
//     const permissions: any[] = await appDataSource.query(query);
//
//     if (!currentUser) {
//       throw new NotAllowed(`Acesso negado, usuário não identificado.`);
//     }
//
//     const hasPermission = permissions.some(p =>
//       typeof role === 'string' ? p.chave === role : role.includes(p.chave)
//     );
//
//     if (!hasPermission) {
//       throw new NotAllowed(`Acesso negado, usuário não possui permissão de acesso ao recurso.`);
//     }
//
//     if (originalMethod) {
//       return originalMethod.apply(this, args); // Uso de 'this' com tipo anotado
//     }
//   };
//   if (descriptor) {
//     console.log('method');
//     const originalMethod = descriptor.value;
//
//     descriptor.value = async function (...args: any[]) {
//       const { currentUser } = args[0];
//       return await applyPermissionCheck.call(this, currentUser, args, originalMethod);
//     };
//
//     return descriptor;
//   }
//   console.log('Class');
//   Reflect.defineMetadata('role', role, target);
//
//   const originalConstructor = target;
//
//   const newConstructor: any = function (this: any, ...args: any[]) {
//     const { currentUser } = args[0];
//
//     // Verifica a permissão ao instanciar a classe
//     return applyPermissionCheck.call(this, currentUser, args, () => new originalConstructor(...args));
//   };
//
//   newConstructor.prototype = originalConstructor.prototype;
//   return newConstructor;
// };