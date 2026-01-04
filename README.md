# Acolly Games - API Backend

![NestJS](https://img.shields.io/badge/NestJS-11.0-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)
![License](https://img.shields.io/badge/License-UNLICENSED-lightgrey)

API Backend completa para gerenciamento de uma Loja de Games com integração à API RAWG.

## 📋 Requisitos

- Node.js 18+
- npm ou yarn
- MySQL 8.0+

## 🚀 Instalação

```bash
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
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
