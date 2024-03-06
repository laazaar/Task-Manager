import React, { useContext } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Priority from "./Priority";
import AppContext from "../../contenxt/AppContext";

const Dropdown = ({ data }) => {
  const cfx = useContext(AppContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button variant="outline" className="flex gap-2">
            {data.priority === 0 ? (
              <>
                <i className="fa-solid fa-ban"></i>
                <span className="font-semibold">None</span>
              </>
            ) : (
              <>
                <Priority variant={data.priority} />
                <span className="font-semibold">
                  {data.priority === 1
                    ? "Low"
                    : data.priority === 2
                    ? "Medium"
                    : "High"}
                </span>
              </>
            )}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max dark">
        <DropdownMenuLabel className="text-center font-semibold text-md">
          Task Priority
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={data.priority}
          onValueChange={(e) => cfx.changePriorityHandler(e, data.id)}
        >
          <DropdownMenuRadioItem value={0}>
            <Button className="flex gap-2" variant="outline">
              <i className="fa-solid fa-ban"></i>{" "}
              <span className="font-semibold">None</span>
            </Button>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={1}>
            <Button className="flex gap-2" variant="outline">
              <Priority variant={1} />{" "}
              <span className="font-semibold">Low</span>
            </Button>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={2}>
            <Button className="flex gap-2" variant="outline">
              <Priority variant={2} />{" "}
              <span className="font-semibold">Medium</span>
            </Button>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={3}>
            <Button className="flex gap-2" variant="outline">
              <Priority variant={3} />{" "}
              <span className="font-semibold">High</span>
            </Button>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
