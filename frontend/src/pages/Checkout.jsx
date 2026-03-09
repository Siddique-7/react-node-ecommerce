import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import useAuth from "../context/AuthContext";
import useCart from "../context/CartContext";

const Checkout = () => {
  const { items, getCartTotal } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const formikRef = useRef();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login")
    } else if (items.length === 0) {
       navigate("/cart")
  }
}, [user, items, loading, navigate]);

  const subtotal = getCartTotal();
  const shipping = subtotal >= 500 ? 0 : 50;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10,}$/, "Invalid phone")
      .required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
    postalCode: Yup.string().required("Postal code is required"),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center mb-8">
            <FiMapPin className="mr-3 text-2xl text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-700">Shipping Information</h2>
          </div>

          <Formik
            innerRef={formikRef}
            enableReinitialize
            initialValues={{
              fullName: user?.name || "",
              email: user?.email || "",
              phone: user?.phone || "",
              address: user?.address?.street || "",
              city: user?.address?.city || "",
              state: user?.address?.state || "",
              postalCode: user?.address?.postalCode || "",
              country: user?.address?.country || "India",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              navigate("/payment", {
                state: {
                  shippingAddress: values,
                  totalAmount: total,
                },
              });
            }}
          >
            {() => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/** Full Name */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">Full Name</label>
                    <Field
                      name="fullName"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/** Email */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/** Phone */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">Phone</label>
                    <Field
                      name="phone"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/** Postal Code */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">Postal Code</label>
                    <Field
                      name="postalCode"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="postalCode"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/** Address */}
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-gray-600 font-medium">Address</label>
                    <Field
                      name="address"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="address"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/** City */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">City</label>
                    <Field
                      name="city"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="city"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/** State */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">State</label>
                    <Field
                      name="state"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="state"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                {/** Country */}
                  <div>
                    <label className="block mb-2 text-gray-600 font-medium">Country</label>
                    <Field
                      name="country"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="country"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-h-[calc(80vh-100px)] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">
                Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} items)
              </span>
              <span className="font-medium">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span className="font-medium">₹{tax.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-semibold mb-4 text-gray-800">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          {subtotal < 500 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                Add ₹{(500 - subtotal).toFixed(2)} more to get free shipping!
              </p>
            </div>
          )}
       <button
         type="button"
         onClick={() => formikRef.current?.submitForm()}
         className="mt-auto w-full bg-blue-600 text-white py-4 rounded-xl text-lg       font-semibold hover:bg-blue-700 transition"
       >
         Continue to Payment ₹{total.toFixed(2)}
       </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;