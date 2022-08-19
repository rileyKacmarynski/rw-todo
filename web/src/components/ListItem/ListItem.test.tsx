import { render } from '@redwoodjs/testing/web'

import ListItem, { ListItemProps } from './ListItem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const ITEM: ListItemProps = {
  id: 1,
  name: 'List 1',
  createdAt: new Date(),
}

describe('List', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ListItem item={ITEM} />)
    }).not.toThrow()
  })
})
