import { useRef } from 'react'

import {
  Button,
  Heading,
  Input,
  List,
  useToast,
  VStack,
} from '@chakra-ui/react'
import type { ListsQuery } from 'types/graphql'

import { Form, Submit, TextField } from '@redwoodjs/forms'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'

import ListItem from '../ListItem/ListItem'

export const QUERY = gql`
  query ListsQuery {
    lists {
      id
      name
      createdAt
    }
  }
`

export const CREATE = gql`
  mutation CreateListMutation($input: CreateListInput!) {
    createList(input: $input) {
      id
      name
      createdAt
    }
  }
`

export const DELETE = gql`
  mutation DeleteListMutation($id: Int!) {
    deleteList(id: $id) {
      id
    }
  }
`

const ListForm = () => {
  const toast = useToast()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [createList, { loading }] = useMutation(CREATE, {
    onCompleted: () => {
      toast({
        description: 'List added!',
        variant: 'subtle',
        status: 'success',
      })

      if (formRef.current) {
        formRef.current.reset()
      }
    },
    refetchQueries: [{ query: QUERY }],
  })

  const onSubmit = (data: { name: string }) => {
    createList({ variables: { input: { ...data } } })
  }

  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      <Input
        size="sm"
        colorScheme="blue"
        as={TextField}
        name="name"
        validation={{ required: true }}
        placeholder="add a new list"
      />
      <Button
        variant="solid"
        colorScheme="blue"
        type="submit"
        as={Submit}
        mt={2}
        disabled={loading}
      >
        Add
      </Button>
    </Form>
  )
}

export const Loading = () => (
  <VStack py={4} px={2}>
    <Heading size="md">Add a list below</Heading>
  </VStack>
)

export const Empty = () => (
  <VStack py={4} px={2}>
    <Heading size="md">Add a list below</Heading>
    <ListForm />
  </VStack>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<ListsQuery>) => {
  const toast = useToast()
  const [deleteList] = useMutation(DELETE, {
    onCompleted: () => {
      toast({
        description: 'List deleted',
        variant: 'subtle',
        status: 'success',
      })
    },
    refetchQueries: [{ query: QUERY }],
  })

  const onDelete = (id: number) => {
    deleteList({ variables: { id } })
  }

  return (
    <VStack alignItems="start" justifyContent="space-between" py={4} px={2}>
      <div>
        <Heading as="h3" size="lg">
          Lists
        </Heading>
        <List mt={2}>
          {lists.map((item) => {
            return (
              <ListItem
                id={item.id}
                name={item.name}
                key={item.id}
                deleteItem={() => onDelete(item.id)}
              />
            )
          })}
        </List>
      </div>
      <ListForm />
    </VStack>
  )
}
