'use client'

import { cn } from '@/lib/utils'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import { PriceFilter } from './price-filter'
import { useProductFilters } from '../../hooks/use-product-filter'

type Props = {
  title: string
  className?: string
  children?: React.ReactNode
}

const ProductFilter = ({ title, children, className }: Props) => {
  const [isOpen, setisOpen] = useState(false)

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon

  return (
    <div className={cn('p-4 border-b flex flex-col gap-2', className)}>
      <div
        onClick={() => setisOpen(current => !current)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  )
}

export const ProductFilters = (props: Props) => {
  const [filters, setfilters] = useProductFilters()

  const onChange = (key: keyof typeof filters, value: unknown) =>
    setfilters({ ...filters, [key]: value })

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        <button className="underline" onClick={() => {}} type="button">
          Clear
        </button>
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={value => onChange('minPrice', value)}
          onMaxPriceChange={value => onChange('maxPrice', value)}
        />
      </ProductFilter>
    </div>
  )
}
