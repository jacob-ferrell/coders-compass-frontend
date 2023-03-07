export default function ProductCard({product}) {
    const {title, price, description, images} = product;
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p2">
            <h3>{title}</h3>
            <img src={images[0]} alt="Image" />
            <div>{description}</div>    
            <div>{price}</div>
        </div>
    );
}