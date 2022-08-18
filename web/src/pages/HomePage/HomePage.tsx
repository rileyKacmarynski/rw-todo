import { VStack } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import TodoForm from 'src/components/TodoForm'
import TodosCell from 'src/components/TodosCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      {/* <VStack alignItems="start">
        <TodosCell />
        <TodoForm />
      </VStack> */}
    </>
  )
}

export default HomePage
