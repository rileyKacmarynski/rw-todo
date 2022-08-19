import ListItem, { ListItemProps } from './ListItem'

const ITEM: ListItemProps = {
  id: 1,
  name: 'List 1',
  createdAt: new Date(),
}

export const generated = () => {
  return <ListItem item={ITEM} />
}

export default { title: 'Components/List' }
