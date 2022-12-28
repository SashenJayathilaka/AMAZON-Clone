import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import { StarIcon } from "../icons";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
}) => {
  const dispatch = useDispatch();

  const addItemTOBasket = () => {
    const loadingToast = toast.loading("Adding Item...");

    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };

    dispatch(addToBasket(product));

    toast.success(`${title} Added`, {
      id: loadingToast,

      position: "bottom-right",
      style: {
        textAlign: "center",
        padding: "18px",
      },
    });
  };

  const removeItemFromBasket = () => {
    const loadingToast = toast.loading("Remove Item...");

    dispatch(removeFromBasket({ id }));

    toast.error(`${title}`, {
      id: loadingToast,

      position: "bottom-right",
      style: {
        textAlign: "center",
        padding: "18px",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="grid grid-cols-5"
    >
      <Toaster />
      <Image src={image} height={200} width={200} className="object-contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="USD" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png"
              alt=""
              loading="lazy"
              className="w-12"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="button"
          onClick={addItemTOBasket}
        >
          Add to Basket
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={removeItemFromBasket}
          className="p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 hover:bg-gradient-to-b hover:from-orange-200 hover:to-orange-400 hover:border hover:border-orange-300 "
        >
          Remove from Basket
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CheckoutProduct;
