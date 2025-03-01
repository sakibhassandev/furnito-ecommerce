type CheckoutProductProps = {
  productName: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
};

const CheckoutProduct = ({
  productName,
  quantity,
  price,
  size,
  color,
}: CheckoutProductProps) => {
  return (
    <div className="flex justify-between items-start capitalize">
      <div>
        <h3 className="font-medium">{productName}</h3>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
        <p className="text-sm text-gray-600">Size: {size}</p>
        <p className="text-sm text-gray-600">Color: {color}</p>
      </div>
      <p className="font-medium">${(price * quantity).toLocaleString()}</p>
    </div>
  );
};

export default CheckoutProduct;
