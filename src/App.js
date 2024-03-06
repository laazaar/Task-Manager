import "./App.css";
import TaskContainer from "./components/Tasks/TaskContainer";
import TaskInput from "./components/TopRow/TaskInput";
import { AppContextProvider } from "./contenxt/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="bg-background dark min-h-[100vh]">
        <div className="w-maxs mx-auto p-4">
          <TaskInput />
          <TaskContainer />
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
