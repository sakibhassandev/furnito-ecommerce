import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../store/slices/cartSlice";
import { Bounce, toast } from "react-toastify";

export const MiniCartItem = ({ name, price, quantity, image, id }) => {
  const dispatch = useDispatch();
  return (
    <div className="item items-center relative flex p-[20px_35px_20px_20px] border-b border-[1px_solid_hsla(0,0%,51%,.2)] ease duration-300">
      <div className="thumb mr-[15px]">
        <a href="/product/123">
          <img
            src={image}
            alt={name}
            className="text-transparent object-contain w-[90px] h-[90px]"
          />
        </a>
      </div>
      <div className="content">
        <a
          href="/item/11232"
          className="mb-3 hover:text-[#f50963] ease-out duration-300 text-sm font-medium"
        >
          {name}
        </a>
        <div className="price-wrapper">
          <span className="text-sm font-medium text-[#B88E2F]">${price}</span>
          <span className="text-xs text-[#525258] font-medium">
            x{quantity}
          </span>
        </div>
      </div>
      <button
        className="absolute cursor-pointer top-[38px] right-4 del"
        onClick={() => {
          dispatch(removeCartItem({ id }));
          toast.error(`${name} removed from cart`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }}
      >
        {
          <IoClose className="text-[#525258] hover:text-[#B88E2F] ease-out duration-300" />
        }
      </button>
    </div>
  );
};
