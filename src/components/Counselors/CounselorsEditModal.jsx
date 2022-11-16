import { useState } from "react";
import { createPortal } from "react-dom";
import { useUpdateCounselorMutation } from "../../store/services/counselorService";
import TextInput from "../General/TextInput";

function CounselorsEditModal({ closeModal, name, email, photo, id }) {
    const [userDetail, setUserDetail] = useState({
        id,
        name,
        email,
        photo
    });

    const [updateCounelor, response] = useUpdateCounselorMutation();
    
    const updateCounelorHandler = (e) => {
        e.preventDefault();
        updateCounelor({
            id: userDetail.id,
            name: userDetail.name,
            email: userDetail.email,
            photo: userDetail.photo
        });
        console.log(response);
    }

    const changeEvent = (e) => {
        setUserDetail({ ...userDetail, [e.target.name]: e.target.value })
    };

    const handlePhoto = (e) => {
        setUserDetail({ ...userDetail, photo: e.target.file[0] });
    };

  return createPortal(
    <div className="fixed top-0 left-0 py-4 w-screen min-h-screen bg-gray-200 items-center z-10">
        <div className="w-screen px-4 h-screen flex justify-center items-center overflow-y-auto">
            <div className="bg-slate-100 px-5 py-8 lg:p-8 w-[90%] lg:w-[40%] md:w-[70%] sm:w-[80%] rounded-md m-auto">
            <div className="border-b-2 mb-8 border-y-slate-500 p-3 flex justify-between items-center">
            <h2>Edit Lead</h2>
            <button onClick={closeModal} className="bg-gray-300 px-2">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
            <form onSubmit={updateCounelorHandler} encType="multipart/form-data">
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
                    src={`http://localhost:5000/${userDetail.photo}`}
                    className="w-[35px] sm:w-[45px] h-[30px] sm:h-[45px]"
                    alt="pic"
                    />
                </div>
                <div>
                    <TextInput
                    labelText="Image:"
                    inputType="file"
                    inputName="photo"
                    changeEvent={handlePhoto}
                    width="w-full"
                    onFocus={true}
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
        </div>
    </div>, document.getElementById('edit-counselor')
  )
}

export default CounselorsEditModal;