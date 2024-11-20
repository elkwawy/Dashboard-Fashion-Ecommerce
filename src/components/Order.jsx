import { Link } from "react-router-dom";
import offer1 from "../assets/images/offer1.png";

function Order() {
  return (
    <>
      <div class="border border-gray-300 p-4 rounded-lg mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-md xl:max-w-md">
        <h2 class="text-xl font-semibold text-gray-900">Your Order</h2>
        <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-4 md:space-y-0">
          <Link href="#" className="shrink-0 md:order-1">
            <img className="h-30 w-20 " src={offer1} alt="imaige" />
          </Link>

          <div class="flex items-center justify-between md:order-3 md:justify-end">
            <div class="text-end md:order-4 md:w-32">
              <p class="text-base font-bold text-gray-900 ">$45.00</p>
            </div>
          </div>

          <div class="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
            <h1
              href="#"
              className="text-base font-medium text-gray-900 hover:underline "
            >
              Kimchi Tank Mini
            </h1>

            <div class="flex items-center gap-4">
              <button
                type="button"
                class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline "
              >
                Gray + Tan Combo
              </button>

              <button
                type="button"
                class="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
              >
                M
              </button>
            </div>
            <h1 href="#" className="text-base font-medium text-gray-900  ">
              x1
            </h1>
          </div>
        </div>
        <label
          for="your_name"
          class="block text-sm font-bold text-gray-900 border-t pt-6 mt-6"
        >
          Discount Code
        </label>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="col-span-2">
            <input
              type="text"
              id="your_name"
              class="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900"
              placeholder="Add discount code"
              required
            />
          </div>

          <div>
            <button class="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-400">
              Apply
            </button>
          </div>
        </div>
        <div class="space-y-4">
          <div class="space-y-2">
            <h1 className="text-base font-bold text-gray-900 border-b pb-6 mb-6 ">
              New customer? {""}
              <Link className="text-base font-semibold text-gray-500 underline">
                Sign up {""}
              </Link>
              <span className="text-base font-semibold text-gray-500">
                to get better offer
              </span>
            </h1>
            <dl class="flex items-center justify-between gap-4">
              <dt class="text-base font-normal text-gray-500 ">Subtotal</dt>
              <dd class="text-base font-medium text-gray-900 ">$7,592.00</dd>
            </dl>
            <dl class="flex items-center justify-between gap-4">
              <dt class="text-base font-normal text-gray-500">Discount</dt>
              <dd class="text-base font-medium text-gray-500">-$0</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4">
              <dt class="text-base font-normal text-gray-500 ">
                Shipment cost
              </dt>
              <dd class="text-base font-medium text-gray-500">-$299.00</dd>
            </dl>
          </div>

          <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-6 mt-6 ">
            <dt class="text-base font-bold text-gray-900 ">Grand Total</dt>
            <dd class="text-base font-bold text-gray-900 ">$8,191.00</dd>
          </dl>
        </div>

        <Link
          to="/cart/checkout/payment"
          className="flex w-4/5 mx-auto items-center justify-center rounded-lg bg-gray-900 px-5 py-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-primary-300   "
        >
          Continue to payment
        </Link>
      </div>
    </>
  );
}

export default Order;
