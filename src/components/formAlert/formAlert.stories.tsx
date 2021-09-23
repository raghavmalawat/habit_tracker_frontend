import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { FormAlert, FormAlertProps } from "./formAlert";

export default {
  title: "Design System/Form/FormAlert",
  component: FormAlert,
  argTypes: {}
} as Meta;

const Template: Story<FormAlertProps> = (args) => <FormAlert {...args} />;

export const Success = Template.bind({});
Success.args = {
  message: "Submitted successfully",
  type: "success"
};

export const Error = Template.bind({});
Success.args = {
  message: "Something went wrong",
  type: "error"
};
