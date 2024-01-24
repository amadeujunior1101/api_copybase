# Copybase API - teste

Este projeto utiliza:

- Nest.js
- Typescript
- typeorm
- Csv-parser
- xlsx
- Sqlite
- Express
- Cors

## Executando a Aplicação

- No terminal:

1 - clone do repositorio: 

  git clone https://github.com/amadeujunior1101/api_copybase.git

2 - acesse a pasta:

  cd api_copybase

3 - baixe as dependências:

  yarn ou npm i

4 - (Opcional) Caso não tenha o postgres instalado, pode criar um container docker:

    docker run --name test-lumi -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

5 - (Opcinal) Executando todo o projeto com docker-compose

    docker-compose up --build

6 - na pasta api_copybase:

	yarn start:dev ou npm run start:dev

7 - Para executar os testes unitários:

    yarn test ou npm run test

8 - Documentação com Swagger  

    acesse: http://localhost:3333/api/