import { useEffect, useState } from "react";
import { useAddLeadsMutation } from "../store/services/leadService";
import TextInput from "./General/TextInput";
import { useDispatch } from 'react-redux';
import { sendSuccessAlert, sendFailureAlert, sendLoadingAlert } from "../store/reducers/globalReducer";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function LeadsAddForm() {
  const [addLeads, setAddLeads] = useState({
    name: "",
    leadPhone: "",
    leadEmail: "",
    courseName: "it expert",
    leadTitle: "",
    leadDesc: "",
    refName: "",
    refPhone: "",
  });

  const [postLeads, response] = useAddLeadsMutation();
  const dispatch = useDispatch();

  const changeLead = (e) => {
    setAddLeads({ ...addLeads, [e.target.name]: e.target.value });
  };
  
  const changeLeadDesc = (e) => {
    setAddLeads({ ...addLeads, leadDesc: e.target.value });
  };

  const addLeadHandler = (e) => {
    e.preventDefault();
    postLeads(addLeads);
  }

  useEffect(() => {
    if(response.isLoading && response.status === "pending") {
      dispatch(sendLoadingAlert());
      toast.loading('Result Pending', {
        theme: 'colored',
        toastId: 'Add-Lead',
        autoClose: 3000
      });
    }
    if(response.isSuccess) {
      dispatch(sendSuccessAlert());
      toast.update('Add-Lead', {
        render: "Lead Added Successfully, Check your email",
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        theme: 'colored'
      });
    }
    if(response.isError) {
      dispatch(sendFailureAlert());
      toast.update("Add-Lead", {
        render: "Error Occurred",
        type: 'error',
        isLoading: false,
        autoClose: 3000,
        theme: 'colored'
      });
    }
  }, [dispatch, response.isSuccess, response.isError, response.isLoading, response.status])

  return (
    <div className="bg-slate-100 p-5 lg:p-8 md:p-5 sm:p-5 w-full lg:w-9/12 md:w-full sm:w-full rounded-md">
      <div className="">
        <form onSubmit={addLeadHandler}>
          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Lead Name"
              inputType="text"
              inputName="name"
              inputPlaceholder="Name here"
              changeEvent={changeLead}
              inputValue={addLeads.name}
              width="w-full"
            />

            <TextInput
              labelText="Lead Email"
              inputType="email"
              inputName="leadEmail"
              inputPlaceholder="Email here"
              changeEvent={changeLead}
              inputValue={addLeads.leadEmail}
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
              inputValue={addLeads.leadPhone}
              width="w-full"
            />
            <div className="w-full">
              <label htmlFor="course">Lead Course</label>
              <select
                id="course"
                className="block w-full p-4 bg-slate-50 outline-none rounded-lg"
                value={addLeads.courseName}
                onChange={changeLead}
                name="courseName"
              >
                <option value="it expert">IT Expert</option>
                <option value="dca">DCA</option>
                <option value="ms office">MS Office</option>
              </select>
            </div>
          </div>

          <div className="md:grid md:place-items-center md:grid-cols-2 md:gap-4">
            <TextInput
              labelText="Reference name"
              inputType="text"
              inputName="refName"
              inputPlaceholder="Reference name"
              changeEvent={changeLead}
              inputValue={addLeads.refName}
              width="w-full"
            />

            <TextInput
              labelText="Reference phone no."
              inputType="text"
              inputName="refPhone"
              inputPlaceholder="Reference phone no."
              changeEvent={changeLead}
              inputValue={addLeads.refPhone}
              width="w-full"
            />
          </div>

          <TextInput
            labelText="Lead Title"
            inputType="text"
            inputName="leadTitle"
            inputPlaceholder="Title here"
            changeEvent={changeLead}
            inputValue={addLeads.leadTitle}
          />

          <div>
            <label className="block mb-4" htmlFor="leadDesc">
              Lead Description
            </label>
            <textarea
              id="leadDesc"
              placeholder="description here"
              onChange={changeLeadDesc}
              value={addLeads.leadDesc}
              className="bg-slate-50 min-h-[50px] w-full p-4 focus:outline-0 focus-within:bg-slate-100 rounded-lg"
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
        <ToastContainer />
      </div>
    </div>
  );
}

export default LeadsAddForm;
