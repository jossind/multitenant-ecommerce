import React from 'react'

type Props = {
  params: Promise<{
    category: string
  }>
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params

  console.log('link: ', category)
  return <div>CategoryPage: {category}</div>
}

export default CategoryPage
