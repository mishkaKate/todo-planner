import { Task } from "../../types";

interface IProps {
  items: Array<Task>;
  onItemClick: (item: Task) => void;
}

export function TodoList({ items, onItemClick }: IProps) {
  return (
    <ul className="todo-list">
      {items.map((item) => (
        <li className="todo-item">
          <button
            onClick={() => onItemClick(item)}
            aria-pressed={item.isDone}
            aria-label="Is done"
            className="is-done-button"
          ></button>
          <div className="task-text">{item.text}</div>
        </li>
      ))}
    </ul>
  );
}
