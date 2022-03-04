import React,{ FC } from "react";


interface WSpaceProps {
    width: number
}

const WSpace: FC<WSpaceProps> = ({ width }) => {
    return <div style={{ width: `${width}px` }}/>
}


export default WSpace
