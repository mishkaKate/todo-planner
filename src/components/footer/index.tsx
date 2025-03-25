import { Task, Filter } from "../../types";

interface Iprops {
  tasks: Array<Task>;
  filterValue: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearClick: () => void;
}

export function Footer({
  filterValue,
  tasks,
  onFilterChange,
  onClearClick,
}: Iprops) {
  const getActiveTasksCount = () => {
    return tasks.filter((task) => !task.isDone).length;
  };

  const handleFilterChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    onFilterChange(e.target.value as Filter);
  };

  return (
    <div className="todo-filter">
      <span>{getActiveTasksCount()} items left</span>
      <div className="todo-filters">
        <input
          type="radio"
          name="todo-filter"
          id="todo-filter-all"
          value={Filter.All}
          onChange={handleFilterChange}
          checked={filterValue === Filter.All}
        ></input>
        <label htmlFor="todo-filter-all">All</label>
        <input
          type="radio"
          name="todo-filter"
          id="todo-filter-active"
          value={Filter.Active}
          onChange={handleFilterChange}
          checked={filterValue === Filter.Active}
        ></input>
        <label htmlFor="todo-filter-active">Active</label>
        <input
          type="radio"
          name="todo-filter"
          id="todo-filter-completed"
          value={Filter.Completed}
          onChange={handleFilterChange}
          checked={filterValue === Filter.Completed}
        ></input>
        <label htmlFor="todo-filter-completed">Completed</label>
      </div>
      <button className="button-clear" onClick={onClearClick}>
        Clear completed
      </button>
    </div>
  );
}
