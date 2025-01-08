type CheckoutProductProps = {
  productName: string;
  quantity: number;
  price: number;
};

const CheckoutProduct = ({
  productName,
  quantity,
  price,
}: CheckoutProductProps) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium">{productName}</h3>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
      </div>
      <p className="font-medium">${(price * quantity).toLocaleString()}</p>
    </div>
  );
};

export default CheckoutProduct;
