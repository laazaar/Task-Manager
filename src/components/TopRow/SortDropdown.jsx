import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AppContext from "../../contenxt/AppContext";

const SortDropdown = () => {
  const cfx = useContext(AppContext);

  const [selectedSort, setSelectedSort] = useState("");

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex gap-2 font-semibold text-white border-white"
            variant="outline"
          >
            <span>Sort by:</span>
            {selectedSort === "dateASC"
              ? "Date Ascending"
              : selectedSort === "dateDSC"
              ? "Date Descending"
              : selectedSort === "priorityASC"
              ? "Priority Ascending"
              : selectedSort === "priorityDSC"
              ? "Priority Descending"
              : "Default"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max dark">
          {/* <DropdownMenuLabel className="text-center font-semibold text-md">
            Task Priority
          </DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuRadioGroup
            value={selectedSort || "Default"}
            onValueChange={(e) => {
              cfx.setSortTasksType(e);
              setSelectedSort(e);
            }}
          >
            <DropdownMenuRadioItem value="Default">
              <Button className="flex gap-2" variant="outline">
                <span className="font-semibold">Default</span>
              </Button>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dateASC">
              <Button className="flex gap-2" variant="outline">
                <span className="font-semibold">Date Ascending</span>
              </Button>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dateDSC">
              <Button className="flex gap-2" variant="outline">
                <span className="font-semibold">Date Descending</span>
              </Button>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priorityASC">
              <Button className="flex gap-2" variant="outline">
                <span className="font-semibold">Priority Ascending</span>
              </Button>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priorityDSC">
              <Button className="flex gap-2" variant="outline">
                <span className="font-semibold">Priority Descending</span>
              </Button>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDropdown;
