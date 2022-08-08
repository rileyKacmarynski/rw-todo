import userEvent from '@testing-library/user-event'
import { CreateTodoInput, CreateTodoMutation } from 'types/graphql'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import TodoForm from './TodoForm'

const mockSuccessfulSave = () => {
  mockGraphQLMutation<CreateTodoMutation, CreateTodoInput>(
    'CreateTodoMutation',
    () => {
      const id = Math.floor(Math.random() * 1000)

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
}

describe('TodoForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TodoForm />)
    }).not.toThrow()
  })

  it('display validation error when missing input value', async () => {
    render(<TodoForm />)

    await waitFor(() => userEvent.click(screen.getByText(/add/i)))

    await waitFor(() =>
      expect(screen.getByTestId('todoForm-fieldError')).toBeInTheDocument()
    )
  })

  it('clears input after successful submission', async () => {
    mockSuccessfulSave()
    render(<TodoForm />)

    const input = screen.getByTestId<HTMLInputElement>('todoForm-input')
    await waitFor(() => userEvent.type(input, "I'm going to do something"))

    await waitFor(() => userEvent.click(screen.getByText(/add/i)))

    await waitFor(() => expect(input).toHaveValue(''))
  })
})
