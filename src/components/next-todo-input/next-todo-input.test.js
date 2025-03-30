import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { TaskInput } from "./index";

const onChangeMock = jest.fn(() => {});
const onSubmitMock = jest.fn((value) => {});

describe("button on input value", () => {
  it("button is visible if text is not empty", () => {
    var { container } = render(
      <TaskInput value="123" onChange={onChangeMock} onSubmit={onSubmitMock} />
    );

    const input = container.querySelector("input.todo-input");
    const button = container.querySelector("button.todo-add");

    expect(input.value).toBe("123");
    expect(button.hidden).toBe(false);
  });

  it("add button is hidden if text is empty", () => {
    var { container } = render(
      <TaskInput value="" onChange={onChangeMock} onSubmit={onSubmitMock} />
    );

    const input = container.querySelector("input.todo-input");
    const button = container.querySelector("button.todo-add");

    expect(input.value).toBe("");
    expect(button.hidden).toBe(true);
  });
});

describe("user events handlers", () => {
  it("on add click", () => {
    var { container } = render(
      <TaskInput value="123" onChange={onChangeMock} onSubmit={onSubmitMock} />
    );

    fireEvent.click(container.querySelector("button.todo-add"));

    expect(onSubmitMock.mock.calls).toHaveLength(1);
  });

  it("on input value change", () => {
    var { container } = render(
      <TaskInput value="" onChange={onChangeMock} onSubmit={onSubmitMock} />
    );

    fireEvent.change(container.querySelector("input.todo-input"), {
      target: { value: "new task text" },
    });
    expect(onChangeMock.mock.calls[0][0]).toBe("new task text");
  });
});
