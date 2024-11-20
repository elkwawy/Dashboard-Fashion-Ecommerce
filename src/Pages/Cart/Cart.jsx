import { Link } from "react-router-dom";
import offer1 from "../../assets/images/offer1.png";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

function Cart() {
  return (
    <section className="bg-white py-8 antialiased  md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="flex justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
                Cart
              </h2>
              <div className="flex gap-2 items-center">
                <RiDeleteBin5Line />
                <h2 className="text-sm font-semibold text-gray-900">Remove</h2>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-gray-400 space-y-4 hidden md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <p className="text-sm">PRODUCT</p>
                <div className="md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 ">
                  <p className="text-sm pr-20">QUALITY</p>
                  <p className="text-sm pr-5">PRICE</p>
                </div>
              </div>
              <div className=" border-t  border-gray-200 bg-white p-4  md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <input
                    type="checkbox"
                    className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded accent-gray-900 "
                  />
                  <Link href="#" className="shrink-0 md:order-1">
                    <img className="h-30 w-20 " src={offer1} alt="imag" />
                  </Link>

                  <div className="flex items -center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center border border-gray-300 p-1">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center  focus:outline-none focus:ring-2 focus:ring-gray-100 "
                      >
                        <FiMinus />
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 "
                        placeholder=""
                        value="2"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center  focus:outline-none focus:ring-2 focus:ring-gray-100 "
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 ">$45</p>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link
                      href="#"
                      className="text-base font-medium text-gray-900 hover:underline "
                    >
                      Kimchi Tank Mini Dress
                    </Link>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline "
                      >
                        Gray + Tan Combo
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        M
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" border-t  border-gray-200 bg-white p-4  md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <input
                    type="checkbox"
                    className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded accent-gray-900  "
                  />
                  <Link href="#" className="shrink-0 md:order-1">
                    <img className="h-30 w-20 " src={offer1} alt="img" />
                  </Link>

                  <div className="flex items -center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center border border-gray-300 p-1">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center  focus:outline-none focus:ring-2 focus:ring-gray-100 "
                      >
                        <FiMinus />
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 "
                        placeholder=""
                        value="2"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center  focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 ">$45</p>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <Link
                      href="#"
                      className="text-base font-medium text-gray-900 hover:underline "
                    >
                      Kimchi Tank Mini Dress
                    </Link>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline "
                      >
                        Gray + Tan Combo
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                      >
                        M
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $7,592.00
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Discount
                    </dt>
                    <dd className="text-base font-medium text-green-600">
                      -$299.00
                    </dd>
                  </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                  <dt className="text-base font-bold text-gray-900">
                    Grand Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    $8,191.00
                  </dd>
                </dl>
              </div>

              <Link
                to="/cart/checkout"
                className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-primary-300   "
              >
                Checkout now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
