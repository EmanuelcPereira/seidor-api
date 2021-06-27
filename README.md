Seidor API
==================

API desenvolvida como teste de código para vaga de desenvolvedor back-end da Seidor.

## Tecnologias

* NodeJS
* Express
* Typescript
* Docker
* Postgres
* TypeORM
* Jest
* Swagger

## Iniciando o projeto

```bash
# install docker https://docs.docker.com/install

git clone git@github.com:EmanuelcPereira/seidor-api.git

yarn install # ou npm install

[sudo] docker-componse up
# levantará o docker com o banco de dados e a aplicação.

yarn tipeorm migration:run
# rodará as migrations no banco de dados
```
## Documentação

A documentação das rotas da API foi feita utilizando o swagger. Após a execução da aplicação, a documentação poderá ser acessa por meio do link abaixo. Pela documentação também será possível testar a aplicação.

[![Acesse swagger](https://img.shields.io/badge/swagger-Acesse%20a%20documenta%C3%A7%C3%A3o-green)](http://localhost:3333/api-docs/#/)

TESTES
======

A API foi desenvolvida seguindo os conceitos de TDD com testes unitários nos serviços.
### Rodar
```
yarn test
# or npm run test
```

As funcionalidades da aplicação também poderão ser testadas utilizando um cliente para visualizar os dados da API como o Insomnia.

#### Para informações a cerca dos requisitos da aplicação veja a pasta ./docs