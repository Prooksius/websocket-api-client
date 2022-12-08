import React from "react"

interface RknCheckIconProps {
  enabled: boolean
}
export const RknCheckIcon: React.FC<RknCheckIconProps> = ({ enabled }) => {
  return (
    <div data-tip="РКН-статус" data-for="for-top">
      <svg
        width="25"
        height="25"
        viewBox="0 0 980.76 952.69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={enabled ? "#0a7fff" : "#777777"}
          d="M94.22,303.09c22.15-4.81,53.26-8.42,97.09-8.42,44.3,0,75.88,10.83,97.09,32.49,20.27,20.46,33.93,54.15,33.93,93.85S312,494.4,293.11,517.27C268.6,546.75,232.31,560,189.9,560a142.29,142.29,0,0,1-24.51-1.8v145H94.22Zm71.17,184.1c6.13,1.81,13.67,2.41,24,2.41,38.18,0,61.74-24.67,61.74-66.18,0-37.3-20.27-59.56-56.09-59.56-14.61,0-24.51,1.8-29.69,3.61Z"
          transform="translate(-14.62 -25.61)"
        />
        <path
          fill={enabled ? "#0a7fff" : "#777777"}
          d="M368.05,297.67h71.17V477h1.41c7.07-15.64,14.61-30.08,21.68-44.52l72.11-134.76h88.14L517.46,470.34,628.22,703.17H544.32L466.56,528.09l-27.34,42.71V703.17H368.05Z"
          transform="translate(-14.62 -25.61)"
        />
        <path
          fill={enabled ? "#0a7fff" : "#777777"}
          d="M729.55,297.67V453.49h118.3V297.67h71.64V703.17H847.85V533.51H729.55V703.17H657.44V297.67Z"
          transform="translate(-14.62 -25.61)"
        />
        <polygon
          fill={enabled ? "#0a7fff" : "#777777"}
          points="490.38 0 980.76 227.78 0 227.78 490.38 0"
        />
        <polygon
          fill={enabled ? "#00468a" : "#777777"}
          points="490.38 952.69 0 724.9 980.76 724.91 490.38 952.69"
        />
      </svg>
    </div>
  )
}
