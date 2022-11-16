import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../General/TextInput";
import { useUpdateUserProfileMutation, useGetUserProfileQuery } from "../../store/services/profileService";

function ProfileEditForm() {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    photo: "",
  });

  const [userImg, setUserImg] = useState("");

  const changeEvent = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setUserDetail({ ...userDetail, photo: e.target.files[0] });
  };

  const token = useSelector((state) => state.authReducer.adminToken);
  const decode = jwtDecode(token);
  const userId = decode.id;

  const { data, isFetching } = useGetUserProfileQuery(decode);
  const [updateProfile, response] = useUpdateUserProfileMutation();
  
  const updateHandler = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('photo', userDetail.photo);
    formData.append('name', userDetail.name);
    formData.append('email', userDetail.email);
    let obj = {
      id: userId,
      name: userDetail.name,
      email: userDetail.email,
      photo: userDetail.photo
    };

    updateProfile(formData);
  }

  useEffect(() => {
    if (!isFetching) {
      console.log(response)
      // console.log(data);
      if(data) {
        setUserDetail({
          name: data.data.name,
          email: data.data.email
        });
        if(!data.data.photo.startsWith('http://')) {
          setUserImg(`http://localhost:5000/${data.data.photo}`);
        } else {
          setUserImg(data.data.photo);
        }
      }

    }
  }, [data, isFetching, response]);

  return (
    <>
      <div className="bg-slate-100 p-5 lg:p-8 w-full lg:w-9/12 md:w-full sm:w-full rounded-md m-auto">
        <form onSubmit={updateHandler} encType="multipart/form-data">
          <div className="">
            <TextInput
              labelText={"Name:"}
              inputType="text"
              inputName="name"
              inputPlaceholder={""}
              changeEvent={changeEvent}
              inputValue={userDetail.name}
              width={""}
              onFocus={true}
            />
            <TextInput
              labelText={"Email:"}
              inputType="email"
              inputName="email"
              inputPlaceholder={""}
              changeEvent={changeEvent}
              inputValue={userDetail.email}
              onFocus={true}
              width={""}
            />
            <div className="relative">
              <div className="absolute right-1 sm:right-5 bottom-4 sm:bottom-2">
                <img
                  src={userImg}
                  className="w-[35px] sm:w-[45px] h-[30px] sm:h-[30px] rounded-[50%]"
                  alt="userImg"
                />
              </div>
              <div>
                <TextInput
                  labelText="Image:"
                  inputType="file"
                  inputName="photo"
                  changeEvent={handlePhoto}
                  width="w-full"
                />
              </div>
            </div>
            <input
              className="text-xl bg-primary hover:bg-sky-500 
                        active:bg-sky-700 focus:outline-none 
                        focus:ring focus:ring-sky-3 
                        w-full p-3 rounded-md mt-4"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileEditForm;
