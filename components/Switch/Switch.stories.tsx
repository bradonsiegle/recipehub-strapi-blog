import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";

import { Switch } from "./Switch";

export default {
  title: "Controls/Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const BasicSwitch: ComponentStoryObj<typeof Switch> = {
  play: async ({ args }) => {
    await userEvent.click(screen.getByTestId("SwitchVisiblePart"));
  },
};
