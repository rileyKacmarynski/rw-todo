// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  todos: [
    {
      id: 42,
      text: 'take over the world',
      createdAt: '2020-01-01T12:34:56Z',
      completed: false,
    },
    {
      id: 43,
      text: 'Get groceries',
      createdAt: '2020-01-01T12:34:56Z',
      completed: false,
    },
    {
      id: 44,
      text: 'Learn RedwoodJS',
      createdAt: '2020-01-01T12:34:56Z',
      completed: true,
    },
  ],
})
