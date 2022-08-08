import { Spinner, Flex, Heading } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import type { TodosQuery } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TodoList from '../TodoList/TodoList'

export const QUERY = gql`
  query TodosQuery {
    todos {
      id
      text
      completed
      createdAt
    }
  }
`

export const UPDATE = gql`
  mutation UpdateTodoMutation($id: Int!, $input: UpdateTodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      text
      completed
    }
  }
`

export const DELETE = gql`
  mutation DeleteTodoMutation($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

export const Loading = () => (
  <Flex alignItems="center" width={300} justifyContent="center">
    <Spinner color="blue.300" size="xl" />
  </Flex>
)

export const Empty = () => (
  <Flex alignItems="center" width={300} justifyContent="center">
    <Heading size="sm">Nothing left to do today.</Heading>
  </Flex>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ todos }: CellSuccessProps<TodosQuery>) => {
  const toast = useToast()

  const [updateTodo] = useMutation(UPDATE, {
    onCompleted: ({ updateTodo }) => {
      updateTodo.completed
        ? toast({
            description: 'Todo completed! Congrats!',
            status: 'success',
            variant: 'subtle',
          })
        : toast({
            description: 'Uncompleted todo, Uh oh.',
            status: 'warning',
            variant: 'subtle',
          })
    },
    refetchQueries: [{ query: QUERY }],
  })

  const [deleteTodo] = useMutation(DELETE, {
    onCompleted: () => {
      toast({
        description: 'Removed todo.',
        status: 'info',
        variant: 'subtle',
      })
    },
    refetchQueries: [{ query: QUERY }],
  })

  const toggleComplete = (todo: Todo) => {
    updateTodo({
      variables: { id: todo.id, input: { completed: !todo.completed } },
    })
  }

  const onDelete = (todo: Todo) => {
    deleteTodo({ variables: { id: todo.id } })
  }
  return (
    <TodoList
      todos={todos}
      toggleComplete={toggleComplete}
      deleteTodo={onDelete}
    />
  )
}
