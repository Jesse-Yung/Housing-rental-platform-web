import React, { FC, useEffect, useRef, useState } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { useForm } from 'react-hook-form'
import { api, ReviewMaterial, UserSession } from '../api'
import Button from '../components/Button'
import { useQuery } from '../hooks/useQueryMutation'
import upload from '../share/upload_image.png'


interface ApplyPageProps {
    mode: 'create' | 'update'
}

const ApplyPage: FC<ApplyPageProps> = ({ mode }) => {
    const [_, setPath] = usePath()
    const [] = useState()
    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm()
    const [degree, setDegree] = useState<String>()
    const [certification, setCertification] = useState<String>()
    const [accountInformation, setAccountInformation] = useState<String>()
    const {} = useQuery(() =>  api.users.id((api.session.getSession() as UserSession).user.id, {
        "_includes": ["review_material"]
    }).exec(), { disabled: mode === 'create',
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
    const onSubmit = async (data: any) => {
        const input = new FormData()
        input.append("name", data.name)
        input.append("idNumber", data.idNumber)
        input.append("phoneNumber", data.phoneNumber)
        input.append("degree", data.degree[0])
        input.append("certification", data.certification[0])
        input.append("accountInformation", data.accountInformation[0])
        await api.reviewMaterials.create(input).exec().then(() => {
            alert("申请提交成功")
            window.location.href = "my-apply"
        }).catch(() => {
            alert("申请出错了")
        })
    }
    return <Layout>
        <Header />
        <HSpace height={32} />
        <Container>
            <Button onClick={()=> window.history.go(-1)}>返回</Button>
            <HSpace height={16} />
            <Column className={css`
                padding: 16px;
                box-shadow: 0 4px 8px #ddd;
                border-radius: 2px;
            `}>
                <h2>提交公租房资格申请</h2>
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
                    <label>姓名</label>
                    <input type="text" {...register('name', { required: "請輸入姓名" })} />
                    <label>身份证号码</label>
                    <input type="text" {...register('idNumber', { required: "請輸入身份证号码" })} />
                    <label>手机号码</label>
                    <input type="text" {...register('phoneNumber', { required: "請輸入手机号码" })} />
                    <label>
                        <p>学历</p>
                        <img src={degree ? degree : upload } />
                        <input type="file" accept="image/*" style={{ display: 'none' }} {...register('degree', { required: "請輸入学历证明", onChange: (e) => {
                            if (e.target.files.length > 0) {
                                setDegree(URL.createObjectURL(e.target.files[0]))
                            }
                        } })} />
                    </label>
                    <label>
                        <p>证书</p>
                        <img src={certification ? certification : upload } />
                        <input type="file" accept="image/*"  style={{ display: 'none' }} {...register('certification', {onChange: (e) => {
                            setCertification(URL.createObjectURL(e.target.files[0]))
                        } })} />
                    </label>
                    <label>
                        <p>户口信息</p>
                        <img src={accountInformation ? accountInformation : upload } />
                        <input type="file" accept="image/*" style={{ display: 'none' }} {...register('accountInformation', { required: "請輸入户口信息证明", onChange: (e) => {
                            setAccountInformation(URL.createObjectURL(e.target.files[0]))
                        } })} />
                    </label>
                    <Button type="submit" style={{ alignSelf: 'center' }}>{mode === 'create' ? '提交' : '修改'}申请</Button>
                </form>
            </Column>
            <HSpace height={64} />
        </Container>
    </Layout>
}

export default ApplyPage
