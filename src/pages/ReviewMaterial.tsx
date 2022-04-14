import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import Button from '../components/Button'
import Row from '../components/Row'
import usePath from 'react-use-path'
import WSpace from '../components/WSpace'
import ModalImage from "react-modal-image"
import { HouseLevel, ReviewMaterial, Status, User } from '../share/models'
import { getReviewMaterial, getUser, updateReviewMaterial, updateUser } from '../share/api'
import useSession from '../hooks/useSession'


interface ReviewMaterialProps {
    mode: 'review' | 'inspect'
    id?: string
}

const ReviewMaterialPage: FC<ReviewMaterialProps> = ({ mode, id }) => {
    const [session] = useSession()
    const [reviewMaterial, setReviewMaterial] = useState<ReviewMaterial>()
    const [user, setUser] = useState<User>()
    const [_, setPath] = usePath()
    const [level, setLevel] = useState<HouseLevel | undefined>()
    useEffect(() => {
        if (id) {
            getReviewMaterial(id).then((r) => {
                setReviewMaterial(r)
                getUser(r.authorId!, "_includes[0]=house_level").then((user) => {
                    setUser(user)
                })
            })

            if (reviewMaterial?.status === Status.pengding) {
                updateReviewMaterial(id!, { status: Status.processing })
            }
        } else {
           getUser(session?.user!.id!, '_includes[0]=review_material').then((user) => {
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
            <Row style={{ justifyContent: 'space-between' }}>
                {mode === 'review' ? <Button onClick={() => setPath('/admin')}>返回列表</Button> : <Button onClick={() => setPath('')}>返回首页</Button>}
                {mode === 'inspect' && reviewMaterial?.status !== Status.finished ? <Button onClick={() => setPath('/apply-update')}>修改</Button> : null}
            </Row>
            <HSpace height={32} />
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
                    <WSpace width={12} />
                    {reviewMaterial?.status === Status.finished && user?.houseLevel !== undefined ?
                    <div className={css`
                        border: 1px solid blueviolet;
                        padding: 10px 20px;
                        font-size: large;
                        transform: rotate(-16deg);
                    `}>{`租房等级${user.houseLevel === "ONE" ? "一级" : user.houseLevel === "TWO" ? "二级" : "三级"}`}</div>
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
                    <div style={{ maxWidth: '400px' }}>
                        <ModalImage
                        small={reviewMaterial?.degree}
                        large={reviewMaterial?.degree}
                        alt="查看学历"
                        />
                    </div>
                    <label>证书</label>
                    <div style={{ maxWidth: '400px' }}>
                        <ModalImage
                        small={reviewMaterial?.certification}
                        large={reviewMaterial?.certification}
                        alt="查看证书"
                        />
                    </div>
                    <label>户口信息</label>
                    <div style={{ maxWidth: '400px' }}>
                        <ModalImage
                        small={reviewMaterial?.accountInformation}
                        large={reviewMaterial?.accountInformation}
                        alt="查看户口信息"
                        />
                    </div>
                    {mode === 'inspect' || reviewMaterial?.status === Status.finished ? null :
                    <Column>
                        <HSpace height={32} />
                        <span>租房等级：</span>
                        <select required onChange={(e) => {
                            setLevel(e.target.value as HouseLevel)
                        }}>
                            <option value='' hidden disabled selected>请选择租房资格等级</option>
                            <option value={HouseLevel.one}>一级</option>
                            <option value={HouseLevel.two}>二级</option>
                            <option value={HouseLevel.three}>三级</option>
                        </select>
                        <HSpace height={32} />
                        <Row style={{ alignSelf: 'stretch' }}>
                            <Button onClick={async() => {
                                if (level) {
                                    if(window.confirm("确认通过审核吗？")) {
                                        await updateReviewMaterial(id!, { status: Status.finished })
                                        updateUser(reviewMaterial?.authorId!, { houseLevel: level}).then((u) => {
                                            console.log(u)
                                            window.location.reload()
                                        })
                                    }
                                }
                            }}>通过审核</Button>
                            <WSpace width={32} />
                            <Button onClick={async() => {
                                if(window.confirm("确认拒绝通过审核吗？")) {
                                    await updateReviewMaterial(id!, { status: Status.finished })
                                    updateUser(reviewMaterial?.authorId!, { houseLevel: null}).then(() => {
                                        window.location.reload()
                                    })
                                }
                            }}>拒接通过审核</Button>
                        </Row>
                    </Column>
                    }
                </div>
            </Column>
        </Container>
    </Layout>
}

export default ReviewMaterialPage
