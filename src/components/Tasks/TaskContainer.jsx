import React, { useContext } from "react";
import AppContext from "../../contenxt/AppContext";
import Task from "./Task";

const TaskContainer = () => {
  const cfx = useContext(AppContext);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 py-4 max-w-[70rem] mx-auto lg:grid-cols-2">
        {cfx.newData.map((el) =>
          !el.finished ? <Task data={el} key={el.id}></Task> : ""
        )}
      </div>
      {cfx.newData.find((el) => el.finished) ? (
        <h2 className="text-xl font-semibold text-white text-center">
          Finished Tasks:
        </h2>
      ) : (
        ""
      )}
      <div
        className={`grid grid-cols-1 gap-4 py-4 max-w-[70rem] mx-auto lg:grid-cols-2 ${
          cfx.newData.find((el) => el.finished) ? "py-4" : ""
        }`}
      >
        {cfx.newData.map((el) =>
          el.finished ? <Task data={el} key={el.id}></Task> : ""
        )}
      </div>
    </div>
  );
};

export default TaskContainer;
