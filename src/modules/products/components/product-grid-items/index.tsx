
import Link from 'next/link';
import { ProductPreviewType } from 'types/global';
import Grid from '../grid';
import { GridTileImage } from '../grid-tile-image';

export default function ProductGridItems({ products }: { products: ProductPreviewType[] }) {
    return (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <Grid.Item key={product.handle} className="animate-fadeIn h-80">
                    <Link className="relative inline-block h-full w-full" href={`/products/${product.handle}`}>
                        <GridTileImage
                            {...product}
                            fill
                            sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    </Link>
                </Grid.Item>
            ))}
        </Grid>
    );
}
