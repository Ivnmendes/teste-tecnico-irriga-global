# API de Gerenciamento de Irrigação

API RESTful desenvolvida em Node.js para gerenciamento de pivôs de irrigação e registros de irrigações aplicadas. O arquivo `.env` foi exposto como público para agilizar o processo de execução pelo avaliador. O projeto foi inteiramente desenvolvido com o `adonis` localmente, no final adicionei como dependência

## Tecnologias Utilizadas

- **Framework:** AdonisJS v4
- **Banco de Dados:** SQLite
- **Autenticação:** JWT (JSON Web Token) e bcryptjs

## Funcionalidades implementadas

- **Banco de Dados Relacional:** Utilização do SQLite com Lucid ORM e Migrations para persistência.
- **Validação de Requisições:** Uso de Validators a nível de rota para garantir a integridade dos dados.
- **Filtros Dinâmicos e Paginação:** Implementação de `query params` para filtragem de valores numéricos por intervalo (mínimo e máximo), busca por pivô específico no model `Irrigation` e paginação na listagem de recursos.
- **Tratamento Global de Exceções:** Padronização das respostas de erro da API, transformando exceções do banco (como `ModelNotFoundException`) em respostas limpas em JSON com status HTTP adequados.
- **Autenticação:** Sistema de registro e login implementado com JWT.
- **Rotas de CRUD:** Implementação das rotas padrões de CRUD tanto para `Pivot` quanto para `Irrigation`.
- **Segurança de Rotas:** Rotas protegidas por autenticação.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (foi utilizado o node `18.19.1`) instalado na máquina.

### Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/Ivnmendes/teste-tecnico-irriga-global
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Execute as Migrations para criar a estrutura do banco:

    ```bash
    npm run migration:run
    ```

4. Inicie o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

A aplicação estará rodando em `http://localhost:3333`.

## Documentação dos Endpoints

Todas as rotas da aplicação (exceto as de autenticação) exigem o envio de um token JWT válido no cabeçalho da requisição: `Authorization: Bearer <seu_token>`.

### Autenticação

`POST /auth/register`: Cria um novo usuário com senha criptografada.

**Exemplo de Payload (POST /auth/register):**

```json
{
  "name": "Ivan Mendes",
  "username": "ivanmendes2005@gmail.com",
  "password": "123456789"
}
```

`POST /auth/login`: Valida as credenciais e retorna o token JWT.

**Exemplo de Payload (POST /auth/login):**

```json
{
  "username": "ivanmendes2005@gmail.com",
  "password": "123456789"
}
```

### Pivôs de Irrigação

`GET /pivots`: Lista todos os pivôs do usuário autenticado. Aceita os query params dinâmicos `page`, `limit` e limites de busca para os valores númericos (FlowRate e MinApplicationDepth) como `minAmountFlowRate`.

`GET /pivots/:id`: Retorna os detalhes de um pivô específico.

`POST /pivots`: Cria um novo pivô.

`PUT /pivots/:id`: Atualiza os dados de um pivô.

`DELETE /pivots/:id`: Remove um pivô.

**Exemplo de Payload (POST /pivots):**

```json
{
  "description": "Pivô Recém Instalado",
  "flowRate": 180.0,
  "minApplicationDepth": 6.0
}
```

### Registros de Irrigação

`GET /irrigations`: Lista todos os registros de irrigação do usuário autenticado.

`GET /irrigations/:id`: Obtém um registro específico.

`POST /irrigations`: Cria um novo registro. O sistema valida automaticamente se o `pivotId` pertence ao usuário logado  e registra o `irrigationDate` com o timestamp atual do servidor.

`DELETE /irrigations/:id`: Remove um registro de irrigação.

**Exemplo de Payload (POST /irrigations):**

```json
{
  "pivotId": "UUID_DO_PIVO",
  "applicationAmount": 20.0
}
```

### Filtros e Paginação (Query Params)

Os endpoints de listagem (`GET /pivots` e `GET /irrigations`) suportam paginação e filtros dinâmicos passados na URL (Query Parameters). Todos os parâmetros são opcionais e podem ser combinados.

**Paginação Global:**

- `page`: Número da página (padrão: 1).
- `limit`: Quantidade de registros por página (padrão: 10).

**Filtros em `/pivots`:**

- `minAmountFlowRate`: Filtra pivôs com vazão maior ou igual ao valor.
- `maxAmountFlowRate`: Filtra pivôs com vazão menor ou igual ao valor.
- `minAmountMinApplicationDepth`: Filtra pivôs com lâmina mínima maior ou igual ao valor.
- `maxAmountMinApplicationDepth`: Filtra pivôs com lâmina mínima menor ou igual ao valor.

*Exemplo de requisição:*
`GET /pivots?page=2&limit=5&minAmountFlowRate=100&maxAmountFlowRate=200`

**Filtros em `/irrigations`:**

- `pivotId`: Filtra as irrigações pertencentes a um pivô específico.
- `minAmountApplicationAmount`: Filtra irrigações com valor aplicado maior ou igual ao valor.
- `maxAmountApplicationAmount`: Filtra irrigações com valor aplicado menor ou igual ao valor.

*Exemplo de requisição:*
`GET /irrigations?pivotId=UUID_DO_PIVO&minAmountApplicationAmount=10&maxAmountApplicationAmount=50`

## Uso de IA no projeto

A documentação do projeto foi totalmente gerada por IA, revisada por mim. Utilizei durante o desenvolvimento para resolver algumas dúvidas pontuais, principalmente em algumas questões de compatibilidade (tive problemas com o `bcrypt` devido a versão do adonis).
