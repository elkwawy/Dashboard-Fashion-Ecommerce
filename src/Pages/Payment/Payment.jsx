import { PiGreaterThanBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import Order from "../../components/Order";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import paypal from "../../assets/images/paypal.png";
import neteller from "../../assets/images/neteller.PNG";

function Payment() {
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
            <Link to="/cart/checkout">
              <span className="flex items-center text-gray-400 hover:text-gray-900">
                Checkout
              </span>
            </Link>
            <PiGreaterThanBold size={15} />
            <span className="flex items-center text-gray-900">Payment</span>
          </li>
        </ol>

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Select payment methods
              </h2>
              <div className="space-y-4 border border-gray-300 rounded-lg ">
                <div className=" border-b py-1 px-4 border-gray-300 md:flex md:items-center md:justify-between md:gap-4 md:space-y-0">
                  <input
                    type="radio"
                    checked="checked"
                    className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded-full focus:bg-black accent-gray-900"
                  />

                  <div className="flex items -center justify-between md:order-3 md:justify-end">
                    <div className="text-end md:order-4 md:w-32">
                      <div class="flex items-center justify-center gap-5">
                        <img class="h-4 w-auto" src={visa} alt="" />

                        <img class="h-4 w-auto" src={mastercard} alt="" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md">
                    <h1
                      href="#"
                      className="text-base font-medium text-gray-900 "
                    >
                      Credit Card
                    </h1>
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                    placeholder="Card number"
                    required
                  />
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                    placeholder="Name on card"
                    required
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        id="your_name"
                        className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                        placeholder="Expiration data (MM/YY)"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        id="your_name"
                        className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                        placeholder="CVV"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-300 p-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <input
                  type="radio"
                  className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded-full focus:bg-black accent-gray-900 "
                />

                <div className="flex items -center justify-between md:order-3 md:justify-end">
                  <div className="text-end md:order-4 md:w-32">
                    <img className="h-4 w-auto" src={paypal} alt="" />
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md">
                  <h1 href="#" className="text-base font-medium text-gray-400 ">
                    Paypal
                  </h1>
                </div>
              </div>
              <div className="space-y-4 rounded-lg border border-gray-300 p-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <input
                  type="radio"
                  className="w-4 h-4  text-gray-900 bg-gray-100 border-gray-300 rounded-full focus:bg-black accent-gray-900"
                />

                <div className="flex items -center justify-between md:order-3 md:justify-end">
                  <div className="text-end md:order-4 md:w-32">
                    <img src={neteller} className="h-4 w-auto" alt="" />
                  </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-1 md:order-2 md:max-w-md">
                  <h1 href="#" className="text-base font-medium text-gray-400 ">
                    Neteller
                  </h1>
                </div>
              </div>
            </div>
            <div className="space-y-4 border border-gray-300 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Billing address
              </h2>
              <div className="flex gap-3">
                <input type="checkbox" className="accent-gray-900" />
                <h1 className="text-sm">Same as my shipping address</h1>
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
                placeholder="Enter your full name"
                required
              />
              <label
                htmlFor="your_name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Street name and house number{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="your_name"
                className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
                placeholder="Enter your Street name and house number"
                required
              />

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
                    className="mb-2 block text-sm font-medium text-gray-900"
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
                    className="mb-2 block text-sm font-medium text-gray-900"
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
                Remember my information
              </h2>
              <div className="flex gap-3">
                <input type="checkbox" className="accent-gray-900" />
                <h1 className="text-sm">
                  Same my information for future checkout
                </h1>
              </div>
            </div>
          </div>

          <Order />
        </div>
      </form>
    </section>
  );
}

export default Payment;
