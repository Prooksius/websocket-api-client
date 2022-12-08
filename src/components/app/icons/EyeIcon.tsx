import React from "react"

interface EyeIconProps {
  open: boolean
}
export const EyeIcon: React.FC<EyeIconProps> = ({ open }) => {
  if (open) {
    return ( // open eye
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 5.46777C4.6875 5.46777 1.5625 12.4998 1.5625 12.4998C1.5625 12.4998 4.6875 19.5303 12.5 19.5303C20.3125 19.5303 23.4375 12.4998 23.4375 12.4998C23.4375 12.4998 20.3125 5.46777 12.5 5.46777Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 16.4062C14.6574 16.4062 16.4062 14.6574 16.4062 12.5C16.4062 10.3426 14.6574 8.59375 12.5 8.59375C10.3426 8.59375 8.59375 10.3426 8.59375 12.5C8.59375 14.6574 10.3426 16.4062 12.5 16.4062Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  
  return ( // closed eye
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.6436 12.4316L21.8711 16.2898"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0566 14.5762L15.7513 18.516"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.93456 14.5742L9.23975 18.5147"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.35252 12.4287L3.11426 16.3055"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.125 10.2422C4.76685 12.2745 7.77677 14.8442 12.5001 14.8442C17.2233 14.8442 20.2332 12.2745 21.8751 10.2422"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
