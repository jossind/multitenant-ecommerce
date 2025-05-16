'use client'

import { Input } from '@/components/ui/input'
import { ListFilterIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { CategoriesSidebar } from './categories-sidebar'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
  disabled?: boolean
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setiIsSidebarOpen] = useState(false)
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar data={data} open={isSidebarOpen} onOpenChange={setiIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input className="pl-8" placeholder="Search products" disabled={disabled} />
      </div>
      {/* TODO: Add categories view all buttons */}
      <Button
        variant={'elevated'}
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setiIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add library button */}
    </div>
  )
}
