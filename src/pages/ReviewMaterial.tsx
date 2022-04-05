import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { api, HouseLevel, ReviewMaterial, Status, User, UserSession } from '../api'
import { Button } from '../components/Form'
import Row from '../components/Row'
import usePath from 'react-use-path'


interface ReviewMaterialProps {
    mode: 'review' | 'inspect'
    id?: string
}

const ReviewMaterialPage: FC<ReviewMaterialProps> = ({ mode, id }) => {
    const [reviewMaterial, setReviewMaterial] = useState<ReviewMaterial>()
    const [user, setUser] = useState<User>()
    const [_, setPath] = usePath()
    const [level, setLevel] = useState<HouseLevel | undefined>()
    useEffect(() => {
        if (id) {
            api.reviewMaterials.id(id).exec().then((r) => {
                setReviewMaterial(r)
                api.users.id(r.authorId!, {
                    "_includes": ["house_levels"]
                }).exec().then((user) => {
                    setUser(user)
                    console.log(user)
                })
            })

            if (reviewMaterial?.status === Status.pengding) {
                api.reviewMaterials.update(id!, { status: Status.processing }).exec()
            }
        } else {
            api.users.id((api.session.getSession() as UserSession).user.id, {
                "_includes": ["review_material"]
            }).exec().then((user) => {
                if (user.reviewMaterial) {
                    setReviewMaterial(user.reviewMaterial)
                }
            })
        }
    }, [mode, id])
    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container>
            <Column className={css`
                padding: 16px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <h2>{mode === 'inspect' ? '我的' : reviewMaterial?.name + '的'}租房资格申请</h2>
                <HSpace height={16} />
                <Row>
                    <div className={css`
                        border: 1px solid blueviolet;
                        padding: 10px 20px;
                        font-size: large;
                        transform: rotate(-16deg);
                    `}>{reviewMaterial?.status === Status.pengding ? "等待审核中" : reviewMaterial?.status === Status.processing ? "审核中" : "已审核完成"}</div>
                    {reviewMaterial?.status === Status.finished && user?.houseLevels !== undefined ?
                    <div className={css`
                        border: 1px solid blueviolet;
                        padding: 10px 20px;
                        font-size: large;
                        transform: rotate(-16deg);
                    `}>{`租房等级${user.houseLevels}`}</div>
                    : null}
                </Row>
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
                    {mode === 'inspect' ? <Button onClick={() => setPath('/apply-update')}>修改</Button> :
                    reviewMaterial?.status === Status.finished ? null :
                    <Column className={css`
                        align-self: center;
                    `}>
                        <select onChange={(e) => {
                            setLevel(e.target.value as HouseLevel)
                        }}>
                            <option value='' hidden disabled selected>请选择租房资格等级</option>
                            <option value={HouseLevel.one}>一级</option>
                            <option value={HouseLevel.two}>二级</option>
                            <option value={HouseLevel.three}>三级</option>
                        </select>
                        <Button onClick={() => {
                            if(window.confirm("确认通过审核吗？")) {
                                api.reviewMaterials.update(id!, { status: Status.finished }).exec()
                                api.users.update(reviewMaterial?.authorId!, { houseLevels: level}).exec().then((u) => {
                                    console.log(u)
                                    window.location.reload()
                                })
                            }
                        }}>通过审核</Button>
                        <Button onClick={() => {
                            if(window.confirm("确认拒绝通过审核吗？")) {
                                api.reviewMaterials.update(id!, { status: Status.finished }).exec()
                                api.users.update(reviewMaterial?.authorId!, { houseLevels: null}).exec().then(() => {
                                    window.location.reload()
                                })
                            }
                        }}>拒接通过审核</Button>
                    </Column>
                    }
                </div>
            </Column>
        </Container>
    </Layout>
}

export default ReviewMaterialPage
