import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      key={product.id}
      className="aspect-[6/7.5] overflow-hidden drop-shadow-sm"
    >
      <div className="aspect-square border-b">
        <Image
          src={product.image}
          height={200}
          className="aspect-square h-full w-full"
          width={200}
          alt="product_img"
        />
      </div>
      <div className="p-2">
        <h1>125 taka</h1>
        <p>Black t-shirt for men</p>
      </div>
    </Card>
  );
};

export default ProductCard;
