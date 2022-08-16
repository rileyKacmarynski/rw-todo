export const schema = gql`
  type User {
    id: Int!
    email: String!
    lists: [List]!
  }

  type Query {
    # users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  # input CreateUserInput {
  #   email: String!
  #   resetToken: String
  #   resetTokenExpiresAt: DateTime
  # }

  # input UpdateUserInput {
  #   email: String
  #   resetToken: String
  #   resetTokenExpiresAt: DateTime
  # }
`
