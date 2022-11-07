import React from "react";
import { useState } from "react";
// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";
import AllProductList from "./AllProductList";
import "./AllProduct.css";
import { useEffect } from "react";

const AllProduct = () => {
  // const { products, count } = useLoaderData();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [catagory, setCatagory] = useState("");
  useEffect(() => {
    fetch(`https://practice-project-server.vercel.app/product/${catagory}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [catagory]);

  useEffect(() => {
    const url = `https://practice-project-server.vercel.app/products?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);
  const pages = Math.ceil(count / size);

  // single products start
  const [proName, setProName] = useState("");

  useEffect(() => {
    fetch(
      `https://practice-project-server.vercel.app/singleproducts/${proName}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [proName]);

  const productChange = (event) => {
    event.preventDefault();
    const product = event.target.productName.value;
    setProName(product);
  };
  // single products end

  return (
    <div className="text-center ">
      {/* product search */}
      <form
        onSubmit={productChange}
        className="flex items-center justify-center mt-10 ,mb-5"
      >
        <input
          type="text"
          name="productName"
          placeholder="Type here"
          className=" input input-bordered w-full max-w-xs"
        />
        <input
          // onClick={productChange}
          className="btn btn-outline"
          type="submit"
          value="Search"
        />
        {/* <button className="btn btn-outline">Search</button> */}
      </form>
      {/* select */}
      <select
        className=" my-7 btn btn-outline btn-warning"
        onChange={(event) => setCatagory(event.target.value)}
      >
        <option value="Men's Sneaker">Men's Sneaker</option>
        <option value="Men's Pants">Men's Pants</option>
        <option value="Men's Boot">Men's Boot</option>
        <option value="Bag">Bag</option>
        <option value="Cap">Cap</option>
        <option value="Earphones">Earphones</option>
        <option value="Bottle">Bottle</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-10">
        {products.map((product) => (
          <AllProductList key={product._id} product={product}></AllProductList>
        ))}
      </div>

      {!catagory && !proName && (
        <div className="plagination my-10">
          <p>
            Currently selected page: {page} and size: {size}
          </p>
          {[...Array(pages).keys()].map((number) => (
            <button
              className={page === number && "selected"}
              key={number}
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}

          <select
            className="btn btn-outline btn-secondary"
            onChange={(event) => setSize(event.target.value)}
          >
            <option value="5">5</option>
            <option selected value="10">
              10
            </option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
