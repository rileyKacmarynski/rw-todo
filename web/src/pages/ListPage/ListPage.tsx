import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ListPage: React.FC<{ id: number }> = ({ id }) => {
  return (
    <>
      <MetaTags title="List" description="List page" />

      <h1>List cell will go here</h1>
      <p>page {id}</p>
    </>
  )
}

export default ListPage
