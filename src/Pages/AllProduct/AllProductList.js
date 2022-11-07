import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const AllProductList = ({ product }) => {
  const { user } = useContext(AuthContext);
  //   console.log(product);
  const { _id, name, price, ratings, img } = product;

  const handleAddToCart = (event) => {
    const orders = {
      email: user?.email,
      id: _id,
      name: name,
      image: img,
      price: price,
      ratings: ratings,
    };
    console.log(orders);
    fetch(
      `https://practice-project-server.vercel.app/orders?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orders),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("Order placed successfully");
        }
      });
    //   .catch((err) => console.err(err));
  };

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{price}</p>
        <p>{ratings}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToCart} className="btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProductList;
