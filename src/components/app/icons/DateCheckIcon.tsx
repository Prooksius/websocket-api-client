import React from "react"

interface DateCheckIconProps {
  enabled: boolean
}
export const DateCheckIcon: React.FC<DateCheckIconProps> = ({ enabled }) => {
  return (
    <div data-tip="Срок регистрации" data-for="for-top">
      <svg
        width="25"
        height="25"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={enabled ? "#ff005d" : "#777777"}
          d="M8,2V5h8V2h2V5h1.44A2.9,2.9,0,0,1,21,5.27a1.82,1.82,0,0,1,.76.76A2.9,2.9,0,0,1,22,7.56V19.44A2.9,2.9,0,0,1,21.73,21a1.82,1.82,0,0,1-.76.76,2.9,2.9,0,0,1-1.54.27H4.56A2.9,2.9,0,0,1,3,21.73,1.82,1.82,0,0,1,2.27,21,2.62,2.62,0,0,1,2,19.63V7.56A2.9,2.9,0,0,1,2.27,6,1.82,1.82,0,0,1,3,5.27,2.62,2.62,0,0,1,4.37,5H6V2ZM18,17H16v2h2Zm-5,0H11v2h2ZM8,17H6v2H8Zm10-4H16v2h2Zm-5,0H11v2h2ZM8,13H6v2H8ZM19,7H5A1,1,0,0,0,4,8H4v2H20V8a1,1,0,0,0-1-1Z"
          transform="translate(-2 -2)"
        />
      </svg>
    </div>
  )
}
