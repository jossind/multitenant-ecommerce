import React, { Suspense } from 'react'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { Navbar } from './components/navbar'
import { Footer } from './components/footer'
import { SearchFilteringLoading, SearchFilters } from './components/search-filters'
import { getQueryClient, trpc } from '@/trpc/server'

type Props = {
  children: React.ReactNode
}

const layout = async ({ children }: Props) => {
  const queryclient = getQueryClient()
  void queryclient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryclient)}>
        <Suspense fallback={<SearchFilteringLoading />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}

export default layout
