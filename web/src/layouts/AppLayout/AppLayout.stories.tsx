import AppLayout from './AppLayout'

export const loggedIn = (args) => {
  mockCurrentUser({ id: 1, email: 'email@domain.com' })

  return <AppLayout {...args} />
}

export const loggedOut = () => {
  return <AppLayout />
}

export default { title: 'Layouts/AppLayout' }
