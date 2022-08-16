import type {
  QueryResolvers,
  MutationResolvers,
  TodoResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const todos: QueryResolvers['todos'] = () => {
  return db.todo.findMany({
    where: { authorId: context.currentUser.id },
  })
}

export const todo: QueryResolvers['todo'] = ({ id }) => {
  return db.todo.findFirst({
    where: { id, authorId: context.currentUser.id },
  })
}

export const createTodo: MutationResolvers['createTodo'] = ({ input }) => {
  return db.todo.create({
    data: { authorId: context.currentUser.id, ...input },
  })
}

export const updateTodo: MutationResolvers['updateTodo'] = async ({
  id,
  input,
}) => {
  const todo = await db.todo.findFirst({
    where: { id, authorId: context.currentUser.id },
  })

  return db.todo.update({
    data: input,
    where: { id: todo.id },
  })
}

export const deleteTodo: MutationResolvers['deleteTodo'] = ({ id }) => {
  return db.todo.delete({
    where: { id },
  })
}

export const Todo: TodoResolvers = {
  list: (_obj, { root }) =>
    db.todo.findUnique({ where: { id: root.id } }).list(),
  author: (_obj, { root }) =>
    db.todo.findUnique({ where: { id: root.id } }).author(),
}
