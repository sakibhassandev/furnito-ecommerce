import emptyCartImg from "../../assets/images/empty-cart.png";

export const EmptyCard = ({ name }) => {
  return (
    <div className="empty-card text-center mt-[150px]">
      <img
        src={emptyCartImg}
        alt="empty-cart"
        className="mx-auto mb-8 text-transparent align-middle"
      />
      <p className="text-[#03041c] mb-6 leading-7">Your {name} is empty</p>
      <a
        className="bg-[#f1f1f1] font-semibold text-sm capitalize hover:bg-[#03041c] ease-out duration-300 rounded-sm hover:text-white text-[#03041c] p-[12px_30px]"
        href="/shop"
      >
        Go to Shop
      </a>
    </div>
  );
};
