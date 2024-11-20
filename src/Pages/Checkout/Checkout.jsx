import { PiGreaterThanBold } from "react-icons/pi";

import Order from "../../components/Order";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ol className="items-center flex  w-full max-w-2xl text-center text-sm font-medium text-gray-400 sm:text-base">
          <li className="flex shrink-0 items-center gap-4">
            <Link to="/cart">
              <span className="flex items-center text-gray-400 hover:text-gray-900">
                Cart
              </span>
            </Link>
            <PiGreaterThanBold size={15} />
            <span className="flex items-center text-gray-900">Checkout</span>
            <PiGreaterThanBold size={15} />
            <Link to="/cart/checkout/payment">
              <span className="flex items-center text-gray-400 hover:text-gray-900">
                Payment
              </span>
            </Link>
          </li>
        </ol>

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Select shipping country
              </h2>
              <select className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 ">
                <option value="US">United States</option>
                <option value="AS">Australia</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="UK">United Kingdom</option>
              </select>

              <h2 className="text-xl font-semibold text-gray-900  border-t  border-gray-200  pt-4">
                shipping address
              </h2>
              <label
                htmlFor="your_name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Full name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="your_name"
                className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                placeholder="Enter your full name"
                required
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Confirmation email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                    placeholder="Enter your confirmation email"
                    required
                  />
                </div>
              </div>

              <label
                htmlFor="your_name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Phone number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="your_name"
                className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                placeholder="Enter your phone number (only digits)"
                required
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                    placeholder="City"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900 "
                  >
                    Select region
                  </label>
                  <select className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 ">
                    <option value="US">Muslim</option>
                    <option value="AS">Australia</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>

              <label
                htmlFor="your_name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Postal code <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="your_name"
                className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                placeholder="Enter your postal code"
                required
              />
            </div>
            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Shipping method
              </h2>
              <div className="space-y-4 border border-gray-300 p-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <input
                  type="radio"
                  className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded-full accent-gray-900  "
                />

                <div className="flex items -center justify-between md:order-3 md:justify-end">
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 ">$0</p>
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md">
                  <h1 href="#" className="text-base font-medium text-gray-900 ">
                    Free Shipping
                  </h1>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center text-sm font-medium text-gray-500"
                    >
                      7 - 30 bussiness days
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4 border border-gray-300 p-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <input
                  type="radio"
                  className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded-full accent-gray-900 "
                />

                <div className="flex items -center justify-between md:order-3 md:justify-end">
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 ">$0</p>
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md">
                  <h1 href="#" className="text-base font-medium text-gray-900 ">
                    Free Shipping
                  </h1>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center text-sm font-medium text-gray-500"
                    >
                      7 - 30 bussiness days
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4 border border-gray-300 p-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <input
                  type="radio"
                  className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded-full accent-gray-900 "
                />

                <div className="flex items -center justify-between md:order-3 md:justify-end">
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 ">$0</p>
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md">
                  <h1 href="#" className="text-base font-medium text-gray-900 ">
                    Free Shipping
                  </h1>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center text-sm font-medium text-gray-500"
                    >
                      7 - 30 bussiness days
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Order />
        </div>
      </form>
    </section>
  );
}

export default Checkout;
