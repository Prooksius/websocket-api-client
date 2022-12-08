import React, { MouseEventHandler } from "react"
import cn from "classnames"
import { NavLink } from "react-router-dom"
import styles from "./Button.module.css"

export enum BtnVariants {
  transparent = "transparent",
  blue = "blue",
  red = "red",
  black = "black",
  simple = "simple",
  'simple-big' = "simple-big",
  white = "white",
  border = "border",
  'simple-border' = "simple-border",
  radio = "radio",
}

export type BtnVariant = keyof typeof BtnVariants 

export interface ButtonProps {
  type?: "button" | "submit" | "reset"
  className?: string
  disabled?: boolean
  variant?: BtnVariant[]
  onClick?: MouseEventHandler
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  className = '',
  disabled = false,
  variant = [],
  onClick,
  children,
}) => {
  let classes = styles["btn"]
  classes += variant.reduce<string>(
    (prev, curr) => prev + " " + styles["btn-" + curr],
    ""
  )

  return (
    <button
      type={type}
      className={classes + ' ' + className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
