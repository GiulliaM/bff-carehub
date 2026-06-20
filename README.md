# CareHub — Backend (bff-carehub)

API REST do **CareHub**, um aplicativo de apoio ao cuidado de entes queridos/pacientes.
Conecta **familiares**, **cuidadores** e **administradores**, gerenciando pacientes, rotina
(tarefas e medicamentos), diário de cuidados, histórico médico, vínculos por código e
perfis profissionais de cuidadores.

> App mobile correspondente: **[fed-carehub](../fed-carehub)** (React Native + Expo).

---

## 🧱 Stack

- **Node.js** + **Express 4** (ES Modules)
- **MySQL** via **mysql2** (pool, estilo callback)
- **JWT** (`jsonwebtoken`) para autenticação
- **bcrypt** para hash de senhas
- **multer** (upload em memória) + **sharp** (processamento de imagem) para fotos
- **dotenv** para configuração

---

## 📁 Estrutura

```
bff-carehub/
├── src/
│   ├── app.js                 # configura o Express, CORS, middlewares e monta as rotas
│   ├── server.js              # carrega .env e sobe o servidor
│   ├── config/
│   │   └── db.js              # pool de conexão MySQL
│   ├── middleware/
│   │   ├── middlewareAutenticacao.js     # valida o JWT (Bearer)
│   │   ├── middlewareAdmin.js            # exige usuário admin
│   │   └── middlewareCuidadorAprovado.js # barra cuidador não aprovado nas rotas de dados
│   ├── controllers/           # regra de entrada das rotas
│   ├── models/                # acesso ao banco (queries)
│   ├── routes/                # definição de endpoints
│   └── utils/
│       └── validarCPF.js
├── migrations/                # scripts de migração do banco
├── uploads/                   # fotos enviadas (servidas em /uploads)
├── banco.sql                  # schema completo do banco (referência)
└── package.json
```

---

## ⚙️ Configuração

Crie um arquivo **`.env`** na raiz do `bff-carehub/` (ou em `src/.env`):

```env
# Banco de dados
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=carehub

# Autenticação
JWT_SECRET=uma_chave_secreta_bem_grande

# URLs / servidor
PORT=3000
BASE_URL=http://localhost:3000   # usado para montar URLs de fotos
NODE_ENV=development
```

| Variável     | Descrição                                              |
|--------------|--------------------------------------------------------|
| `DB_HOST`    | Host do MySQL                                           |
| `DB_USER`    | Usuário do MySQL                                        |
| `DB_PASS`    | Senha do MySQL                                          |
| `DB_NAME`    | Nome do banco                                           |
| `JWT_SECRET` | Segredo para assinar/validar os tokens JWT             |
| `PORT`       | Porta HTTP (padrão `3000`)                              |
| `BASE_URL`   | Base usada para compor URLs públicas das fotos         |
| `NODE_ENV`   | `development` expõe detalhes de erro; `production` oculta |

### Banco de dados

O schema completo está em **`banco.sql`**. Para criar o banco do zero:

```bash
mysql -u root -p -e "CREATE DATABASE carehub CHARACTER SET utf8mb4;"
mysql -u root -p carehub < banco.sql
```

---

## ▶️ Como rodar

```bash
npm install

# desenvolvimento (reinicia ao salvar — node --watch)
npm run dev

# produção
npm start
```

Servidor sobe em `http://localhost:3000`. Healthcheck: `GET /` → `{ "message": "CareHub API OK" }`.

---

## 🔐 Autenticação

A maioria das rotas exige o header:

```
Authorization: Bearer <token>
```

O token é obtido em `POST /api/usuarios/login`. Tipos de usuário: **familiar**, **cuidador** e **admin**.

- `middlewareAutenticacao` — valida o JWT e injeta `req.user`.
- `middlewareCuidadorAprovado` — bloqueia cuidadores com perfil **não aprovado** nas rotas de
  dados (pacientes, tarefas, medicamentos, diário, vínculos, grupo, vacinas). Familiares e admins passam direto.
- `middlewareAdmin` — restringe as rotas `/api/admin` a administradores.

---

## 🌐 Endpoints (visão geral)

Todas as rotas têm o prefixo **`/api`**.

### Usuários — `/api/usuarios`
| Método | Rota                    | Descrição                          |
|--------|-------------------------|------------------------------------|
| POST   | `/cadastro`             | Cria conta                         |
| POST   | `/login`                | Login (retorna JWT)                |
| GET    | `/perfil/:id`           | Dados do usuário                   |
| PATCH  | `/:id`                  | Atualiza dados                     |
| PATCH  | `/seguranca/senha`      | Altera senha                       |
| POST   | `/:id/foto`             | Upload de foto de perfil           |
| POST   | `/push-token`           | Registra token de push             |

### Pacientes — `/api/pacientes` *(cuidador aprovado)*
| Método | Rota                          | Descrição                       |
|--------|-------------------------------|---------------------------------|
| GET/POST | `/`                         | Lista / cria paciente           |
| GET/PATCH/DELETE | `/:id`              | Detalhe / atualiza / remove     |
| GET    | `/:id/historico-medico`       | Histórico médico do paciente    |
| PATCH  | `/:id/historico-medico`       | Atualiza o histórico médico     |

### Outros dados *(cuidador aprovado)*
- `/api/tarefas` — tarefas da rotina
- `/api/medicamentos` — medicamentos e agenda
- `/api/diario` — diário de cuidados
- `/api/vinculos` — convites por código de 6 dígitos (familiar ↔ cuidador)
- `/api/grupo` — membros do grupo de cuidado
- `/api/vacinas` — vacinas do paciente

### Cuidadores — `/api/cuidador` e `/api/cuidadores`
| Método | Rota         | Descrição                                  |
|--------|--------------|--------------------------------------------|
| GET    | `/perfil`    | Perfil profissional do cuidador logado     |
| POST   | `/perfil`    | Cria/atualiza perfil (entra como pendente) |
| GET    | `/busca`     | Busca pública de cuidadores **aprovados** (filtros: especialidade, cidade, bairro) |

### Conteúdo — `/api/artigos`
Artigos/dicas educativas.

### Admin — `/api/admin` *(somente admin)*
| Método | Rota                     | Descrição                                            |
|--------|--------------------------|------------------------------------------------------|
| GET    | `/stats`                 | Métricas (usuários, familiares, cuidadores, pacientes, validações) |
| GET    | `/usuarios`              | Lista usuários (filtro `?tipo=`)                     |
| GET    | `/familiares`            | Familiares **com seus pacientes vinculados**         |
| GET    | `/cuidadores`            | Lista cuidadores (filtro `?status=`)                 |
| GET    | `/cuidadores/:id`        | Detalhe do cuidador + verificação de dados           |
| PATCH  | `/cuidadores/:id/status` | Aprova ou rejeita o perfil do cuidador               |

---

## 🗃️ Modelo de dados (principais tabelas)

- **usuarios** — contas (familiar/cuidador; admin via tipo)
- **pacientes** — pessoa cuidada / ente querido
- **grupo_cuidado** — vincula usuários a pacientes (papel: dono/familiar/cuidador)
- **tarefas** / **tarefa_responsaveis** — rotina e responsáveis
- **medicamentos** — medicação e agenda
- **diario_registros** / **diario_itens** — diário de cuidados
- **perfil_cuidadores** — perfil profissional (bio, especialidades, CPF, status de validação)
- **historico_medico** — histórico clínico (1 por paciente)
- **convites_vinculo** — códigos de 6 dígitos para vínculo
- **artigos**, **vacinas**

> Detalhes completos (colunas, índices e FKs) em [`banco.sql`](./banco.sql).

---

## 📝 Notas

- As fotos enviadas ficam em `uploads/` e são servidas estaticamente em `/uploads`.
- Limite de upload: **50 MB** por arquivo.
- O fuso do pool MySQL está fixado em `-03:00`.
