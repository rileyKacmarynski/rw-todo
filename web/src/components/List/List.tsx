import { Heading, VStack } from '@chakra-ui/react'

import TodoForm from '../TodoForm'
import TodosCell from '../TodosCell'

interface List {
  id: number
  name: string
  todos: {
    id: number
    text: string
    createdAt?: string
    completed: boolean
  }[]
}

export type ListProps = {
  list: List
}

const List: React.FC<ListProps> = ({ list }) => {
  return (
    <VStack spacing={4}>
      <Heading as="h2" size="xl">
        {list.name}
      </Heading>
      <TodosCell listId={list.id} />
      <TodoForm listId={list.id} />
    </VStack>
  )
}

export default List
