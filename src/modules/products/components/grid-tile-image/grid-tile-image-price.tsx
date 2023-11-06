
const Price = ({
    price,
    className,
    currencyCodeClassName
}: {
    price: string;
    className?: string;
    currencyCodeClassName?: string
} & React.ComponentProps<'p'>) => (
    <p suppressHydrationWarning={true} className={className}>
        {price}
    </p>
);

export default Price;
