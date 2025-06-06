import { ProductList, ProductListSkeleton } from '@/modules/products/ui/components/product-list'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'

type Props = {
  params: Promise<{
    category: string
  }>
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ category }))

  console.log('link: ', category)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default CategoryPage
