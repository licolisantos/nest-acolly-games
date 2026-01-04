# Acolly Games - API Backend

![NestJS](https://img.shields.io/badge/NestJS-11.0-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green)

API Backend profissional para gerenciamento de Loja de Games com autenticação pronta, DTOs, autorização por role e integração RAWG.

## 📋 Requisitos

- Node.js 18+
- npm ou yarn
- MySQL 8.0+
- RAWG API Key (opcional)

## 🚀 Instalação

```bash
npm install
npm run build
npm run start
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=loja_games
RAWG_API_KEY=YOUR_API_KEY
PORT=3000
```

## 📚 Recursos

### ✅ Entidades

- **Categoria** - Categorias de jogos
- **Produto** - Produtos da loja
- **Usuário** - Usuários do sistema (ADMIN / USER)

### 🔌 Endpoints Públicos

```
GET    /categorias
GET    /categorias/:id
GET    /categorias/nome/:nome
GET    /produtos
GET    /produtos/:id
GET    /produtos/nome/:nome
GET    /rawg/games
GET    /rawg/games/search?nome=
GET    /rawg/games/:id
```

### 🔒 Endpoints Protegidos (ADMIN)

```
POST   /categorias
PUT    /categorias/:id
DELETE /categorias/:id
POST   /produtos
PUT    /produtos/:id
DELETE /produtos/:id
POST   /produtos/import/rawg
```

### 🏛️ Arquitetura

```
src/
├── categoria/
│   ├── controller/
│   ├── services/
│   ├── entities/
│   ├── dto/
│   └── categoria.module.ts
├── produto/
│   ├── controller/
│   ├── services/
│   ├── entities/
│   ├── dto/
│   └── produto.module.ts
├── usuario/
│   ├── entities/
│   ├── enums/role.enum.ts
│   └── dto/
├── rawg/
│   ├── controller/
│   ├── services/
│   └── rawg.module.ts
├── common/
│   ├── guards/roles.guard.ts
│   ├── decorators/roles.decorator.ts
│   └── dto/api-response.dto.ts
└── app.module.ts
```

## 🎯 Novidades v2.0

- ✨ DTOs completos (Create, Update, Response)
- 🔐 Autorização por Role (ADMIN / USER)
- 📦 Envelope padrão para respostas
- 🎮 Importação controlada de jogos da RAWG
- 📝 Tipagem forte com TypeScript
- 🛡️ Validação com class-validator

## 📖 Exemplos de Uso

### Criar Categoria (ADMIN)

```bash
curl -X POST http://localhost:3000/categorias \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ação","descricao":"Jogos de ação"}'
```

### Listar Produtos

```bash
curl http://localhost:3000/produtos
```

### Importar Jogo da RAWG (ADMIN)

```bash
curl -X POST http://localhost:3000/produtos/import/rawg \
  -H "Content-Type: application/json" \
  -d '{
    "rawgId": 3328,
    "preco": 79.90,
    "estoque": 10,
    "categoria_id": 1
  }'
```

## 🧪 Testes

Use Insomnia ou Postman. Coleção incluída em `Insomnia_Collection.json`.

## 📝 Resposta Padrão

```json
{
  "data": {...},
  "message": "Sucesso",
  "timestamp": "2026-01-04T15:00:00.000Z"
}
```
DB_PASSWORD=
DB_NAME=loja_games
RAWG_API_KEY=YOUR_RAWG_API_KEY_HERE
PORT=3000
```

Obtenha sua chave RAWG em: [https://rawg.io/apidocs](https://rawg.io/apidocs)

## 🏃 Executar

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run build
npm run start:prod
```

## 📦 Endpoints

### Categoria
- `GET /categorias` - Listar todas
- `GET /categorias/:id` - Buscar por ID
- `GET /categorias/nome/:nome` - Buscar por nome
- `POST /categorias` - Criar
- `PUT /categorias` - Atualizar
- `DELETE /categorias/:id` - Deletar

### Produto
- `GET /produtos` - Listar todas
- `GET /produtos/:id` - Buscar por ID
- `GET /produtos/nome/:nome` - Buscar por nome
- `POST /produtos` - Criar
- `PUT /produtos` - Atualizar
- `DELETE /produtos/:id` - Deletar

### RAWG API
- `GET /rawg/games?pageSize=20` - Listar jogos
- `GET /rawg/games/search?nome=` - Buscar por nome
- `GET /rawg/games/:id` - Buscar por ID

## 🧪 Testes

Importe o arquivo `Insomnia_Collection.json` no Insomnia para testar todos os endpoints.

## 🏗️ Arquitetura

```
src/
├── categoria/
│   ├── controller/
│   ├── services/
│   ├── entities/
│   └── categoria.module.ts
├── produto/
│   ├── controller/
│   ├── services/
│   ├── entities/
│   └── produto.module.ts
├── rawg/
│   ├── controller/
│   ├── services/
│   └── rawg.module.ts
├── app.module.ts
└── main.ts
```

## 📝 Banco de Dados

**Categoria**: id, nome, descricao  
**Produto**: id, nome, descricao, preco, estoque, categoria_id (FK)

Relacionamento: 1:N (Categoria → Produtos)

## 🔌 Integração RAWG

Consome dados reais de jogos da RAWG API sem persistir automaticamente no banco local. Dados servem como referência para cadastro manual.
