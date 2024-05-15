import React, { use } from "react";
import numeral from "numeral";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductCard = ({ image, name, price, model, am, color, carID }) => {
  const router = useRouter()
  // const handleClick = () => {
  //   // router.push('/rent')
  // router.push(`/rent?carID=${carID}`)
  // // window.location.href = `/rent?carID=${carID}`;
  
  // };
  return (
    <div className="mt-[40px] ml-[60px] bg-white border border-gray-300 shadow-md rounded-sm p-1 w-[400px] h-[500px] md-20 overflow-hidden">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
        alt={name}
        className="w-full h-[200px] object-cover rounded-lg mt-10"
      />
      <h2 className="text-center text-[30px] font-semibold mt-2">{name}</h2>
      <p className="text-center text-[20px] mt-2">Rp.{numeral(price).format("0,0")} / Hari</p>
      <div className="mt-10 flex items-center text-center justify-center">
        <div className="flex">
          <img
            src="/home/model.png"
            alt="Logo"
            className="mt-1 h-[17px] w-[20px]"
          />
          <p className="mr-4 text-gray-700 mb-2">{model}</p>
        </div>
        <div className="flex">
          <img
            src="/home/am.png"
            alt="Logo"
            className="mt-1 h-[17px] w-[19]"
          />
          <p className="mr-4 text-gray-700 mb-2">{am}</p>
        </div>
        <div className="flex">
          <img
            src="/gradient.png"
            alt="Logo"
            className=" h-[20px] w-[25px]"
          />
          <p className="text-gray-700 mb-2">{color}</p>
        </div>
      </div>
      <Link href={{
        pathname: "/rent",
        query: {carID: carID}
      }}> 
      <button className="bg-[#00ADB5] text-white text-lg px-4 py-2 font-light rounded-md ml-[70px] mt-3 h-10 w-[250px]">
        RENT
      </button>
      </Link>
    </div>
  );
};

export default ProductCard;
