import React from 'react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'

type Props = {
  activeCategoryName?: string
  activeCategory?: string
  actvieSubcategoryName?: string
}

export const BreadcrumbNavigation = ({
  activeCategoryName,
  activeCategory,
  actvieSubcategoryName,
}: Props) => {
  if (!activeCategoryName && activeCategory === 'all') return null
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeCategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-xl font-medium underline text-primary">
                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary font-medium text-lg">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage  className="text-xl font-medium ">
                {actvieSubcategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium ">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
