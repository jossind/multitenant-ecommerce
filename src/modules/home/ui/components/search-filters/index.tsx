'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Categories } from './categories'
import { SearchInput } from './search-input'
import { useTRPC } from '@/trpc/client'
import { useParams } from 'next/navigation'
import { DEFAULT_BG_COLOR } from '../../../../../app/(app)/(home)/constants'
import { BreadcrumbNavigation } from './breadcrumb-navigation'

export const SearchFilters = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  const params = useParams()
  const categoryParam = params.category as string | undefined
  const activeCategory = categoryParam || 'all'

  const activeCategoryData = data.find(c => c.slug === activeCategory)
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR
  const activeCategoryName = activeCategoryData?.name || 'All'

  const activeSubCategory = params.subcategory as string | undefined
  const activeSubCategoryData = activeCategoryData?.subcategories.find(
    c => c.slug === activeSubCategory
  )
  const activeSubCategoryName = activeSubCategoryData?.name || 'All'

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: activeCategoryColor,
      }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>

      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        actvieSubcategoryName={activeSubCategoryName}
      />
    </div>
  )
}

export const SearchFilteringLoading = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: 'F5F5F5',
      }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  )
}
