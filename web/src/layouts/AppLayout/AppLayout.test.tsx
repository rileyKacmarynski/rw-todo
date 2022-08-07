import { render, screen, waitFor } from '@redwoodjs/testing'

import AppLayout from './AppLayout'

const loggedIn = () => {
  mockCurrentUser({ id: 1 })
}

const loggedOut = () => {
  mockCurrentUser(null)
}

describe('AppLayout', () => {
  it('displays a Login and Signup link when not logged in', async () => {
    loggedOut()
    render(<AppLayout />)

    await waitFor(() => expect(screen.getByText(/login/i)).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText(/signup/i)).toBeInTheDocument())
  })

  it('displays a logout link when logged in', async () => {
    loggedIn()

    render(<AppLayout />)

    await waitFor(() => expect(screen.getByText(/logout/i)).toBeInTheDocument())
  })
})
