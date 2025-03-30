import { useCallback, useState } from "react";

import { Task, Filter } from "./types";
import { TaskInput } from "./components/next-todo-input";
import { TodoList } from "./components/todo-list";
import { Footer } from "./components/footer";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [nextTaskText, setNextTaskText] = useState("");
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const getFiltered = (tasks: Array<Task>) => {
    if (filter === Filter.All) {
      return tasks;
    }

    return tasks.filter((task) =>
      filter === Filter.Active ? !task.isDone : task.isDone
    );
  };

  const addNewTask = useCallback(() => {
    const task = new Task(nextTaskText);

    setTasks((tasks) => [task, ...tasks]);
    setNextTaskText("");
  }, [tasks, nextTaskText]);

  const clearClosedTasks = () => {
    setTasks((tasks) => tasks.filter((task) => !task.isDone));
  };

  const setTaskIsDone = useCallback(
    (task: Task) => {
      const nextTasks = tasks.map((stateTask) => {
        if (stateTask.id === task.id) {
          return { ...stateTask, isDone: !stateTask.isDone };
        }

        return { ...stateTask };
      });

      setTasks(nextTasks);
    },
    [tasks]
  );

  return (
    <div className="todo">
      <div className="todo-header">todos</div>
      <div className="todo-body">
        <TaskInput
          value={nextTaskText}
          onChange={setNextTaskText}
          onSubmit={addNewTask}
        />
        <TodoList items={getFiltered(tasks)} onItemClick={setTaskIsDone} />
        <Footer
          tasks={tasks}
          filterValue={filter}
          onFilterChange={setFilter}
          onClearClick={clearClosedTasks}
        />
      </div>
    </div>
  );
}

export default App;
