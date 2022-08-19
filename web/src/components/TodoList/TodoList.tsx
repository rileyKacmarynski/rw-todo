import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Text,
  List,
  ListIcon,
  ListItem,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react'
import { Todo } from 'types/graphql'

export interface Props {
  todos: Todo[]
  toggleComplete: (todo: Todo) => void
  deleteTodo: (todo: Todo) => void
}

const hoverStyles = { cursor: 'pointer', bgColor: 'rgba(0, 0, 0, 0.1)' }

const TodoList = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <List width="100%" maxW={300} minH="260px">
      {todos.map((todo) => (
        <Flex key={todo.id} alignItems="center" justifyContent="space-between">
          <ListItem
            p={1}
            opacity={todo.completed ? 0.5 : 1}
            _hover={hoverStyles}
            onClick={() => toggleComplete(todo)}
            width="100%"
          >
            {todo.completed ? (
              <>
                <Box>
                  <ListIcon as={CheckCircleIcon} color="green.300" />
                  {todo.text}
                </Box>
              </>
            ) : (
              <Text ml={6}>{todo.text}</Text>
            )}
          </ListItem>
          <Button
            data-testid={`todoList-delete-${todo.id}`}
            colorScheme="red"
            variant="ghost"
            size="sm"
            onClick={() => deleteTodo(todo)}
          >
            <CloseIcon color="red.300" />
          </Button>
        </Flex>
      ))}
    </List>
  )
}

export default TodoList
