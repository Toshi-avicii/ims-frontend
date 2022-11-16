import { useEffect, useState } from "react";
import { useSendToTrashMutation } from "../store/services/leadService";
import EditModal from "./EditModal";
import { toast, ToastContainer } from 'react-toastify';
import { useGetOneCounselorQuery } from "../store/services/counselorService";

function LeadTableRow({ item, index, day, year, month, hour, minute, dayNum }) {
  let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
  ];
  
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteOneLead, response] = useSendToTrashMutation();
  const { data = {} } = useGetOneCounselorQuery(item.counselor);

   
  const updateHandler = (e) => {
    setOpenEditModal(true);
  } 

  const closeModal = (e) => {
    setOpenEditModal(false);
  }

  const deleteHandler = (e) => {
    deleteOneLead(item._id);
  }

  const creationDate = item.movedToTrash === true ? new Date(item.date) : new Date(item.createdAt);
  let dayOfCreation = creationDate.toLocaleDateString(undefined, { day: "numeric" });
  dayOfCreation = Number(dayOfCreation) + 1;
  
  let restDate = creationDate.toString().slice(3, 21);
  useEffect(() => {
    if(response.isLoading && response.status === "pending") {
      toast.loading('Deleting...', {
        theme: 'light',
        toastId: 'Delete-Lead',
        autoClose: 3000
      });
    }
    if(response.isSuccess) {
      toast.update('Delete-Lead', {
        render: "Lead moved to trash Successfully",
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
    }
    if(response.isError) {
      toast.update("Delete-Lead", {
        render: "Error Occurred",
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
  }, [response.isSuccess, response.isError, response.isLoading, response.status]);

  return (
    <>
    <tr className={index % 2 === 0 ? `bg-slate-100` : `bg-white`}>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {index + 1}.
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.name}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.email}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.phone}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {/* {days[dayOfCreation]}, {dayNum}-{month + 1 < 10 ? `0${month}` : month + 1}-{year} */}
        {days[dayOfCreation]}, 
        <br />
        {/* {hour > 11 ? hour - 12 : hour}:{minute < 10 ? `0${minute}` : minute}
        {hour > 11 ? " PM" : " AM"} */}

      {restDate}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm uppercase">
        {item.course}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-xs font-medium uppercase">
        <span
          className={`px-4 text-xs py-2 rounded-sm text-white 
            ${
                item.status === "Pending" &&
                `bg-yellow-600`
            }
            ${
                item.status === "Resolved" &&
                `bg-emerald-600`
            }
            ${
                item.status === "Rejected" &&
                `bg-rose-700`
            }
            `}
        >
          {item.status}
        </span>
      </td>
      <td className="px-5 py-8 text-left text-sm">{item.title}</td>
      <td className="px-5 py-8 text-left text-sm">{item.description}</td>
      {item.reference ? (
        <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
          {item.reference.name === "" ? "No one" : item.reference.name}, <br />
          {item.reference.phoneNo === "" ? "No number" : item.reference.phoneNo}
        </td>
      ) : (
        <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
          No One
        </td>
      )}

      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {data.data ? data.data.name : "Not Available"}
      </td>

      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        <button
          className="bg-primary text-white px-6 py-2 rounded"
          onClick={updateHandler}
        >
          Edit
        </button>
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded"
          onClick={deleteHandler}
        >
          Move To Trash
        </button>
        <ToastContainer />
      </td>
    </tr>
    {
        openEditModal && 
            <EditModal  
                name={item.name}
                phone={item.phone}
                email={item.email}
                course={item.course}
                status={item.status}
                title={item.title}
                desc={item.description}
                id={item._id}
                reference={item.reference}
                closeModal={closeModal}
            />
    }
    </>
  );
}

export default LeadTableRow;
