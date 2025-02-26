import { FiUsers } from "react-icons/fi";
import { HiOutlineShoppingCart, HiTemplate } from "react-icons/hi";
import useUserHook from "../../hooks/useUserHook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../pages/products/productSlice";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { getAdmins } from "../../redux/slices/adminsSlice";
import { RiAdminFill } from "react-icons/ri";
export function DashboardStats() {
  const dispatch = useDispatch();

  const { getAllUsers, totalUsers } = useUserHook();

  const { totalDocuments: totalProducts, loading } = useSelector(
    (state) => state.products
  );

  const { orders, loading: orderLoading } = useSelector(
    (state) => state.orderSlice
  );

  const { totalAdmins, status } = useSelector((state) => state.admins);

  useEffect(() => {
    getAllUsers("?role=user");
    dispatch(allProduct({ page: 1, limit: 3, search: "" }));
    dispatch(getAllOrders());
    dispatch(getAdmins({ page: 1, searchTerm: "" }));
  }, []);

  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
      <div className="p-6 bg-white rounded-lg border shadow">
        <div className="flex  items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Users
            </p>
            <h3 className="text-2xl font-bold">
              {totalUsers > 0 ? (
                totalUsers
              ) : (
                <img
                  className="w-8"
                  src="../../../public/loadingSpinner.svg"
                  alt=""
                />
              )}
            </h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <FiUsers className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg border shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Products
            </p>
            <h3 className="text-2xl font-bold">
              {loading ? (
                <img
                  className="w-8"
                  src="../../../public/loadingSpinner.svg"
                  alt=""
                />
              ) : (
                totalProducts
              )}
            </h3>
          </div>
          <div className="bg-orange-100 p-3 rounded-full">
            <HiTemplate className="h-6 w-6 text-orange-500" />
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg border shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Orders
            </p>
            <h3 className="text-2xl font-bold">
              {orderLoading ? (
                <img
                  className="w-8"
                  src="../../../public/loadingSpinner.svg"
                  alt=""
                />
              ) : (
                orders.length
              )}
            </h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <HiOutlineShoppingCart className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg border shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Admins
            </p>
            <h3 className="text-2xl font-bold">
              {status === "loading" ? (
                <img
                  className="w-8"
                  src="../../../public/loadingSpinner.svg"
                  alt=""
                />
              ) : (
                totalAdmins
              )}
            </h3>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <RiAdminFill className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
