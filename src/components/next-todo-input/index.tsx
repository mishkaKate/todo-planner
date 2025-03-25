import "./next-todo-input.scss";

interface IProps {
  value: string;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

export function TaskInput({ value, onChange, onSubmit }: IProps) {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e?.target?.value);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="todo-next">
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="What needs to be done?"
      ></input>
      <button hidden={!value} className="todo-add" onClick={onSubmit}>
        add
      </button>
    </div>
  );
}
