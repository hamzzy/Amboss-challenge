<h1>A solution to amboss technical test<h1>
# Tools
 
- nestjs
- Typescript
- Rabbitmq
- docker
- postgresSQL
- GraphQL

 To  make the application work you need to follow the step below 
## Installation
```bash
$ npm install or yarn install
```

## Running the app

```bash
$ npm run start:dev or yarn start:dev
```

## To start postgres and rabbit-mq with docker use

```bash
bash run.sh
```

graphQl is running at
```
http://localhost:3000/graphql
```
RabbitMq Dashboard running at
```
http://localhost:15672
username : guest
password: guest
```

## This application consist of three mutations and two query which grapql structure is .

- CreateEdges mutations
```graphql
# graphql struct to 
mutation {
  createEdge(
    createEdgeInput: { node1_alias: "hello world", node2_alias: "king is here" }
  ) {
    id
    capacity
    node1_alias
    node2_alias
  }
}

```

- CreateEdges mutations
```graphql
# graphql struct to 
mutation {
  createEdge(
    createEdgeInput: { node1_alias: "hello world", node2_alias: "king is here" }
  ) {
    id
    capacity
    node1_alias
    node2_alias
  }
}

```

- UpdateEdges mutations
```graphql
# graphql struct to 
mutation {
  updateEdge(
    updateEdgeInput: {
      id:3,
      node1_alias:"12390.00-egdkeke",
      node2_alias:"12390.00-near-b"
    }
  ) {
    id
    capacity,
    node1_alias,
    node2_alias,
  }
}

```

- removeEdges mutations
```graphql
# graphql struct to 
mutation {
  removeEdge(id: int)
}


```

- GetEdges Query
```graphql
query{
  getEdges{
    id,
    capacity,
    node1_alias,
    node2_alias,
    created_at,
    updated_at
    
  }
}
```

- GetEdge Query 

```graphql
query {
  getEdge(id: int) {
    id
    capacity
    node1_alias
    node2_alias
  }
}
```
