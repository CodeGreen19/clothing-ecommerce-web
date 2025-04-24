import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    price: number;
    prevPrice: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/product-category/${product.category.toLowerCase()}/${product.subCategory.toLowerCase()}/${product.slug}`}
      key={product.slug}
    >
      <Card className="aspect-[6/7.5] overflow-hidden drop-shadow-sm">
        <div className="aspect-square border-b">
          <Image
            src={"/product.png"}
            height={200}
            className="aspect-square h-full w-full"
            width={200}
            alt="product_img"
          />
        </div>
        <div className="p-2">
          <h1>
            {" "}
            <del className="mr-2 text-sm text-red-400">{product.prevPrice}</del>
            {product.price} taka
          </h1>
          <p>{product.name}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
