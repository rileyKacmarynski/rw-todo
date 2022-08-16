import { todos, todo, createTodo, updateTodo, deleteTodo } from './todos'
import type { StandardScenario } from './todos.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('todos', () => {
  const mockUser1 = (id: number) =>
    mockCurrentUser({
      email: 'email@domain.com',
      id,
    })

  scenario('returns all todos', async (scenario: StandardScenario) => {
    const authorId = scenario.todo.one.authorId
    mockUser1(authorId)

    const result = await todos()

    const user1Todos = Object.values(scenario.todo).filter(
      (f) => f.authorId == authorId
    )
    expect(result.length).toEqual(user1Todos.length)
  })

  scenario('returns a single todo', async (scenario: StandardScenario) => {
    const authorId = scenario.todo.one.authorId
    mockUser1(authorId)

    const result = await todo({ id: scenario.todo.one.id })

    expect(result).toEqual(scenario.todo.one)
  })

  scenario('creates a todo', async (scenario: StandardScenario) => {
    const authorId = scenario.todo.one.authorId
    mockUser1(authorId)

    const result = await createTodo({
      input: {
        text: 'String',
        completed: false,
        listId: scenario.todo.two.listId,
      },
    })

    expect(result.text).toEqual('String')
    expect(result.listId).toEqual(scenario.todo.two.listId)
    expect(result.authorId).toEqual(scenario.todo.two.authorId)
  })

  scenario('updates a todo', async (scenario: StandardScenario) => {
    const authorId = scenario.todo.one.authorId
    mockUser1(authorId)

    const original = await todo({ id: scenario.todo.one.id })
    const result = await updateTodo({
      id: original.id,
      input: { text: 'String2' },
    })

    expect(result.text).toEqual('String2')
  })

  scenario('deletes a todo', async (scenario: StandardScenario) => {
    const original = await deleteTodo({ id: scenario.todo.one.id })
    const result = await todo({ id: original.id })

    expect(result).toEqual(null)
  })
})
