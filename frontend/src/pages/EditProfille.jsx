import { Avatar, Button, Select, Spinner, Textarea } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../redux/user/userSlice";
import CustomToast from "../components/CustomToast";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const [input, setInput] = useState({
    profilePhoto: currentUser?.user?.profilePicture,
    bio: currentUser?.user?.bio,
    gender: currentUser?.user?.gender || "",
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  };
  console.log(currentUser);
  const selectChangeHandler = (e) => {
    setInput({ ...input, gender: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.bio || !input.gender) {
      return CustomToast("Please fill out all fields.");
    }
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilePicture", input.profilePhoto);
    }
    try {
      setLoading(true);
      const res = await fetch("/api/user/profile/edit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data, "data");
      if (res.ok) {
        const updatedUserData = {
          ...currentUser,
          user: {
            ...currentUser?.user,
            bio: data?.user?.bio,
            gender: data?.user?.gender,
            profilePicture: data?.user?.profilePicture,
          },
        };
        dispatch(authUser(updatedUserData));
        CustomToast(data.message);
        setTimeout(() => {
          navigation(`/profile/${currentUser?.user?.id}`);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      CustomToast(data.messasge);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="border max-w-3xl w-full p-5">
        <h1 className="font-semibold mb-5 text-[20px]">Edit Profile</h1>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between items-center p-5 bg-slate-200 dark:bg-slate-700 rounded-md">
            <div className="flex gap-3">
              <Avatar
                placeholderInitials="CN"
                className="object-cover"
                img={currentUser?.user?.profilePicture}
                rounded
                alt="Profile Picture"
                size={isMobile ? "md" : "lg"}
                shadow="md"
              />
              <div className="font-medium dark:text-white ">
                <h1 className="text-[15px]  sm:mb-2 sm:text-[20px]">
                  {currentUser?.user?.username}
                </h1>
                <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">
                  {currentUser?.user?.bio}
                </p>
              </div>
            </div>
            <div>
              <input
                ref={imageRef}
                onChange={fileChangeHandler}
                type="file"
                className="hidden"
              />
              <Button
                className="bg-[#0095F6]"
                size={isMobile && "xs"}
                onClick={() => imageRef?.current.click()}
              >
                Change Photo
              </Button>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-2 mt-3">Bio</h1>
            <Textarea
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
              name="bio"
              className="focus-visible:ring-transparent"
            />
          </div>
          <div>
            <h1 className="font-bold mb-2 mt-2">Gender</h1>
            <Select
              value={input.gender}
              onChange={selectChangeHandler}
              required
            >
              <option disabled value="">
                Choose a Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
          <div className="mt-5">
            <Button className="bg-[#0095F6] w-full" type="submit">
              {loading ? (
                <>
                  <Spinner size={"md"} />
                  Loading...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
