import { ChangeEventHandler } from "react";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@/test-utils";

import { Input } from "./Input";

describe("Input test cases", () => {
  it("Should render", () => {
    const onChange = jest.fn();
    const { asFragment } = render(
      <Input
        onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
        label="Label"
        placeholder="Placeholder"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("Should render with icon", () => {
    const onChange = jest.fn();
    const { asFragment } = render(
      <Input
        onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
        icon="Search"
        label="Label"
        placeholder="Placeholder"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("Should call onChange callback", () => {
    const onChange = jest.fn();
    render(
      <Input
        onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
        label="Label"
        placeholder="Placeholder"
      />
    );
    const element = screen.getByRole("textbox");
    userEvent.type(element, "String");
    expect(onChange).toHaveBeenCalledTimes(6);
  });
});
