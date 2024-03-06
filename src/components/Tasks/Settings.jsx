import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Dropdown from "./Dropdown";
import AppContext from "../../contenxt/AppContext";
import { DatePicker } from "./DatePicker";
import { Checkbox } from "../ui/checkbox";

const DeleteDialog = ({ data }) => {
  const cfx = useContext(AppContext);
  return (
    <Dialog>
      <DialogTrigger className="bg-destructive px-4 py-2 hover:bg-destructive/90 transition-colors rounded-md">
        <i className="fa-solid fa-trash"></i>{" "}
        <span className="ms-2 font-semibold">Delete</span>
      </DialogTrigger>
      <DialogContent className="dark text-secondary-foreground max-w-[15rem]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="sm:justify-center gap-4">
          <DialogClose asChild>
            <Button className="font-bold">No</Button>
          </DialogClose>
          <Button
            onClick={() => cfx.deleteTask(data.id)}
            variant="destructive"
            className="font-bold"
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Settings = ({ data, setLateTask }) => {
  const cfx = useContext(AppContext);

  return (
    <Dialog>
      <DialogTrigger className="px-4 h-9 bg-primary rounded-md hover:bg-primary/90 transition-colors text-black">
        <i className="fa-solid fa-gear"></i>
      </DialogTrigger>
      <DialogContent className="dark text-secondary-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Settings</DialogTitle>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-4 items-center">
            Priority:
            <Dropdown data={data}></Dropdown>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="urgent">Urgent:</label>
            <Checkbox
              id="urgent"
              checked={data.urgent}
              onClick={() => {
                cfx.handleUrgent(data.id);
                console.log(data.urgent);
              }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap sm:col-span-2">
            Due:
            <DatePicker data={data} />
            <Button
              className="font-semibold"
              onClick={() => {
                cfx.removeDateHandler(data.id);
                setLateTask(false);
              }}
            >
              Remove Date
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DeleteDialog data={data}></DeleteDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
