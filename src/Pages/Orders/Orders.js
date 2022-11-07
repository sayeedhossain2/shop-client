import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
// import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Orders = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);

  //   console.log(orders);

  useEffect(() => {
    fetch(
      `https://practice-project-server.vercel.app/orders?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email, update]);

  //   const [displayProduct, setDisplayProduct] = useState(orders);
  //   console.log(displayProduct);

  const handleDelete = (order) => {
    const agree = window.confirm(
      `Are you sure you want to delete ${order.name}`
    );
    if (agree) {
      fetch(`https://practice-project-server.vercel.app/orders/${order._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted Succfully");
            setUpdate(!update);
          }
          const remaining = orders.filter(
            (displayP) => displayP._id !== order._id
          );
          setOrders(remaining);
        });
    }
  };

  return (
    <div className="mx-10">
      <h2 className="text-center  my-10 text-4xl font-bold text-orange-500">
        Total Orders: {orders.length}
      </h2>
      {orders.map((order) => (
        <div key={order._id}>
          <div className=" flex justify-between  mb-10 bg-rose-50 px-5  py-3 rounded-xl">
            <div className="">
              <img className="w-1/3 rounded-xl" src={order.image} alt="" />
            </div>
            <div className=" flex justify-between items-center w-full">
              <div>
                <h2 className="card-title">{order.name}</h2>
              </div>
              <div className=" ml-10">
                <button
                  onClick={() => handleDelete(order)}
                  className="btn btn-outline btn-warning"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
