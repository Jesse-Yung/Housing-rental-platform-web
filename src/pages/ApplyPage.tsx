import React, { FC, useEffect } from 'react'
import usePath from 'react-use-path'
import { css } from 'linaria'
import Container from '../components/Container'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Layout from '../components/Layout'
import Column from '../components/Column'
import { useForm } from 'react-hook-form'
import { api, User, UserSession } from '../api'




const ApplyPage: FC = () => {
    const [_, setPath] = usePath()
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
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
                `}>
                    <label>姓名</label>
                    <input type="text" {...register('name', { required: "請輸入姓名" })} />
                    <label>身份证号码</label>
                    <input type="text" {...register('idNumber', { required: "請輸入身份证号码" })} />
                    <label>手机号码</label>
                    <input type="text" {...register('phoneNumber', { required: "請輸入手机号码" })} />
                    <label>学历</label>
                    <input type="file" {...register('degree', { required: "請輸入学历证明" })} />
                    <label>证书</label>
                    <input type="file" {...register('certification')} />
                    <label>户口信息</label>
                    <input type="file" {...register('accountInformation', { required: "請輸入户口信息证明" })} />
                    <button type="submit">提交申请</button>
                </form>

            </Column>
        </Container>
    </Layout>
}

export default ApplyPage
