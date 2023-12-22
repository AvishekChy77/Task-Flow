import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { MdIncompleteCircle } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
const ManageTask = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data: tasks, refetch } = useQuery({
    queryKey: ["task", user?.email],
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

  return (
    <div className=" flex flex-col gap-5 items-center">
      <div className=" flex flex-col w-full sm:flex-row gap-3 md:gap-5">
        <div className="flex flex-col w-1/3 items-center">
          <h2 className=" text-xl text-center w-full text-sky-500 font-medium mb-5">
            To-Do List
          </h2>
          {tasks
            ?.filter((task) => task?.status === "todo")
            .map((task, index) => (
              <p
                className=" p-2 border flex items-center justify-between text-center w-full border-sky-500 mb-1 rounded-md shadow"
                key={index}
              >
                <div className=" flex flex-col items-start">
                  <span className=" font-medium">{task?.title}</span>
                  <span className=" text-xs">Deadline:{task?.deadline}</span>
                </div>
                <div className=" flex items-center gap-2">
                  <small className="my-anchor-element1">
                    {task?.priority === "high" && <FcHighPriority size={24} />}
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
                    className=" hover:scale-110 ongoing"
                    size={24}
                  />
                  <Tooltip anchorSelect=".ongoing" place="top">
                    Mark as ongoing
                  </Tooltip>
                  <FaCheckCircle
                    onClick={() => handleComplete(task._id)}
                    className=" hover:scale-110 complete"
                    size={24}
                  />
                  <Tooltip anchorSelect=".complete" place="top">
                    Mark as complete
                  </Tooltip>
                </div>
              </p>
            ))}
        </div>
        <div className="flex flex-col w-1/3 items-center">
          <h2 className=" text-xl text-center w-full text-sky-500 font-medium mb-5">
            Ongoing Task
          </h2>
          {tasks
            ?.filter((task) => task.status === "ongoing")
            .map((task, index) => (
              <p
                className=" p-2 border flex items-center justify-between text-center w-full border-sky-500 mb-1 rounded-md shadow"
                key={index}
              >
                <div className=" flex flex-col items-start">
                  <span className=" font-medium">{task?.title}</span>
                  <span className=" text-xs">Deadline:{task?.deadline}</span>
                </div>
                <div className=" flex items-center gap-2">
                  <small className="my-anchor-element">
                    {task?.priority === "high" && <FcHighPriority size={24} />}
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
                    className=" hover:scale-110 complete"
                    size={24}
                  />
                  <Tooltip anchorSelect=".complete" place="top">
                    Mark as complete
                  </Tooltip>
                </div>
              </p>
            ))}
        </div>
        <div className="flex flex-col w-1/3 items-center">
          <h2 className=" text-xl text-center w-full text-sky-500 font-medium mb-5">
            Completed Task
          </h2>
          {tasks
            ?.filter((task) => task.status === "completed")
            .map((task, index) => (
              <p
                className=" p-2 border flex items-center justify-between text-center w-full border-sky-500 mb-1 rounded-md shadow"
                key={index}
              >
                {task.title}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTask;
