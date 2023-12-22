import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const AddTask = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const goTo = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    const TaskData = {
      title: data.title,
      description: data.description,
      deadline: data.date,
      priority: data.priority,
      status: "todo",
      email: user?.email,
    };
    console.log(TaskData);
    axiosSecure.post("/tasks", TaskData).then((res) => {
      if (res.data.insertedId) {
        toast("Account created succesfully!");
        reset();
        goTo("/dashboard/manageTask");
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>TaskFlow | Dashboard</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h2 className=" text-2xl lg:text-4xl text-sky-500 text-center font-medium mb-10">
          Add Task
        </h2>
        <div className="card md:w-[400px] p-7 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Title</span>
              </label>
              <input
                type="text"
                {...register("title")}
                placeholder="Title"
                name="title"
                className="input input-bordered bg-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Description</span>
              </label>
              <textarea
                {...register("description")}
                placeholder="description"
                name="description"
                className="input input-bordered bg-white"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Deadline</span>
              </label>
              <input
                type="date"
                {...register("date")}
                placeholder="Deadline"
                name="date"
                className="input input-bordered bg-white"
                required
              />
              {errors.date && <p>{errors.date.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">Priority</span>
              </label>

              <select required name="priority" {...register("priority")}>
                <option value="Low">Low</option>
                <option value="moderate">moderate</option>
                <option value="high">high</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline hover:bg-black hover:text-white bg-white text-blue-500">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
