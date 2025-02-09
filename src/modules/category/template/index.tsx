import Image from "next/image";
import Link from "next/link";

interface CategoryTemplateProps {
    name: string
    handle: string
    description?: string
}
const getHandleCategoryImage = (handle: string): string => {
    const parts = handle.split('/')
    const categoryHandle = parts[parts.length - 1]
    return `/categories/${categoryHandle}.png`
}
const CategoryTemplate: React.FC<CategoryTemplateProps> = ({ name, handle, description }: CategoryTemplateProps) => (
    <div key={name} className="group relative">
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
            <Image
                src={getHandleCategoryImage(handle)}
                alt={name}
                fill
                className="h-full w-full object-cover object-center"
            />
        </div>
        <h3 className="mt-2 text-base text-center text-gray-500">
            <Link
                href={`/${handle}`}>
                <span className="absolute inset-0" />
                {name}
            </Link>
        </h3>
        <p className="text-base font-semibold text-gray-900">{description}</p>
    </div>)

export default CategoryTemplate;