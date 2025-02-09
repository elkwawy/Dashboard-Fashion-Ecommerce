import { useState } from "react";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import SubmitButton from "../../components/Form/SubmitButton";
import { useLocation } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";
import updateImg from "../../assets/avater/Update-cuate.svg";
export default function UpdateUser() {
  const { updateUser } = useUserHook();

  const location = useLocation();
  const userData = location.state?.user;
  console.log(userData);

  const [form, setForm] = useState({
    name: userData.name || "",
    email: userData.email || "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAccept(true);

    if (
      form.name.length < 1 ||
      form.password.length < 8 ||
      form.password !== form.passwordConfirm
    ) {
      setLoading(false);
      return;
    }

    updateUser(userData._id, form, setLoading);
  };
  return (
    <section>
      <div className="bg-white rounded-xl p-6 space-y-4">
        <div className="">
          <h2 className="text-xl font-semibold mb-2">Update user data</h2>
          <p className="text-gray-500 text-lg">
            Edit the information below to update your user data
          </p>
        </div>
        <div className="flex justify-between gap-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 w-full lg:w-[45%] max-md:w-full"
          >
            <InputField
              type="text"
              name="name"
              label="Name"
              value={form.name}
              placeholder="Enter your full name"
              onChange={handleFormChange}
              errorValidation={accept && form.name.length < 1}
              errorMessage="Name is required"
            />
            <InputField
              type="email"
              name="email"
              label="Email"
              value={form.email}
              placeholder="Enter your email address"
              onChange={handleFormChange}
              errorValidation={accept && emailError.length > 0}
              errorMessage={emailError}
            />
            <PasswordField
              name="password"
              value={form.password}
              label="Password"
              placeholder="Enter a strong password"
              onChange={handleFormChange}
              errorValidation={accept && form.password.length < 8}
              errorMessage="Password must be more than 8 char"
            />
            <PasswordField
              name="passwordConfirm"
              value={form.passwordConfirm}
              label="Confirm password"
              placeholder="Re-enter your password"
              onChange={handleFormChange}
              errorValidation={accept && form.password !== form.passwordConfirm}
              errorMessage="Passwords must be the same"
            />
            <SubmitButton isLoading={loading} text="Update User" />
          </form>
          <img
            src={updateImg}
            alt="Create User"
            className="w-[40%] -mt-8 max-md:hidden "
          />
        </div>
      </div>
    </section>
  );
}
