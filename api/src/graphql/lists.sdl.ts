export const schema = gql`
  type List {
    id: Int!
    name: String!
    todos: [Todo]!
    author: User!
    lastAccessed: DateTime
    createdAt: DateTime
  }

  type Query {
    lists: [List!]! @requireAuth
    list(id: Int!): List @requireAuth
  }

  input CreateListInput {
    name: String!
    authorId: Int!
    lastAccessed: DateTime
  }

  input UpdateListInput {
    name: String
    authorId: Int
    lastAccessed: DateTime
  }

  type Mutation {
    createList(input: CreateListInput!): List! @requireAuth
    updateList(id: Int!, input: UpdateListInput!): List! @requireAuth
    deleteList(id: Int!): List! @requireAuth
  }
`
