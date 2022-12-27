import Image from "next/image";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { addToBasket } from "../ slices/basketSlice";
import { StarIcon } from "../icons";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}) => {
  const dispatch = useDispatch();
  const [customRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemTOBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      customRating,
    };

    dispatch(addToBasket(product));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative flex flex-col m-5 bg-white z-30 p-10"
    >
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <div className="items-center flex justify-center">
        <Image
          src={image}
          alt={title}
          height={200}
          width={200}
          className="object-contain "
        />
      </div>

      <h4>{title}</h4>
      <div className="flex">
        {Array(customRating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://www.nicepng.com/png/detail/115-1159983_amazon-prime-logo-prime-amazon.png"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemTOBasket} className="mt-auto button">
        Add to Busket
      </button>
    </motion.div>
  );
};

export default Product;
