import { useEffect } from "react";
import { useDeletePermanentlyMutation, useRecoverFromTrashMutation } from "../store/services/trashService";
import { toast, ToastContainer } from 'react-toastify';

function LeadTrashTableRow({ item, index, day, year, month, hour, minute, dayNum }) {
  let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
  ];

  const [deleteOneLead, response] = useDeletePermanentlyMutation();
  const [recoverOneLead, responseFromMutation] = useRecoverFromTrashMutation();

  const creationDate = item.movedToTrash === true ? new Date(item.leadDate) : new Date(item.createdAt);
  let dayOfCreation = creationDate.toLocaleDateString(undefined, { day: "numeric" });
  dayOfCreation = Number(dayOfCreation) + 1;
  let restDate = creationDate.toString().slice(3, 21);

  const recoverHandler = (e) => {
    recoverOneLead(item._id);
  }

  const deleteHandler = (e) => {
    deleteOneLead(item._id);
  }

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
        render: "Lead Deleted Successfully",
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

    if(responseFromMutation.isLoading && responseFromMutation.status === "pending") {
        toast.loading('Recovering...', {
          theme: 'light',
          toastId: 'Recover-Lead',
          autoClose: 3000
        });
      }
      if(responseFromMutation.isSuccess) {
        toast.update('Recover-Lead', {
          render: "Lead Recovered Successfully",
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
      }
      if(responseFromMutation.isError) {
        toast.update("Recover-Lead", {
          render: "Error Occurred",
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
  }, [
        response.isSuccess, 
        response.isError, 
        response.isLoading, 
        response.status,
        responseFromMutation.isSuccess,
        responseFromMutation.isError,
        responseFromMutation.isLoading,
        responseFromMutation.status
  ]);

  return (
    <>
    <tr className={index % 2 === 0 ? `bg-slate-100` : `bg-white`}>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {index + 1}.
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.leadName}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.leadEmail}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {item.leadPhone}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        {days[dayOfCreation]}, 
          <br />
        {restDate}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm uppercase">
        {item.leadCourse}
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-xs font-medium uppercase">
        <span
          className={`px-4 text-xs py-2 rounded-sm text-white 
            ${
                item.leadStatus === "Pending" &&
                `bg-yellow-600`
            }
            ${
                item.leadStatus === "Resolved" &&
                `bg-emerald-600`
            }
            ${
                item.leadStatus === "Rejected" &&
                `bg-rose-700`
            }
            `}
        >
          {item.leadStatus}
        </span>
      </td>
      <td className="px-5 py-8 text-left text-sm">{item.leadTitle}</td>
      <td className="px-5 py-8 text-left text-sm">{item.leadDescription}</td>
      {item.leadReference ? (
        <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
          {item.leadReference.name}, <br />
          {item.leadReference.phoneNo}
        </td>
      ) : (
        <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
          No One
        </td>
      )}
      
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        <button
          className="bg-primary text-white px-6 py-2 rounded"
          onClick={recoverHandler}
        >
          Recover
        </button>
      </td>
      <td className="px-5 py-8 text-left whitespace-nowrap text-sm">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded"
          onClick={deleteHandler}
        >
          Delete Permanently
        </button>
        <ToastContainer />
      </td>
    </tr>
    </>
  );
}

export default LeadTrashTableRow;
