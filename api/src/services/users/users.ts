import type { QueryResolvers, UserResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// export const user: QueryResolvers['user'] = ({ id }) => {
//   return db.user.findUnique({
//     where: { id },
//   })
// }

export const User: UserResolvers = {
  lists: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).lists(),
}
