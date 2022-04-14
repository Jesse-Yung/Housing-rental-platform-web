import React,{ FC, useState } from "react";
import { css } from "linaria";
import Column from "./Column";
import HSpace from "./HSpace";
import useSession from "../hooks/useSession";
import { getUser } from "../share/api";


const ToolBar: FC = () => {
    const [hasApply, setHasApply] = useState(false)
    const [session] = useSession()
    if (session?.user) {
        getUser(session.user!.id, '_includes[0]=review_material').then((user) => {
            if (user.reviewMaterial) {
                setHasApply(true)
            }
        })
    }

    return <Column className={css`
        position: fixed;
        right: 0;
        top: 96px;
        z-index: 100;
        height: 100%;
        width: 38px;
        box-shadow: 0 1px 10px rgba(0,0,0,.2);
        background: #fff;
        color: black;
    `}>
       <HSpace height={200} />
        <a href="">消息</a>
        <a href="">个人</a>
        <a href={hasApply ? "my-apply": "apply"}>申请</a>
    </Column>
}


export default ToolBar
