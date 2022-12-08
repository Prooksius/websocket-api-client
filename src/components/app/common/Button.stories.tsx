import React from "react"
import type { ComponentMeta, ComponentStory } from "@storybook/react"
import { Button, ButtonProps, BtnVariants } from "./Button"
import "../../../assets/css/App.css"

export default {
  title: "Button",
  component: Button,
  argTypes: {
    variant: {
      options: Object.keys(BtnVariants),
      control: { type: "check" },
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Press me",
  variant: ["blue"],
  disabled: false,
}
