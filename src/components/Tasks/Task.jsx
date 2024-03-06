import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../contenxt/AppContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Settings from "./Settings";
import Priority from "./Priority";

const Task = ({ data }) => {
  const cfx = useContext(AppContext);
  const [editableInput, setEditableInput] = useState(false);

  const [lateTask, setLateTask] = useState(false);

  useEffect(() => {
    if (data.date) {
      setLateTask(
        new Date(data.date)
          .toLocaleDateString("pt-br")
          .split("/")
          .reverse()
          .join("") -
          cfx.currentDate <
          0
      );
    }
  }, [data.date]);

  console.log(data.id, lateTask);

  return (
    <div
      className={`flex flex-col gap-2 sm:flex-row mx-auto max-w-[25rem] items-center justify-between sm:max-w-[35rem] w-full border border-white/30 p-2 rounded-lg text-white ${
        lateTask ? "bg-red-400/50" : ""
      } ${data.urgent ? "border-red-600 bg-red-700/60" : ""}`}
    >
      <div className="flex items-center gap-2">
        <Button
          className="hidden sm:block"
          onClick={() => cfx.finishTask(data.id)}
          variant="default"
        >
          {!data.finished ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-minus"></i>
          )}
        </Button>
        {!editableInput ? (
          <>
            <div
              onClick={() => {
                if (!data.finished) {
                  setEditableInput(!editableInput);
                  cfx.activeEditableInputHandler();
                }
              }}
              className={`text-lg sm:text-base ${
                data.finished
                  ? "line-through decoration-zinc-500 decoration-2"
                  : "cursor-pointer"
              }`}
            >
              {data.task}
            </div>
          </>
        ) : (
          <form
            className="flex me-4"
            onSubmit={(e) => {
              e.preventDefault();
              cfx.editedInputHandler(data.id);
              cfx.activeEditableInputHandler();
              setEditableInput(!editableInput);
            }}
          >
            <Input
              type="text"
              className="text-md"
              defaultValue={data.task}
              onChange={(e) => cfx.changeTaskHandler(e)}
              onBlur={() => {
                cfx.editedInputHandler(data.id);
                cfx.activeEditableInputHandler();
                setEditableInput(!editableInput);
              }}
              maxLength={30}
              autoFocus
            />
          </form>
        )}
      </div>

      <div className="flex items-center gap-2">
        {data.date !== "" ? (
          <div>
            {new Date(data.date).toString().split(" ").splice(1, 3).join(" ")}
          </div>
        ) : (
          ""
        )}
        {!data.finished ? (
          <Priority variant={data.priority} bgColor={true}></Priority>
        ) : (
          ""
        )}
        <Settings data={data} setLateTask={setLateTask}></Settings>

        <Button
          className="sm:hidden"
          onClick={() => cfx.finishTask(data.id)}
          variant="default"
        >
          {!data.finished ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-minus"></i>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Task;
