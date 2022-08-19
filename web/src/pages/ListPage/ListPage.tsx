import { MetaTags } from '@redwoodjs/web'

import ListCell from 'src/components/ListCell'

const ListPage: React.FC<{ id: number }> = ({ id }) => {
  return (
    <>
      <MetaTags title="List" description="List page" />

      <ListCell id={Number(id)} />
    </>
  )
}

export default ListPage
