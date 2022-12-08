import React from "react"

interface CaretIconProps {
  open: boolean
}

export const CaretIcon: React.FC<CaretIconProps> = ({ open }) => {
  return (
    <svg
      style={{
        transition: ".3s all ease",
        transform: "rotate(" + (open ? "180" : 0) + "deg)",
      }}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.3125 9.375L12.5 17.1875L4.6875 9.375"
        stroke="#2B2B2C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
