import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { MdIncompleteCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: tasks, refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleOngoing = (id) => {
    console.log(id);
    const update = {
      status: "ongoing",
    };
    axiosSecure.patch(`/tasks/${id}`, update).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast("Task status updated!");
        refetch();
      }
    });
  };
  const handleComplete = (id) => {
    console.log(id);
    const update = {
      status: "completed",
    };
    axiosSecure.patch(`/tasks/${id}`, update).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast("Task status updated!");
        refetch();
      }
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Task has been removed form the list.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className=" flex flex-col gap-5 items-center">
      <div className=" flex flex-col w-full sm:flex-row gap-3 md:gap-5">
        {/* Todo */}
        <div className="flex flex-col  items-center">
          <h2 className=" text-xl text-center  text-sky-500 font-medium mb-5">
            To-Do List
          </h2>
          {tasks
            ?.filter((task) => task?.status === "todo")
            .map((task, index) => (
              <div key={index}>
                <p className=" p-2 py-1 h-18 border flex flex-col gap-1 justify-between items-start text-center w-[200px] border-sky-500 mb-1 rounded-md shadow">
                  <div>
                    <span
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${task._id}`)
                          .showModal()
                      }
                      className="cursor-pointer font-medium"
                    >
                      {task?.title}
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <small className="my-anchor-element1">
                      {task?.priority === "high" && (
                        <FcHighPriority size={24} />
                      )}
                      {task?.priority === "Low" && <FcLowPriority size={24} />}
                      {task?.priority === "moderate" && (
                        <FcMediumPriority size={24} />
                      )}
                    </small>
                    <Tooltip anchorSelect=".my-anchor-element1" place="top">
                      {task?.priority}
                    </Tooltip>
                    <MdIncompleteCircle
                      onClick={() => handleOngoing(task._id)}
                      className="cursor-pointer hover:scale-110 ongoing"
                      size={24}
                    />
                    <Tooltip anchorSelect=".ongoing" place="top">
                      Mark as ongoing
                    </Tooltip>
                    <FaCheckCircle
                      onClick={() => handleComplete(task._id)}
                      className="cursor-pointer hover:scale-110 complete"
                      size={24}
                    />
                    <Tooltip anchorSelect=".complete" place="top">
                      Mark as complete
                    </Tooltip>
                    <FaTrash
                      onClick={() => handleDelete(task._id)}
                      className="cursor-pointer hover:scale-110 delete"
                      size={24}
                    />
                    <Tooltip anchorSelect=".delete" place="top">
                      Delete
                    </Tooltip>
                  </div>
                </p>
                <dialog
                  id={`my_modal_${task._id}`}
                  className="modal modal-middle sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="py-4">Details:{task.description}</p>
                    <div className="py-4 flex items-center justify-between">
                      <p>Deadline:{task.deadline}</p>
                      <p>Priority level:{task.priority}</p>
                    </div>
                    <div className="modal-action flex items-center gap-4">
                      <Link to={`/dashboard/updateTask/${task._id}`}>
                        <button className=" rounded-md btn-outline btn-sm">
                          Update task
                        </button>
                      </Link>
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline btn-sm">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
        </div>
        {/* ongoing */}
        <div className="flex flex-col items-center">
          <h2 className=" text-xl text-center  text-sky-500 font-medium mb-5">
            Ongoing Task
          </h2>
          {tasks
            ?.filter((task) => task.status === "ongoing")
            .map((task, index) => (
              <div key={index}>
                <p className=" p-2 py-1 h-16  border flex flex-col gap-1 justify-between items-start text-center w-[200px] border-sky-500 mb-1 rounded-md shadow">
                  <div>
                    <span
                      onClick={() =>
                        document
                          .getElementById(`my_modal_${task._id}`)
                          .showModal()
                      }
                      className=" font-medium cursor-pointer"
                    >
                      {task?.title}
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <small className="my-anchor-element">
                      {task?.priority === "high" && (
                        <FcHighPriority size={24} />
                      )}
                      {task?.priority === "Low" && <FcLowPriority size={24} />}
                      {task?.priority === "moderate" && (
                        <FcMediumPriority size={24} />
                      )}
                    </small>
                    <Tooltip anchorSelect=".my-anchor-element" place="top">
                      {task?.priority}
                    </Tooltip>
                    <FaCheckCircle
                      onClick={() => handleComplete(task._id)}
                      className="cursor-pointer hover:scale-110 complete"
                      size={24}
                    />
                    <Tooltip anchorSelect=".complete" place="top">
                      Mark as complete
                    </Tooltip>
                    <FaTrash
                      onClick={() => handleDelete(task._id)}
                      className="cursor-pointer hover:scale-110 delete"
                      size={24}
                    />
                    <Tooltip anchorSelect=".delete" place="top">
                      Delete
                    </Tooltip>
                  </div>
                </p>
                <dialog
                  id={`my_modal_${task._id}`}
                  className="modal modal-middle sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="py-4">Details:{task.description}</p>
                    <div className="py-4 flex items-center justify-between">
                      <p>Deadline:{task.deadline}</p>
                      <p>Priority level:{task.priority}</p>
                    </div>
                    <div className="modal-action flex items-center gap-4">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline btn-sm">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
        </div>
        {/* completed */}
        <div className="flex flex-col items-center">
          <h2 className=" text-xl text-center  text-sky-500 font-medium mb-5">
            Completed Task
          </h2>
          {tasks
            ?.filter((task) => task.status === "completed")
            .map((task, index) => (
              <p
                className=" p-2 h-16 font-medium border flex gap-2 items-center justify-start w-[200px] border-sky-500 mb-1 rounded-md shadow"
                key={index}
              >
                <div>
                  <p
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${task._id}`)
                        .showModal()
                    }
                    className=" cursor-pointer"
                  >
                    {task.title}
                  </p>
                  <dialog
                    id={`my_modal_${task._id}`}
                    className="modal modal-middle sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{task.title}</h3>
                      <p className="py-4">Details:{task.description}</p>
                      <div className="py-4 flex items-center justify-between">
                        <p>Deadline:{task.deadline}</p>
                        <p>Priority level:{task.priority}</p>
                      </div>
                      <div className="modal-action flex items-center gap-4">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-outline btn-sm">
                            Close
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
                <div>
                  <FaTrash
                    onClick={() => handleDelete(task._id)}
                    className=" cursor-pointer hover:scale-110 delete"
                    size={24}
                  />
                  <Tooltip anchorSelect=".delete" place="top">
                    Delete
                  </Tooltip>
                </div>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTask;
