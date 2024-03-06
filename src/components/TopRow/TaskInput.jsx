import React, { useContext } from "react";
import AppContext from "../../contenxt/AppContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SortDropdown from "./SortDropdown";

const TaskInput = () => {
  const cfx = useContext(AppContext);
  return (
    <div className="flex flex-col gap-2 items-center">
      <form onSubmit={cfx.submitTaskHandler} className="flex gap-2 max-w-lg">
        <Input
          placeholder="Your Task Here..."
          className="border border-white placeholder:text-white/70 text-white text-md"
          onChange={cfx.taskHandler}
          value={cfx.task}
          maxLength={30}
        />
        <Button
          className="font-semibold text-white border-white"
          variant="outline"
        >
          Add
        </Button>
      </form>
      <div>
        <SortDropdown />
      </div>
    </div>
  );
};

export default TaskInput;
