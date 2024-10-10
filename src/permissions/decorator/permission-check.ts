import {appDataSource} from "../../database/datasource";
import NotAllowed from "../../exceptions/not-allowed";

async function permissionCheck(this: any, role: string | string[], currentUser: any, args: any[], originalMethod: (...args: any[]) => any) {
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
}

export {permissionCheck};