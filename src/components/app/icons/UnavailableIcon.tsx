import React from "react"

export const UnavailableIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="28px"
      height="28px"
      data-tip="Недоступен"
      data-for="for-top"
    >
      <path
        fill="#777777"
        d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"
      />
      <line
        x1="16.9"
        x2="31.1"
        y1="16.9"
        y2="31.1"
        fill="none"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
      <line
        x1="31.1"
        x2="16.9"
        y1="16.9"
        y2="31.1"
        fill="none"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeWidth="4"
      />
    </svg>
  )
}
