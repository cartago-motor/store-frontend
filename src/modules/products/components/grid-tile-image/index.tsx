import clsx from 'clsx';
import Image from 'next/image';
import { ProductPreviewType } from 'types/global';
import Label from './grid-tile-image-label';

type GridTileImageProps = ProductPreviewType & { isInteractive?: boolean, active?: boolean } & Partial<React.ComponentProps<typeof Image>>
export function GridTileImage({
    isInteractive = true,
    active = true,
    title,
    thumbnail,
    price,
    ...props
}: GridTileImageProps) {
    return (
        <div
            className={clsx(
                'flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
                {
                    relative: title,
                    //'border-2 border-blue-600': active,
                    //'border-neutral-200 dark:border-neutral-800': !active
                }
            )}
        >
            {thumbnail ? (
                <Image
                    className={clsx('relative h-full w-full object-contain', {
                        'transition duration-300 ease-in-out hover:scale-105': isInteractive
                    })}
                    {...props}
                    src={thumbnail as string}
                    alt={title}
                />
            ) : null}
            {title ? (
                <Label
                    title={title}
                    price={price?.calculated_price as string}
                    position="bottom"
                />
            ) : null}
        </div>
    );
}
