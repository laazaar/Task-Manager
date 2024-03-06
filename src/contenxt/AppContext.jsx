import React, { useEffect, useState } from "react";

const AppContext = React.createContext();

export const AppContextProvider = (props) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("taskManagerData")) || []
  );

  const [newData, setNewData] = useState(data);

  const [task, setTask] = useState("");
  const [changeTask, setChangeTask] = useState("");
  const [activeEditableInput, setActiveEditableInput] = useState(false);
  const [changePriority, setChangePriority] = useState("");
  const [changePriorityTaskId, setChangePriorityTaskId] = useState("");
  const [date, setDate] = useState("");
  const [changeDateTaskId, setChangeDateTaskId] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortTasksType, setSortTasksType] = useState("");

  useEffect(() => {
    localStorage.setItem("taskManagerData", JSON.stringify(data));
    sortHandler(sortTasksType);
  }, [data]);

  const currentDate = new Date()
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join("");

  const taskHandler = (e) => {
    setTask(e.target.value);
  };

  const submitTaskHandler = (e) => {
    e.preventDefault();
    if (task === "") {
      return;
    }
    setData((prevState) => [
      {
        id: Math.random(),
        finished: false,
        task: task,
        priority: 0,
        date: "",
        urgent: false,
      },
      ...prevState,
    ]);
    setTask("");
  };

  const deleteTask = (taskId) => {
    setData(data.filter((el) => el.id !== taskId));
  };

  const finishTask = (taskId) => {
    const isFinished = data.find((el) => el.id === taskId);
    isFinished.finished = !isFinished.finished;

    setData(data.map((el) => (el.id === taskId ? isFinished : el)));
  };

  const changeTaskHandler = (e) => {
    setChangeTask(e.target.value);
    console.log(changeTask);
  };

  const activeEditableInputHandler = () => {
    setActiveEditableInput(!activeEditableInput);
  };

  const editedInputHandler = (taskId) => {
    if (changeTask === "") {
      return;
    }

    const editedTask = data.find((el) => el.id === taskId);
    editedTask.task = changeTask;

    setData(data.map((el) => (el.id === taskId ? editedTask : el)));
    setChangeTask("");
  };

  const applyPriorityHandler = (taskId) => {
    const editedPriority = data.find((el) => el.id === taskId);
    if (editedPriority) {
      editedPriority.priority = changePriority;
      setData(data.map((el) => (el.id === taskId ? editedPriority : el)));
    }
  };

  const changePriorityHandler = (value, taskId) => {
    setChangePriority(value);
    setChangePriorityTaskId(taskId);
  };

  useEffect(() => {
    applyPriorityHandler(changePriorityTaskId);
  }, [changePriority]);

  const handleDateTaskId = (taskId) => {
    setChangeDateTaskId(taskId);
  };

  const changeDateHandler = (changeDateTaskId) => {
    const changedDate = data.find((el) => el.id === changeDateTaskId);
    if (changedDate) {
      changedDate.date = date;
      setData(
        data.map((el) => (el.id === changeDateTaskId ? changedDate : el))
      );
    }
  };

  useEffect(() => {
    changeDateHandler(changeDateTaskId);
  }, [date]);

  console.log(data);

  const handleUrgent = (taskId) => {
    const changeUrgent = data.find((el) => el.id === taskId);
    changeUrgent.urgent = !changeUrgent.urgent;
    setData(data.map((el) => (el.id === taskId ? changeUrgent : el)));
  };

  const removeDateHandler = (taskId) => {
    const removeDate = data.find((el) => el.id === taskId);
    removeDate.date = "";
    setData(data.map((el) => (el.id === taskId ? removeDate : el)));
  };

  const sortHandler = (type) => {
    if (type === "Default" || !type) {
      setSortedData(data.toSorted((a, b) => b.urgent - a.urgent));
    }

    if (type === "dateASC") {
      setSortedData(
        data.toSorted(
          (a, b) =>
            a.date.split("T")[0].split("-").join("") -
            b.date.split("T")[0].split("-").join("")
        )
      );
    }

    if (type === "dateDSC") {
      setSortedData(
        data.toSorted(
          (a, b) =>
            b.date.split("T")[0].split("-").join("") -
            a.date.split("T")[0].split("-").join("")
        )
      );
    }

    if (type === "priorityASC") {
      setSortedData(data.toSorted((a, b) => a.priority - b.priority));
    }

    if (type === "priorityDSC") {
      setSortedData(data.toSorted((a, b) => b.priority - a.priority));
    }
  };

  useEffect(() => {
    sortHandler(sortTasksType);
  }, [sortTasksType]);

  useEffect(() => {
    setNewData(sortedData.toSorted((a, b) => b.urgent - a.urgent));
  }, [sortedData]);

  return (
    <AppContext.Provider
      value={{
        task: task,
        taskHandler: taskHandler,
        submitTaskHandler: submitTaskHandler,
        data: data,
        newData: newData,
        deleteTask: deleteTask,
        finishTask: finishTask,
        changeTaskHandler: changeTaskHandler,
        activeEditableInputHandler: activeEditableInputHandler,
        activeEditableInput: activeEditableInput,
        editedInputHandler: editedInputHandler,
        changePriorityHandler: changePriorityHandler,
        applyPriorityHandler: applyPriorityHandler,
        date: date,
        setDate: setDate,
        handleDateTaskId: handleDateTaskId,
        currentDate: currentDate,
        handleUrgent: handleUrgent,
        removeDateHandler: removeDateHandler,
        setSortTasksType: setSortTasksType,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
