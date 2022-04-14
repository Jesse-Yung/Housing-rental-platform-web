import React, { FC } from 'react'
import { css } from 'linaria'



interface LoadingProps {
    color?: string
}
const Loading: FC<LoadingProps> = ({ color }) => {
    return <svg className={css`
        animation: 2s linear infinite svg-animation;
        max-width: 100px;
        @keyframes svg-animation {
            0% {
            transform: rotateZ(0deg);
            }
            100% {
            transform: rotateZ(360deg)
            }
        }
    `} width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle
        stroke={color ? color : 'green'}
        className={css`
        animation: 1.4s ease-in-out infinite both circle-animation;
        display: block;
        fill: transparent;
        //stroke: #f2346c;
        stroke-linecap: round;
        stroke-dasharray: 283;
        stroke-dashoffset: 280;
        stroke-width: 10px;
        transform-origin: 50% 50%;
        // Circle animation.
        @keyframes circle-animation {
            0%,
            25% {
            stroke-dashoffset: 280;
            transform: rotate(0);
            }

            50%,
            75% {
            stroke-dashoffset: 75;
            transform: rotate(45deg);
            }

            100% {
            stroke-dashoffset: 280;
            transform: rotate(360deg);
            }
        }
    `} cx="50" cy="50" r="45"/>
  </svg>
}

export default Loading
