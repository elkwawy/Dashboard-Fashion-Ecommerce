
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API } from "../../Api/Api";

export default function OrderDetails() {
  const location = useLocation();
  const order = location.state?.order || {};
  const orderItems = order.orderItems || [];
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProduct = async (id) => {
    try {
      const res = await fetch(`${API.product}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const productData = await res.json();
      return productData.data;
    } catch (e) {
      console.error("Error fetching product:", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      const fetchedProducts = await Promise.all(
        orderItems.map((item) => fetchProduct(item.product))
      );
       
      setProducts(fetchedProducts.filter(Boolean));
      setLoading(false);
    };

    if (orderItems.length > 0) {
      fetchAllProducts();
    }
  }, [orderItems]);

  return (
    <section className="p-6 bg-white rounded-lg shadow-md">
      <div className="inline-block min-w-full max-w-[250px] overflow-y-auto overflow-x-auto border border-[#D5D5D5] md:rounded">
        <table className="min-w-full ">
          <thead className="bg-[#F8F9FC] border-b border-[#D5D5D5]">
            <tr>
              <th className="py-3.5 px-4 text-[18px] font-[600] tracking-wide text-left text-black">
                Product
              </th>
              <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
                Quantity
              </th>
              <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
                Price
              </th>
              <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
               Tottal Price
              </th>
              <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
                City
              </th>
              <th className="px-4 py-3.5 text-[18px] font-[600] tracking-wide text-left text-black">
                Address
              </th>

            
            
             
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5D5D5]">
            {orderItems.map((item, index) => {
              const product = products[index];

              return (
                <tr key={index}>
                  <td className="px-4 py-3 flex items-center justify-start gap-2 text-sm text-black whitespace-nowrap">
                    {loading ? (
                      <div className="animate-pulse flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-300 rounded"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-10 h-10 rounded"
                        />
                        <span>{product?.name || "Unknown"} </span>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-black whitespace-nowrap ">
                    {item.price}
                  </td>
                  <td className="px-4 py-3 text-sm text-black whitespace-nowrap ">
                    { item.quantity * item.price}
                  </td>

                  <td className="px-4 py-3 text-sm text-black whitespace-nowrap ">
                    {order.shippingAddress.city}
                  </td>
                  <td className="px-4 py-3 text-sm text-black whitespace-nowrap ">
                    {order.shippingAddress.address}
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
