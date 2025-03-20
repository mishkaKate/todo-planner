import { useCallback, useState } from "react";
import "./App.css";

enum Filter {
  All = "All",
  Completed = "Completed",
  Active = "Active",
}

class Task {
  text: string;
  isDone: boolean;

  constructor(text: string) {
    this.text = text;
    this.isDone = false;
  }
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [nextTaskText, setNextTaskText] = useState("");
  const [filter, setFilter] = useState(Filter.All);

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

  const handleInputChange = (e) => {
    setNextTaskText(e?.target?.value);
  };

  const setTaskIsDone = useCallback(
    (task: Task) => {
      const nextTasks = tasks.map((stateTask) => {
        if (stateTask.text === task.text) {
          return { ...stateTask, isDone: !stateTask.isDone };
        }

        return { ...stateTask };
      });

      setTasks(nextTasks);
    },
    [tasks]
  );

  const getActiveTasksCount = () => {
    return tasks.filter((task) => !task.isDone).length;
  };

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTask();
    }
  };

  return (
    <div className="todo">
      <div className="todo-header">todos</div>
      <div className="todo-body">
        <div className="todo-next">
          <input
            type="text"
            className="todo-input"
            value={nextTaskText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="What needs to be done?"
          ></input>
          <button
            hidden={!nextTaskText}
            className="todo-add"
            onClick={addNewTask}
          >
            add
          </button>
        </div>
        <ul className="todo-list">
          {getFiltered(tasks).map((task) => (
            <li className="todo-item">
              <button
                onClick={() => setTaskIsDone(task)}
                aria-pressed={task.isDone}
                aria-label="Is done"
                className="is-done-button"
              ></button>
              <div className="task-text">{task.text}</div>
            </li>
          ))}
        </ul>
        <div className="todo-filter">
          <span>{getActiveTasksCount()} items left</span>
          <div className="todo-filters">
            <input
              type="radio"
              name="todo-filter"
              id="todo-filter-all"
              value={Filter.All}
              onChange={onFilterChange}
              checked={filter === Filter.All}
            ></input>
            <label htmlFor="todo-filter-all">All</label>
            <input
              type="radio"
              name="todo-filter"
              id="todo-filter-active"
              value={Filter.Active}
              onChange={onFilterChange}
              checked={filter === Filter.Active}
            ></input>
            <label htmlFor="todo-filter-active">Active</label>
            <input
              type="radio"
              name="todo-filter"
              id="todo-filter-completed"
              value={Filter.Completed}
              onChange={onFilterChange}
              checked={filter === Filter.Completed}
            ></input>
            <label htmlFor="todo-filter-completed">Completed</label>
          </div>
          <button className="button-clear">Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
