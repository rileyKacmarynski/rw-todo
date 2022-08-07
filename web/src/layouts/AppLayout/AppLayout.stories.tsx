import AppLayout from './AppLayout'

export const loggedIn = (args) => {
  mockCurrentUser({ id: 1 })

  return <AppLayout {...args} />
}

export const loggedOut = () => {
  return <AppLayout />
}

export default { title: 'Layouts/AppLayout' }
