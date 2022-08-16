import { lists, list, createList, updateList, deleteList } from './lists'
import type { StandardScenario } from './lists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('lists', () => {
  scenario('returns all lists', async (scenario: StandardScenario) => {
    const authorId = scenario.list.one.authorId
    mockCurrentUser({
      email: 'email@domain.com',
      id: authorId,
    })
    const result = await lists()

    const userLists = Object.values(scenario.list).filter(
      (f) => f.authorId == authorId
    )
    expect(result.length).toEqual(Object.keys(userLists).length)
  })

  scenario('returns a single list', async (scenario: StandardScenario) => {
    mockCurrentUser({
      email: 'email@domain.com',
      id: scenario.list.one.authorId,
    })
    const result = await list({ id: scenario.list.one.id })

    expect(result).toEqual(scenario.list.one)
  })

  scenario('creates a list', async (scenario: StandardScenario) => {
    mockCurrentUser({
      email: 'email@domain.com',
      id: scenario.list.one.authorId,
    })
    const result = await createList({
      input: { authorId: scenario.list.two.authorId, name: 'List 3' },
    })

    expect(result.authorId).toEqual(scenario.list.two.authorId)
  })

  scenario('updates a list', async (scenario: StandardScenario) => {
    mockCurrentUser({
      email: 'email@domain.com',
      id: scenario.list.one.authorId,
    })
    const original = await list({ id: scenario.list.one.id })
    const result = await updateList({
      id: original.id,
      input: { authorId: scenario.list.two.authorId },
    })

    expect(result.authorId).toEqual(scenario.list.two.authorId)
  })

  scenario('deletes a list', async (scenario: StandardScenario) => {
    mockCurrentUser({
      email: 'email@domain.com',
      id: scenario.list.one.authorId,
    })
    const original = await deleteList({ id: scenario.list.one.id })
    const result = await list({ id: original.id })

    expect(result).toEqual(null)
  })
})
