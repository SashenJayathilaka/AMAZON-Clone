import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import Currency from "react-currency-formatter";

const Order = ({ id, amount, amountShipping, items, timeStamp, images }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative border rounded-md"
    >
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="">
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timeStamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="USD" /> - Next Day Delivery{" "}
            <Currency quantity={amountShipping} currency="USD" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <img src={image} alt="" className="h-20 object-contain sm:h-32" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Order;
