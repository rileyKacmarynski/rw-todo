export const schema = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
    createdAt: DateTime!
  }

  type Query {
    todos: [Todo!]! @requireAuth
  }

  input CreateTodoInput {
    text: String!
  }

  input UpdateTodoInput {
    text: String
    completed: Boolean
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`
