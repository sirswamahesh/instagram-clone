import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../redux/user/userSlice";
import CustomToast from "../components/CustomToast";
function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return alert("Please fill out all fields.");
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      if (res.ok) {
        CustomToast("Login successfuly!");
        console.log(data);
        dispatch(authUser(data));
        setTimeout(() => {
          setLoading(false);
          navigation("/");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="min-h-screen mt-20">
        <div className="max-w-[400px] mx-auto flex-col md:flex-row md:items-center gap-5 border border-1 p-5 rounded-lg">
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                  type="password"
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
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </div>
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
