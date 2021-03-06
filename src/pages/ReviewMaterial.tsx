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
                {mode === 'review' ? <Button onClick={() => setPath('/admin')}>????????????</Button> : <Button onClick={() => setPath('')}>????????????</Button>}
                {mode === 'inspect' && reviewMaterial?.status !== Status.finished ? <Button onClick={() => setPath('/apply-update')}>??????</Button> : null}
            </Row>
            <HSpace height={32} />
            <Column className={css`
                padding: 16px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <h2>{mode === 'inspect' ? '??????' : reviewMaterial?.name + '???'}??????????????????</h2>
                <HSpace height={16} />
                <Row>
                    <div className={css`
                        border: 1px solid blueviolet;
                        padding: 10px 20px;
                        font-size: large;
                        transform: rotate(-16deg);
                    `}>{reviewMaterial?.status === Status.pengding ? "???????????????" : reviewMaterial?.status === Status.processing ? "?????????" : "???????????????"}</div>
                    <WSpace width={12} />
                    {reviewMaterial?.status === Status.finished && user?.houseLevel !== undefined ?
                    <div className={css`
                        border: 1px solid blueviolet;
                        padding: 10px 20px;
                        font-size: large;
                        transform: rotate(-16deg);
                    `}>{`????????????${user.houseLevel === "ONE" ? "??????" : user.houseLevel === "TWO" ? "??????" : "??????"}`}</div>
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
                    <label>??????</label>
                    <p>{reviewMaterial?.name}</p>
                    <label>???????????????</label>
                    <p>{reviewMaterial?.idNumber}</p>
                    <label>????????????</label>
                    <p>{reviewMaterial?.phoneNumber}</p>
                    <label>??????</label>
                    <div style={{ maxWidth: '400px' }}>
                        <ModalImage
                        small={reviewMaterial?.degree}
                        large={reviewMaterial?.degree}
                        alt="????????????"
                        />
                    </div>
                    <label>??????</label>
                    <div style={{ maxWidth: '400px' }}>
                        <ModalImage
                        small={reviewMaterial?.certification}
                        large={reviewMaterial?.certification}
                        alt="????????????"
                        />
                    </div>
                    <label>????????????</label>
                    <div style={{ maxWidth: '400px' }}>
                        <ModalImage
                        small={reviewMaterial?.accountInformation}
                        large={reviewMaterial?.accountInformation}
                        alt="??????????????????"
                        />
                    </div>
                    {mode === 'inspect' || reviewMaterial?.status === Status.finished ? null :
                    <Column>
                        <HSpace height={32} />
                        <span>???????????????</span>
                        <select required onChange={(e) => {
                            setLevel(e.target.value as HouseLevel)
                        }}>
                            <option value='' hidden disabled selected>???????????????????????????</option>
                            <option value={HouseLevel.one}>??????</option>
                            <option value={HouseLevel.two}>??????</option>
                            <option value={HouseLevel.three}>??????</option>
                        </select>
                        <HSpace height={32} />
                        <Row style={{ alignSelf: 'stretch' }}>
                            <Button onClick={async() => {
                                if (level) {
                                    if(window.confirm("????????????????????????")) {
                                        await updateReviewMaterial(id!, { status: Status.finished })
                                        updateUser(reviewMaterial?.authorId!, { houseLevel: level}).then((u) => {
                                            console.log(u)
                                            window.location.reload()
                                        })
                                    }
                                }
                            }}>????????????</Button>
                            <WSpace width={32} />
                            <Button onClick={async() => {
                                if(window.confirm("??????????????????????????????")) {
                                    await updateReviewMaterial(id!, { status: Status.finished })
                                    updateUser(reviewMaterial?.authorId!, { houseLevel: null}).then(() => {
                                        window.location.reload()
                                    })
                                }
                            }}>??????????????????</Button>
                        </Row>
                    </Column>
                    }
                </div>
            </Column>
        </Container>
    </Layout>
}

export default ReviewMaterialPage
