interface Role {
  group: string;
  roles?: string[]
}


const ROLES: Role[] = [
  {
    group: 'clientes',
    roles: [
      'create',
      'read',
      'update',
      'delete',
    ]
  },
  {
    group: 'produtos',
    roles: [
      'create',
      'read',
      'update',
      'delete',
    ]
  },
];

export default ROLES;