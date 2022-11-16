import { useState, useEffect, useRef } from "react";
import TextInput from "./General/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useAddCounselorMutation } from "../store/services/counselorService";
import inptDefaultImg from "../Pictures/person-circle.svg";

function CounselorsAddForm() {
  const [addCounselor, setAddCounselor] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    photo: "",
  });

  const [inptFilePhoto, setInptFilePhoto] = useState(inptDefaultImg);

  const [postCounselor, response] = useAddCounselorMutation();
  const inptRef = useRef(null);

  const changeCounselor = (e) => {
    setAddCounselor({ ...addCounselor, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    setAddCounselor({ ...addCounselor, photo: e.target.files[0] });
    if (e.target.files && e.target.files[0]) {
      setInptFilePhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      console.log("img not set");
    }
  };

  //for resetting of  file input
  const resetFileInpt = () => {
    inptRef.current.value = null;
    setInptFilePhoto("");
    
  };

  const [passAlert, setPassAlert] = useState(false);
  const [cpassAlert, setCpassAlert] = useState(false);
  const [cpassLengthAlert, setCpassLengthAlert] = useState(false);
  const [passLengthAlert, setPassLengthAlert] = useState(false);

  const addCounselorHandler = (e) => {
    e.preventDefault();
    if (addCounselor.password !== "") {
      if (addCounselor.password.length >= 6) {
        if (addCounselor.cPassword !== "") {
          if (addCounselor.password === addCounselor.cPassword) {
            setCpassAlert(false);
            setPassAlert(false);
            setPassLengthAlert(false);

            let formData = new FormData();
            formData.append("name", addCounselor.name);
            formData.append("email", addCounselor.email);
            formData.append("password", addCounselor.password);
            formData.append("photo", addCounselor.photo);
            postCounselor(formData);
            setAddCounselor({
              name: "",
              email: "",
              password: "",
              cPassword: "",
              photo: "",
            });
          } else {
            setCpassAlert(true);
            setCpassLengthAlert(false);
            setPassAlert(false);
            setPassLengthAlert(false);
          }
        } else {
          setCpassLengthAlert(true);
          setCpassAlert(false);
        }
      } else {
        setPassLengthAlert(true);
        setPassAlert(false);
      }
    } else {
      setPassAlert(true);
      setPassLengthAlert(false);
    }
  };

  useEffect(() => {
    if (response.isLoading && response.status === "pending") {
      toast.loading("Result Pending", {
        theme: "colored",
        toastId: "Add-Lead",
        autoClose: 3000,
      });
    }
    if (response.isSuccess) {
      toast.update("Add-Lead", {
        render: "Counselor Added Successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    }
    if (response.isError) {
      toast.update("Add-Lead", {
        render: "Error Occurred",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    }
  }, [
    response.isSuccess,
    response.isError,
    response.isLoading,
    response.status,
  ]);

  return (
    <div className="bg-slate-100 p-5 lg:p-8 md:p-5 sm:p-5 w-full lg:w-9/12 md:w-full sm:w-full rounded-md">
      <div className="">
        <form onSubmit={addCounselorHandler} encType="multipart/form-data">
          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Counselor Name"
              inputType="text"
              inputName="name"
              inputPlaceholder="Name here"
              changeEvent={changeCounselor}
              inputValue={addCounselor.name}
              onFocus={true}
              width="w-full"
            />

            <TextInput
              labelText="Counselor Email"
              inputType="email"
              inputName="email"
              inputPlaceholder="Email here"
              changeEvent={changeCounselor}
              inputValue={addCounselor.email}
              onFocus={true}
              width="w-full"
            />
          </div>

          <TextInput
            labelText="Password"
            inputType="password"
            inputName="password"
            inputPlaceholder="Password"
            changeEvent={changeCounselor}
            inputValue={addCounselor.password}
            onFocus={true}
            width="w-full"
          />
          {passAlert && (
            <p className="text-red-500 text-xs italic -mt-4 mb-5 ml-2">
              Please choose a password.
            </p>
          )}
          {passLengthAlert && (
            <p className="text-red-500 text-xs italic -mt-4 mb-5 ml-2">
              Password must contain min 6 characters.
            </p>
          )}

          <TextInput
            labelText="Confirm Password"
            inputType="Password"
            inputName="cPassword"
            inputPlaceholder="Confirm Password"
            changeEvent={changeCounselor}
            inputValue={addCounselor.cPassword}
            onFocus={true}
            width="w-full"
          />

          {cpassLengthAlert && (
            <p className="text-red-500 text-xs italic -mt-4 mb-5 ml-2">
              please choose Confirm password.
            </p>
          )}
          {cpassAlert && (
            <p className="text-red-500 text-xs italic -mt-4 mb-5 ml-2">
              Confirm password did not match.
            </p>
          )}

          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Counselor Photo"
              inputType="file"
              inputName="photo"
              changeEvent={handlePhoto}
              onFocus={true}
              width="w-full"
              elRef={inptRef}
            />
            <div className="-mr-[75%]">
              <img
                src={inptFilePhoto}
                alt=""
                width="50"
                height="50"
                className="bg-black shadow"
              />
            </div>
          </div>
          <div className="mt-3">
            <input
              type="submit"
              value="Submit"
              className="bg-primary text-xl text-white w-full p-3 rounded cursor-pointer hover:bg-blue-600"
              onClick={resetFileInpt}
            />
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CounselorsAddForm;
