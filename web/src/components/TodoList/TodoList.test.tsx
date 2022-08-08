import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import { standard } from '../TodosCell/TodosCell.mock'

import TodoList from './TodoList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TodoList', () => {
  const todos = standard().todos

  it('renders successfully', () => {
    expect(() => {
      render(
        <TodoList
          todos={todos}
          toggleComplete={jest.fn()}
          deleteTodo={jest.fn()}
        />
      )
    }).not.toThrow()
  })

  it('calls method to complete todo', async () => {
    const onComplete = jest.fn()
    const clickedTodo = todos[0]
    render(
      <TodoList
        todos={todos}
        toggleComplete={onComplete}
        deleteTodo={jest.fn()}
      />
    )

    await waitFor(() => userEvent.click(screen.getByText(clickedTodo.text)))

    await waitFor(() => expect(onComplete).toHaveBeenCalledWith(clickedTodo))
  })

  it('calls method to remove todo', async () => {
    const onDelete = jest.fn()
    const clickedTodo = todos[0]
    render(
      <TodoList
        todos={todos}
        toggleComplete={jest.fn()}
        deleteTodo={onDelete}
      />
    )

    await waitFor(() => {
      userEvent.click(screen.getByTestId(`todoList-delete-${clickedTodo.id}`))
    })

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(clickedTodo)
    })
  })
})
