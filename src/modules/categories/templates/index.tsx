"use client"

import {
  ProductCategoryWithChildren,
  getProductsByCategoryHandle,
} from "@lib/data"
import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import { ProductCategory } from "@medusajs/medusa"
import CategoryTemplate from "@modules/category/template"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductGridItems from "@modules/products/components/product-grid-items"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"

type CategoriesTemplateProps = {
  categories: ProductCategoryWithChildren[]
}

const CategoriesTemplate: React.FC<CategoriesTemplateProps> = ({ categories }) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category) notFound()

  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`get_category_products`, category.handle, cart?.id],
    ({ pageParam }) =>
      getProductsByCategoryHandle({
        pageParam,
        handle: category.handle!,
        cartId: cart?.id,
        currencyCode: cart?.region?.currency_code,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  const categoryChildren = category?.category_children
  const columns = categoryChildren.length < 4 ? categoryChildren.length : 4

  const skeletons = () =>
  (<ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
    {
      repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))
    }
  </ul>)
  return (
    <div className="content-container py-6">
      <div className="flex flex-row mb-8 text-2xl-semi gap-4">
        {parents &&
          parents.map((parent) => (
            <span key={parent.id} className="text-gray-500">
              <Link
                className="mr-4 hover:text-black"
                href={`/${parent.handle}`}
              >
                {parent.name}
              </Link>
              /
            </span>
          ))}
        <h1>{category.name}</h1>
      </div>
      {category.description && (
        <div className="mb-8 text-base-regular">
          <p>{category.description}</p>
        </div>
      )}
      {categoryChildren.length > 0 ? (
        <div className="mb-8 text-base-large">
          <ul className={`grid sm:grid-cols-3 lg:grid-cols-${columns} gap-x-2`} >
            {
              categoryChildren?.map((productCategory: ProductCategory) => (
                <li className="mb-6" key={productCategory.id}>
                  <CategoryTemplate handle={productCategory.handle} name={productCategory.name} description={productCategory.description} />
                </li>
              ))
            }
          </ul>
        </div>
      ) :
        isFetchingNextPage ? skeletons() : (<ProductGridItems products={previews} />)
      }
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div >
  )
}

export default CategoriesTemplate
