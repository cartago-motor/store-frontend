import clsx from "clsx"
import { ProductPreviewPrice } from "types/global"

const ProductPreviewPrice = ({
  price,
}: { price?: ProductPreviewPrice }) => {
  return (

    <div className="flex items-center gap-x-2 mt-1">
      {price ? (
        <>
          {price.price_type === "sale" && (
            <span className="line-through text-gray-500">
              {price.original_price}
            </span>
          )}
          <span
            className={clsx("font-semibold", {
              "text-rose-500": price.price_type === "sale",
            })}
          >
            {price.calculated_price}
          </span>
        </>
      ) : (
        <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
      )}
    </div>
  )
}

export default ProductPreviewPrice
