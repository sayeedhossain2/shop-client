import React from "react";
import { useState } from "react";
// import { resolvePath } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(product);

    fetch("https://practice-project-server.vercel.app/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          alert("product added succfully");
        }
      });
  };

  const handleInputBlur = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    const newProduct = { ...product };
    newProduct[field] = value;
    setProduct(newProduct);
  };

  return (
    <div className="text-center mt-20">
      <form onSubmit={handleSubmit}>
        Product Name:
        <input
          type="text"
          onBlur={handleInputBlur}
          name="name"
          placeholder="name"
          className=" ml-6 input input-bordered input-warning w-full max-w-xs"
        />
        <br /> <br />
        Email:
        <input
          type="text"
          onBlur={handleInputBlur}
          name="email"
          placeholder="name"
          className=" ml-24 input input-bordered input-warning w-full max-w-xs"
        />
        <br />
        <br />
        Price:
        <input
          type="text"
          onBlur={handleInputBlur}
          name="price"
          placeholder="name"
          className="ml-20 input input-bordered input-warning w-full max-w-xs"
        />
        <br />
        <button className="btn btn-outline btn-secondary">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
