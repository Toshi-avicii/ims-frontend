import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useUpdateOneLeadMutation } from "../store/services/leadService";
import TextInput from "./General/TextInput";
import { toast, ToastContainer } from 'react-toastify';

function EditModal({
  name,
  phone,
  email,
  course,
  status,
  title,
  desc,
  closeModal,
  id,
  reference
}) {
    
  // const modalRef = useRef(null);
  const navigate = useNavigate();
  let leadReference = reference ? reference : {
    name: '',
    phoneNo: ''
  }
  
  const [modalData, setModalData] = useState({
    leadName: name,
    leadPhone: phone,
    leadEmail: email,
    leadCourse: course,
    leadStatus: status,
    leadTitle: title,
    leadDesc: desc,
    leadId: id,
    leadRefName: leadReference.name,
    leadRefPhone: leadReference.phoneNo
  });

  const [updateLead, response] = useUpdateOneLeadMutation();

  const changeLead = (e) => {
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const changeLeadDesc = (e) => {
    setModalData({ ...modalData, leadDesc: e.target.value });
  };

  const updateLeadHandler = (e) => {
    e.preventDefault();
    updateLead({
      title: modalData.leadTitle,
      name: modalData.leadName,
      status: modalData.leadStatus,
      description: modalData.leadDesc,
      phone: modalData.leadPhone,
      course: modalData.leadCourse,
      email: modalData.leadEmail,
      leadId: modalData.leadId,
      refName: modalData.leadRefName,
      refPhone: modalData.leadRefPhone
    });
  };

  useEffect(() => {
    if(response.isLoading && response.status === "pending") {
      toast.loading('Result Pending', {
        theme: 'colored',
        toastId: 'update-lead',
        autoClose: 3000
      });
    }
    if(response.isSuccess) {
      toast.update('update-lead', {
        render: "Lead Updated Successfully",
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        theme: 'colored'
      });

      navigate('/dashboard');
    }
    
    if(response.isError) {
      toast.update("update-lead", {
        render: "Error Occurred",
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        theme: 'colored'
      });
    }
  }, [response.isSuccess, navigate, response.isError, response.isLoading, response.status]);

  return createPortal(
    <div className="fixed top-0 left-0 py-4 w-screen min-h-screen bg-gray-200 items-center z-10">
      <div className="w-screen h-screen flex justify-center items-center overflow-y-auto">
        <div className="bg-white rounded shadow lg:w-2/5 overflow-y-auto h-screen w-[90%]">
          <div className="border-b-2 border-y-slate-500 p-3 flex justify-between items-center">
            <h2>Edit Lead</h2>
            <button onClick={closeModal} className="bg-gray-300 px-2">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={updateLeadHandler}>
              <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
                <TextInput
                  labelText="Lead Name"
                  inputType="text"
                  inputName="leadName"
                  inputPlaceholder="Name here"
                  changeEvent={changeLead}
                  inputValue={modalData.leadName}
                  width="w-full"
                />

                <TextInput
                  labelText="Lead Email"
                  inputType="email"
                  inputName="leadEmail"
                  inputPlaceholder="Email here"
                  changeEvent={changeLead}
                  inputValue={modalData.leadEmail}
                  width="w-full"
                />
              </div>
              <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
                <TextInput
                  labelText="Lead Phone no."
                  inputType="tel"
                  inputName="leadPhone"
                  inputPlaceholder="Phone no. here"
                  changeEvent={changeLead}
                  inputValue={modalData.leadPhone}
                  width="w-full"
                />
                <div className="w-full">
                  <label htmlFor="course">Lead Course</label>
                  <select
                    id="course"
                    className="block w-full p-4 bg-slate-50 outline-none rounded-lg"
                    value={modalData.leadCourse}
                    onChange={changeLead}
                    name="leadCourse"
                  >
                    <option value="it expert">IT Expert</option>
                    <option value="dca">DCA</option>
                    <option value="ms office">MS Office</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-4" htmlFor="leadStatus">
                  Lead Status
                </label>
                <select
                  id="role"
                  className="block w-full p-4 bg-slate-50 outline-none mt-4 rounded-lg"
                  value={modalData.leadStatus}
                  onChange={changeLead}
                  name="leadStatus"
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
                  <TextInput
                        labelText="Reference name"
                        inputType="text"
                        inputName="leadRefName"
                        inputPlaceholder="Reference name"
                        changeEvent={changeLead}
                        inputValue={modalData.leadRefName}
                        width="w-full"
                   />

                    <TextInput
                        labelText="Reference phone no."
                        inputType="text"
                        inputName="leadRefPhone"
                        inputPlaceholder="Reference phone no."
                        changeEvent={changeLead}
                        inputValue={modalData.leadRefPhone}
                        width="w-full"
                    />
              </div>

              <TextInput
                labelText="Lead Title"
                inputType="text"
                inputName="leadTitle"
                inputPlaceholder="Title here"
                changeEvent={changeLead}
                inputValue={modalData.leadTitle}
              />

              <div>
                <label className="block mb-4" htmlFor="leadDesc">
                  Lead Description
                </label>
                <textarea
                  id="leadDesc"
                  placeholder="description here"
                  onChange={changeLeadDesc}
                  value={modalData.leadDesc}
                  className="bg-slate-50 min-h-[200px] w-full p-4 focus:outline-0 focus-within:bg-slate-100 rounded-lg"
                ></textarea>
              </div>
              <div className="mt-3">
                <input
                  type="submit"
                  value="Submit"
                  className="bg-primary text-white w-full px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>,
    document.getElementById("portal")
  );
}

export default EditModal;
