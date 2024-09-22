export const Product = ({ img, name, title, price }) => {
  return (
    <div className="max-w-[285px] shadow-lg bg-[#F4F5F7] rounded overflow-hidden">
      <a href="/" className="block ">
        <img
          className="object-cover w-full transition-all duration-200 ease-linear hover:scale-105 hover:cursor-pointer"
          src={img}
          alt={name}
        />
      </a>

      <div className="bg-[#F4F5F7] pl-4 py-4 w-full">
        <h3 className="text-2xl font-semibold text-[#3a3a3a]">{name}</h3>
        <p className="text-[#898989] text-sm my-3">{title}</p>
        <span className="text-[#3A3A3A] font-semibold text-xl">${price}</span>
      </div>
    </div>
  );
};
