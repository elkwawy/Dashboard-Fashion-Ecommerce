import { useEffect, useState } from "react";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import SubmitButton from "../../components/Form/SubmitButton";
import { useLocation } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";
export default function UpdateUser() {
  const { getUser, updateUser } = useUserHook();
  const [form, setForm] = useState({
    name: "",
    email: "",
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
  const [passType, setPassType] = useState("password");
  const [confirmpassType, setconfirmPassType] = useState("password");
  const togglePassType = () =>
    setPassType(passType === "password" ? "text" : "password");
  const toggleconfirmPassType = () =>
    setconfirmPassType(confirmpassType === "password" ? "text" : "password");

  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState("");
  const id = useLocation().pathname.split("/").pop();

  useEffect(() => {
    getUser(id, setForm);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAccept(true);

    if (
      form.password !== form.passwordConfirm ||
      form.password.length < 8 ||
      form.name.length < 1
    ) {
      setLoading(false);
      return;
    }

    updateUser(id, form, setLoading);
  };
  return (
    <section>
      <div className="bg-white rounded-xl px-4 py-6  space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Update user data</h2>
          <p className="text-gray-500 text-lg">
            Edit the information below to update your user data
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 md:w-4/5 lg:w-2/3 mx-auto"
        >
          <InputField
            type="text"
            id="name"
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
            id="email"
            name="email"
            label="Email"
            value={form.email}
            placeholder="Enter your email address"
            onChange={handleFormChange}
            errorValidation={accept && emailError.length > 0}
            errorMessage={emailError}
          />
          <PasswordField
            id="password"
            name="password"
            value={form.password}
            label="Password"
            placeholder="Enter a strong password"
            onChange={handleFormChange}
            type={passType}
            toggleType={togglePassType}
            errorValidation={accept && form.password.length < 8}
            errorMessage="Password must be more than 8 char"
          />
          <PasswordField
            id="passwordConfirm"
            name="passwordConfirm"
            value={form.passwordConfirm}
            label="Confirm password"
            placeholder="Re-enter your password"
            onChange={handleFormChange}
            type={confirmpassType}
            toggleType={toggleconfirmPassType}
            errorValidation={accept && form.password !== form.passwordConfirm}
            errorMessage="Passwords must be the same"
          />
          <SubmitButton isLoading={loading} text="Update User" />
        </form>
      </div>
    </section>
  );
}
