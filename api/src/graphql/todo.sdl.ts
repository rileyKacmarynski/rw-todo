export const schema = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
    createdAt: DateTime!
  }

  type Query {
    Todos: [Todo!]! @requireAuth
  }

  input CreateTodoInput {
    text: String!
  }

  input UpdateTodoInput {
    text: String
    complete: Boolean
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`
