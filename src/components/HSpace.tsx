import React, { FC } from "react";


interface HSpaceProps {
    height: number
}

const HSpace: FC<HSpaceProps> = ({ height }) => {
    return <div style={{ height: `${height}px` }}/>
}


export default HSpace
