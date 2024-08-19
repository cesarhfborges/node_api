const ClientesSchema = {
  nome: {
    type: String,
    required: [true, 'Obrigatório'],
    unique: false,
    index: true,
  },
  sobrenome: {
    type: String,
    required: false,
    default: null
  },
  cpf_cnpj: {
    type: String,
    required: false,
    unique: true,
    default: null
  },
  cep: {
    type: String,
    required: false,
    default: null
  },
  logradouro: {
    type: String,
    required: false,
    default: null
  },
  bairro: {
    type: String,
    required: false,
    default: null
  },
  numero: {
    type: String,
    required: false,
    default: null
  },
  cidade: {
    type: String,
    required: false,
    default: null
  },
  uf: {
    type: String,
    required: false,
    default: null
  },
  telefone: {
    type: String,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
};

export default ClientesSchema;