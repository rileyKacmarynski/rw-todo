import { CreateTodoInput, CreateTodoMutation } from 'types/graphql'

import TodoForm from './TodoForm'

export const generated = (args) => {
  mockGraphQLMutation<CreateTodoMutation, CreateTodoInput>(
    'CreateTodoMutation',
    (variables, { ctx }) => {
      const id = Math.floor(Math.random() * 1000)
      ctx.delay(1000)

      return {
        createTodo: {
          id,
          // text: variables.input,
          text: 'for some reason its not capturing the input',
          completed: false,
          createdAt: new Date().toISOString(),
        },
      }
    }
  )

  return <TodoForm {...args} />
}

export default { title: 'Components/TodoForm' }
