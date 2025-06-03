import React from 'react'

type Props = {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

const SubCategoryPage = async ({ params }: Props) => {
  const { subcategory, category } = await params
  return (
    <div>
      CategoryPage: {subcategory}/ {category}
    </div>
  )
}

export default SubCategoryPage
