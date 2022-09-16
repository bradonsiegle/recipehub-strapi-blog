import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";

import { Input } from "./Input";
import { Feedback } from "./Feedback";

export default {
  title: "Controls/Input",
  component: Input,
  args: {},
} as ComponentMeta<typeof Input>;

export const PrimaryInput: ComponentStoryObj<typeof Input> = {
  play: async ({ args }) => {
    await userEvent.type(screen.getByRole("textbox"), "String");
  },
  args: {
    placeholder: "Your name",
    label: "Name:",
  },
};

export const WithIcon: ComponentStoryObj<typeof Input> = {
  args: {
    icon: "Search",
    placeholder: "Search",
    height: 4,
  },
};

export const WithInvalidFeedback: ComponentStoryObj<typeof Input> = {
  args: {
    placeholder: "Some text",
    feedback: <Feedback isValid={false}>Required!</Feedback>,
  },
  argTypes: {
    feedback: {
      control: false,
    },
  },
};

export const WithValidFeedback: ComponentStoryObj<typeof Input> = {
  args: {
    placeholder: "Some text",
    label: "Text:",
    feedback: <Feedback isValid={true}>Looks good!</Feedback>,
  },
  argTypes: {
    feedback: {
      control: false,
    },
  },
};
