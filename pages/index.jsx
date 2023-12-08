import { Data } from "@/sources/context/DataProvider";
import React, { useContext, useEffect, useMemo, useState } from "react";
import LoginPage from "./login";
import { handleState } from "next-lesscode/functions";
import { toast } from "react-toastify";
import doFetch from "@/sources/functions/doFetch";

const Page = () => {
  const { login } = useContext(Data);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
  const [id, setId] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    handleState(setTask, value);
  };

  const handleCRUD = async (id, method) => {
    if (!task && method !== "DELETE") {
      toast.error("Task is required!");
      return;
    }

    const resp = await doFetch(
      id ? `todo/${id}` : "todo/add",
      id ? method : "POST",
      id ? { task, id } : { task }
    );
    if (resp?.hasError) {
      toast.error(resp?.message);
      return;
    }

    getTodoLists();
    setTask("");
    id && setId(null);
    toast.success(resp?.message);
  };

  const getTodoLists = async () => {
    const resp = await doFetch("todo/items");

    if (resp?.hasError) {
      toast.error(resp.message);
      return;
    }
    setList(resp?.items);
  };

  useEffect(() => {
    getTodoLists();
  }, []);

  const addOrEdit = useMemo(() => (id ? "Edit" : "Add"), [id]);

  if (!login?.isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="p-5 max-w-[800px] mx-auto">
      <div className="bg-[#0000002e] p-3 mt-5 flex flex-col gap-2  rounded-md">
        <div className="text-center p-1 text-xl font-bold">
          {addOrEdit} Task
        </div>
        <input
          type="text"
          placeholder="Write Task"
          value={task}
          onChange={handleChange}
          className="p-3 rounded-md"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCRUD(id, id && "PUT")}
            className="bg-emerald-500 p-3 rounded-md w-fit min-w-[200px]"
          >
            {addOrEdit}
          </button>
          <button
            onClick={() => {
              setTask("");
              setId(null);
            }}
            className="bg-slate-200 p-3 rounded-md w-fit min-w-[200px]"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="bg-[#0000002e] mt-10 p-3 flex flex-col gap-3 rounded-md">
        <div className="text-center p-1 text-xl font-bold">Todo Lists</div>

        {list?.map((elem, ind) => (
          <div
            key={ind}
            className="flex items-center justify-between gap-5 bg-white p-3 rounded-md"
          >
            <div>{elem.task}</div>
            <div className="flex items-center gap-2">
              <span
                className="cursor-pointer hover:text-emerald-700 duration-300"
                onClick={() => {
                  setId(elem._id);
                  setTask(elem.task);
                }}
              >
                Edit
              </span>
              <span
                className="cursor-pointer hover:text-emerald-700 duration-300"
                onClick={() => handleCRUD(elem._id, "DELETE")}
              >
                Complete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
