import React, { FC } from 'react'
import { useForm } from "react-hook-form"
import Layout from '../components/Layout'
import Header from '../components/Header'
import HSpace from '../components/HSpace'
import Column from '../components/Column'
import { Form, FormInput, FormLabel, FormRow, Button, Error } from '../components/Form'
import usePath from 'react-use-path'
import { userSignIn } from '../share/api'
import useSession from '../hooks/useSession'

const SignIn: FC = () => {
    const [_, setPath] = usePath()
    const [__, setSession] = useSession()
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const onSubmit = async(data: any) => {
        const result = await userSignIn({
            phoneNumber: data.phoneNumber,
            password: data.password
        })
        if (result) {
            setSession(result)
            setPath('/')
        } else {
            setError('phoneNumber', {message: '用戶名不存在或密碼錯誤'})
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
                <Button type='submit'>登陆</Button>
            </Form>
        </Column>
    </Layout>
}

export default SignIn
