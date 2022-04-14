import React, { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Layout from '../components/Layout'
import Header from '../components/Header'
import Column from '../components/Column'
import { Button, Error, Form, FormInput, FormLabel, FormRow } from '../components/Form'
import HSpace from '../components/HSpace'
import usePath from 'react-use-path'
import { createUser } from '../share/api'


const SignUp: FC = () => {
    const [_, setPath] = usePath()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const onSubmit = (data: any) => {
        createUser({
            phoneNumber: data.phoneNumber,
            password: data.password
        }).then(() => {
            alert("注册成功，将跳转到登录页面")
            setPath("/sign-in")
        }).catch(() => {
            alert("该号码已经注册过了，请重新注册")
            setValue("phoneNumber", "")
            setValue("password", "")
        })
    }
    return <Layout>
        <Header />
        <HSpace height={100} />
        <Column>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormRow className="form-control-row">
                    <FormLabel htmlFor="phoneNumber">手机号码</FormLabel>
                    <FormInput autoCorrect="off" autoCapitalize="none" {...register('phoneNumber', { required: "請輸入手机号码" })} />
                    {errors.phoneNumber ? <Error>{errors.phoneNumber.message}</Error> : null}
                </FormRow>
                <FormRow className="form-control-row">
                    <FormLabel htmlFor="password">密碼</FormLabel>
                    <FormInput type="password" {...register('password', { required: "請輸入密碼", minLength: { value: 6, message: '密碼最短6位' }, maxLength: { value: 16, message: '密碼最長16位' }})} />
                    {errors.password ? <Error>{errors.password.message}</Error> : null}
                </FormRow>
                <Button type='submit'>注册</Button>
            </Form>
        </Column>
    </Layout>
}

export default SignUp
