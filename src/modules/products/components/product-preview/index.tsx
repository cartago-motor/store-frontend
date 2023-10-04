import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import ProductPreviewPrice from "../product-preview-price"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${handle}`}>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <Thumbnail thumbnail={thumbnail} size="full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            {/* <div className="badge badge-secondary">{tags}</div> */}
          </h2>
          <div className="card-actions justify-start">
            <ProductPreviewPrice price={price} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductPreview
