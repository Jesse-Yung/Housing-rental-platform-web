import React, { FC, useEffect, useRef, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import { useQuery } from '../hooks/useQueryMutation'
import upload from '../share/upload_image.png'
import { createReviewMaterial, getUser } from '../share/api'
import useSession from '../hooks/useSession'


interface ApplyPageProps {
    mode: 'create' | 'update'
}

const ApplyPage: FC<ApplyPageProps> = ({ mode }) => {
    const [_, setPath] = usePath()
    const [session] = useSession()
    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm()
    const [degree, setDegree] = useState<String>()
    const [certification, setCertification] = useState<String>()
    const [accountInformation, setAccountInformation] = useState<String>()
    useQuery(() => getUser(session?.user!.id!), { disabled: mode === 'create',
        onData: (u) => {
            setValue('name', u.reviewMaterial?.name)
            setValue('idNumber', u.reviewMaterial?.idNumber)
            setValue('phoneNumber', u.reviewMaterial?.phoneNumber)
            setValue('degree', u.reviewMaterial?.degree)
            setValue('certification', u.reviewMaterial?.certification)
            setValue('accountInformation', u.reviewMaterial?.accountInformation)
            setDegree(u.reviewMaterial?.degree)
            setCertification(u.reviewMaterial?.certification)
            setAccountInformation(u.reviewMaterial?.accountInformation)
    } })
    const onSubmit = (data: any) => {
        const input = new FormData()
        input.append("name", data.name)
        input.append("idNumber", data.idNumber)
        input.append("phoneNumber", data.phoneNumber)
        input.append("degree", data.degree[0])
        input.append("certification", data.certification[0])
        input.append("accountInformation", data.accountInformation[0])
        createReviewMaterial(input).then(() => {
            alert("??????????????????")
            setPath('/my-apply')
        }).catch(() => {
            alert("???????????????")
        })
    }
    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container>
            <Button onClick={()=> window.history.go(-1)}>??????</Button>
            <HSpace height={16} />
            <Column className={css`
                padding: 16px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <h2>???????????????????????????</h2>
                <HSpace height={16} />
            </Column>
            <HSpace height={32} />
            <Column className={css`
                padding: 20px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <form onSubmit={handleSubmit(onSubmit)} className={css`
                    display: flex;
                    flex-direction: column;
                    align-self: flex-start;
                    align-items: flex-start;
                    font-size: 18px;
                    width: 100%;
                    input {
                        margin: 10px 0;
                        width: 300px;
                        min-height: 24px;
                    }
                `}>
                    <label>??????</label>
                    <input type="text" {...register('name', { required: "???????????????" })} />
                    <label>???????????????</label>
                    <input type="text" {...register('idNumber', { required: "????????????????????????" })} />
                    <label>????????????</label>
                    <input type="text" {...register('phoneNumber', { required: "?????????????????????" })} />
                    <label>
                        <p>??????</p>
                        <img src={degree ? degree : upload } />
                        <input type="file" accept="image/*" style={{ display: 'none' }} {...register('degree', { required: "?????????????????????", onChange: (e) => {
                            if (e.target.files.length > 0) {
                                setDegree(URL.createObjectURL(e.target.files[0]))
                            }
                        } })} />
                    </label>
                    <label>
                        <p>??????</p>
                        <img src={certification ? certification : upload } />
                        <input type="file" accept="image/*"  style={{ display: 'none' }} {...register('certification', {onChange: (e) => {
                            setCertification(URL.createObjectURL(e.target.files[0]))
                        } })} />
                    </label>
                    <label>
                        <p>????????????</p>
                        <img src={accountInformation ? accountInformation : upload } />
                        <input type="file" accept="image/*" style={{ display: 'none' }} {...register('accountInformation', { required: "???????????????????????????", onChange: (e) => {
                            setAccountInformation(URL.createObjectURL(e.target.files[0]))
                        } })} />
                    </label>
                    <Button type="submit" style={{ alignSelf: 'center' }}>{mode === 'create' ? '??????' : '??????'}??????</Button>
                </form>
            </Column>
            <HSpace height={64} />
        </Container>
    </Layout>
}

export default ApplyPage
