import { useCallback, useEffect, useState } from "react";
import addImg from "../../assets/avater/update1.svg";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import SubmitButton from "../../components/Form/SubmitButton";
import { useDispatch } from "react-redux";
import { addNewAdmin } from "../../redux/slices/adminsSlice";

const AddNewAdmin = () => {
      const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "admin",
      });
      const [loading, setLoading] = useState(false);
      const [accept, setAccept] = useState(false);
      const [emailError, setEmailError] = useState("");
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const dispatch = useDispatch();

      useEffect(() => {
        emailRegex.test(form.email)
          ? setEmailError("")
          : setEmailError("Invalid email address");
      }, [form.email]);
    
      const handleFormChange = useCallback((e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      }, [form]);

      const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setAccept(true);
        if (
          form.password !== form.passwordConfirm ||
          form.password?.length < 8 ||
          form.name?.length < 1 ||
          !emailRegex.test(form.email)
        ) {
          setLoading(false);
          return;
        }
        // Add new admin
        try {
          // Wait for dispatch to finish
          await dispatch(addNewAdmin(form)).unwrap();
        } catch (error) {
          console.error("Error adding admin:", error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <section>
              <div className="bg-white rounded-xl p-6 space-y-4">
                <div className="">
                  <h2 className="text-xl font-semibold mb-2">Create a new admin</h2>
                  <p className="text-gray-500 text-lg">
                    Fill in the information below to add a new admin
                  </p>
                </div>
        
                <div className="flex justify-between gap-8">
                    <img
                        src={addImg}
                        alt="Create User"
                        className="w-[36%] -mt-8 max-md:hidden "
                    />
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 w-full lg:w-[45%] max-md:w-full"
                  >
                    <InputField
                      type="text"
                      name="name"
                      label="Name"
                      value={form.name}
                      placeholder="Enter your name"
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
                    <div className="w-full text-right">
                        <SubmitButton isLoading={loading} text="Add admin" />
                    </div>
                  </form>
                </div>
              </div>
            </section>
    )
}

export default AddNewAdmin