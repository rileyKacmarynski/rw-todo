import type { UserResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// export const user: QueryResolvers['user'] = ({ id }) => {
//   return db.user.findUnique({
//     where: { id },
//   })
// }

// I don't have a need for querying users outside of
// the author of a list or todo so this is empty

export const User: UserResolvers = {
  lists: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).lists(),
}
