import { Button, Label, Spinner, TextInput, Toast } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        setTimeout(() => {
          toast.success("Signup successfuly!");
          navigate("/sign-in");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-[400px] mx-auto flex-col md:flex-row md:items-center gap-5 border border-1 p-5 rounded-lg">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                name="username"
                placeholder="Username"
                id="username"
                value={formData.username}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="text"
                name="email"
                placeholder="name@company.com"
                id="email"
                value={formData.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="text"
                name="password"
                placeholder="Password"
                id="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>
            <Button color={"blue"} type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
