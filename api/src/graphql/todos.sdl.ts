export const schema = gql`
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
    list: List!
    listId: Int!
    authorId: Int!
    author: User!
    createdAt: DateTime
  }

  type Query {
    todos(listId: Int!): [Todo!]! @requireAuth
    todo(id: Int!): Todo @requireAuth
  }

  input CreateTodoInput {
    text: String!
    completed: Boolean!
    listId: Int!
  }

  input UpdateTodoInput {
    text: String
    completed: Boolean
    listId: Int
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo! @requireAuth
    updateTodo(id: Int!, input: UpdateTodoInput!): Todo! @requireAuth
    deleteTodo(id: Int!): Todo! @requireAuth
  }
`
