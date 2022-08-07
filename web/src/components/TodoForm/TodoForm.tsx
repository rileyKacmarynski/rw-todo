import { useRef } from 'react'

import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from '@chakra-ui/react'

import { Form, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

const CREATE = gql`
  mutation CreateTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      text
      completed
      createdAt
    }
  }
`

const TodoForm = () => {
  const toast = useToast()
  const formRef = useRef<HTMLFormElement | null>(null)

  const [createTodo, { loading, error }] = useMutation(CREATE, {
    onCompleted: () => {
      toast({
        description: 'Todo added!',
        variant: 'subtle',
        status: 'success',
      })

      if (formRef.current) {
        formRef.current.reset()
      }
    },
  })

  const onSubmit = (input) => {
    createTodo({ variables: input })
  }

  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      <Input
        data-testid="todoForm-input"
        name="todo"
        as={TextField}
        placeholder="What are you going to do?"
        validation={{ required: true }}
      />
      <FieldError
        data-testid="todoForm-fieldError"
        name="todo"
        style={{ color: 'red', display: 'block' }}
      />
      <Button
        textTransform="uppercase"
        as={Submit}
        leftIcon={<AddIcon />}
        mt={2}
        colorScheme="blue"
        type="submit"
        isLoading={loading}
      >
        Add
      </Button>
      {error && (
        <Alert data-testid="todoForm-alert" mt={4} status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Form>
  )
}

export default TodoForm