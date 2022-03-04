import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { api, ReviewMaterial, User, UserSession } from '../api'


const MyApplyPage: FC = () => {
    const [reviewMaterial, setReviewMaterial] = useState<ReviewMaterial>()
    useEffect(() => {
        api.users.id((api.session.getSession() as UserSession).user.id, {
            "_includes": ["review_material"]
        }).exec().then((user) => {
            if (user.reviewMaterial) {
                setReviewMaterial(user.reviewMaterial)
            }
        })
    }, [])
    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container>
            <Column className={css`
                padding: 16px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <h2>我的租房资格申请</h2>
                <HSpace height={16} />
            </Column>
            <HSpace height={32} />
            <Column className={css`
                padding: 20px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <div className={css`
                    display: flex;
                    flex-direction: column;
                    align-self: flex-start;
                `}>
                    <label>姓名</label>
                    <p>{reviewMaterial?.name}</p>
                    <label>身份证号码</label>
                    <p>{reviewMaterial?.idNumber}</p>
                    <label>手机号码</label>
                    <p>{reviewMaterial?.phoneNumber}</p>
                    <label>学历</label>
                    <img src={reviewMaterial?.degree} alt="" />
                    <label>证书</label>
                    <img src={reviewMaterial?.certification} alt="" />
                    <label>户口信息</label>
                    <img src={reviewMaterial?.accountInformation} alt="" />
                    <button>修改</button>
                </div>

            </Column>
        </Container>
    </Layout>
}

export default MyApplyPage
