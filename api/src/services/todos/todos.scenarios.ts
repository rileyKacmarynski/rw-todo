// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const standard = defineScenario<any>({
  user: {
    user1: {
      data: {
        email: '@user1@domain.com',
        hashedPassword: 'hash',
        salt: 'salty',
      },
    },
    user2: {
      data: {
        email: '@user2@domain.com',
        hashedPassword: 'hash',
        salt: 'salty',
      },
    },
  },
  list: {
    one: (scenario) => ({
      data: {
        name: 'list 1',
        authorId: scenario.user.user1.id,
      },
    }),
    two: (scenario) => ({
      data: {
        name: 'list 2',
        authorId: scenario.user.user2.id,
      },
    }),
  },
  todo: {
    one: (scenario) => ({
      data: {
        text: 'todo 1',
        authorId: scenario.user.user1.id,
        listId: scenario.list.one.id,
      },
    }),
    two: (scenario) => ({
      data: {
        text: 'todo 1',
        listId: scenario.list.one.id,
        authorId: scenario.user.user1.id,
      },
    }),
    three: (scenario) => ({
      data: {
        text: 'todo 3',
        authorId: scenario.user.user2.id,
        listId: scenario.list.two.id,
      },
    }),
  },
})

export type StandardScenario = typeof standard
