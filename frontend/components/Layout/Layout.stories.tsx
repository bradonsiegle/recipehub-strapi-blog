import { ComponentStoryObj, ComponentMeta } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { Provider } from "react-redux";
import { store } from "@/store";

import { Layout } from "./Layout";

export default {
  title: "Layout/Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

export const BasicLayout: ComponentStoryObj<typeof Layout> = {
  args: {
    children: (
      <>
        <h1>Layout</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nisl nec ultricies lacinia, nisl nisl aliquet nisl, vitae aliquam nisl
          nisl sit amet lorem. Nulla facilisi. Sed euismod, nisl nec ultricies
          lacinia, nisl nisl aliquet nisl, vitae aliquam nisl nisl sit amet
          lorem. Nulla facilisi. Sed euismod, nisl nec ultricies lacinia, nisl
          nisl aliquet nisl, vitae aliquam nisl nisl sit amet lorem. Nulla
          facilisi. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquet
          nisl, vitae aliquam nisl nisl sit amet lorem. Nulla facilisi. Sed
        </p>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};
