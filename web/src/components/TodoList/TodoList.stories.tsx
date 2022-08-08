import { standard } from '../TodosCell/TodosCell.mock'

import TodoList from './TodoList'

export const generated = () => {
  return <TodoList todos={standard().todos} />
}

export default { title: 'Components/TodoList' }
