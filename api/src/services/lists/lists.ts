import type {
  QueryResolvers,
  MutationResolvers,
  ListResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const lists: QueryResolvers['lists'] = () => {
  return db.list.findMany({
    where: { authorId: context.currentUser.id },
  })
}

export const list: QueryResolvers['list'] = ({ id }) => {
  return db.list.findFirst({
    where: { id, authorId: context.currentUser.id },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  return db.list.create({
    data: { authorId: context.currentUser.id, ...input },
  })
}

export const updateList: MutationResolvers['updateList'] = async ({
  id,
  input,
}) => {
  const list = await db.list.findFirst({
    where: { id, authorId: context.currentUser.id },
  })

  return db.list.update({
    data: input,
    where: { id: list.id },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return db.list.delete({
    where: { id },
  })
}

export const List: ListResolvers = {
  todos: (_obj, { root }) =>
    db.list.findUnique({ where: { id: root.id } }).todos(),
  author: (_obj, { root }) =>
    db.list.findUnique({ where: { id: root.id } }).author(),
}
