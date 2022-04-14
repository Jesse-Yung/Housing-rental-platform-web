import React, { FC } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import Layout from '../components/Layout'
import Header from '../components/Header'
import Column from '../components/Column'
import { Button, Error, Form, FormInput, FormLabel, FormRow, Label } from '../components/Form'
import HSpace from '../components/HSpace'
import usePath from 'react-use-path'
import { createUser } from '../share/api'
import Row from '../components/Row'
import { Sex, UserCreateInput } from '../share/models'


const SignUp: FC = () => {
    const [_, setPath] = usePath()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const onSubmit = async (data: any) => {
        const result = await createUser(data)
        if (result) {
            alert("注册成功，将跳转到登录页面")
            setPath("/sign-in")
        } else {
            alert("该号码已经注册过了，请重新注册")
            setValue("phoneNumber", "")
            setValue("password", "")
        }
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
                <FormRow className="form-control-row">
                    <FormLabel htmlFor="name">姓名</FormLabel>
                    <FormInput {...register('name', { required: "請輸入姓名"})} />
                    {errors.name ? <Error>{errors.name.message}</Error> : null}
                </FormRow>
                <FormRow className="form-control-row">
                    <FormLabel htmlFor="name">用户名</FormLabel>
                    <FormInput {...register('username', { required: "請輸入姓名"})} />
                    {errors.username ? <Error>{errors.username.message}</Error> : null}
                </FormRow>
                <FormRow className="form-control-row">
                    <FormLabel>性别</FormLabel>
                    <Row>
                        <Label>
                            <input value={Sex.male}  type="radio" {...register('sex', { required: "請选择性别"})} />
                            <span>男</span>
                        </Label>
                        <Label>
                            <input value={Sex.female} type="radio" {...register('sex', { required: "請选择性别"})} />
                            <span>女</span>
                        </Label>
                    </Row>
                    {errors.sex ? <Error>{errors.sex.message}</Error> : null}
                </FormRow>
                <Button type='submit'>注册</Button>
            </Form>
        </Column>
    </Layout>
}

export default SignUp
