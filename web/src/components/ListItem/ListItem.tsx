import { CloseIcon } from '@chakra-ui/icons'
import { Button, ListItem as LI } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

export interface ListItemProps {
  id: number
  name: string
  deleteItem: () => void
}

const ListItem: React.FC<ListItemProps> = ({ id, name, deleteItem }) => {
  return (
    <LI display="flex" justifyContent="space-between" gap={2}>
      <Button variant="link" as={Link} to={routes.list({ id })}>
        {name}
      </Button>
      <Button colorScheme="red" variant="ghost" size="sm" onClick={deleteItem}>
        <CloseIcon color="red.300" />
      </Button>
    </LI>
  )
}

export default ListItem
