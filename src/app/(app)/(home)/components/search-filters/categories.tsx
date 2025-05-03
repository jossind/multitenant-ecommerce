import { Category } from '@/payload-types'
import React from 'react'
import { CategoryDropdown } from './category-dropdown'

type Props = {
  data: any
}

export const Categories = ({ data }: Props) => {
  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data?.map((category: Category) => (
          <CategoryDropdown
            key={category.id}
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        ))}
      </div>
    </div>
  )
}
