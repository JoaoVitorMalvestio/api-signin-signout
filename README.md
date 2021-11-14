# user-api

## Configurações
Desenvolvido na versão do node v14.17.6
Mongodb 5.0.3

## Pré requisitos
Possuir mongodb instalado na maquina

## Como executar
Para instalar as dependencias basta usar o comando:
``num run dev``

Para executar o servidor, basta usar o comando:
``num run start``

Para executar os testes, basta usar o comando:
``npm run test``

## Métodos suportados
### POST /user/signup
#### Body Json
`{
"nome": string,
"email": string,
"senha": string,
"telefones": [
{
"numero": string,
"ddd": string
}
]
}`
#### Descrição
Criar novo usuário

### PUT /user/signin
#### Body json
`{
"email": string,
"senha": string
}`
#### Descrição
Realizar login do usuário

### GET /user
#### Query String
`id: string`
#### Descrição
Pegar dados do usuário informado