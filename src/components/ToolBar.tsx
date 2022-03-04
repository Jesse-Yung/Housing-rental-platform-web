import React,{ FC, useState } from "react";
import { css } from "linaria";
import Column from "./Column";
import HSpace from "./HSpace";
import { api, UserSession } from "../api";


const ToolBar: FC = () => {
    const [hasApply, setHasApply] = useState(false)
    if ((api.session.getSession() as UserSession).user) {
        api.users.id((api.session.getSession() as UserSession)?.user?.id, {
            "_includes": ["review_material"]
        }).exec().then((user) => {
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
    `}>
       <HSpace height={200} />
        <a href="">消息</a>
        <a href="">个人</a>
        <a href={hasApply ? "my-apply": "apply"}>申请</a>
    </Column>
}


export default ToolBar
