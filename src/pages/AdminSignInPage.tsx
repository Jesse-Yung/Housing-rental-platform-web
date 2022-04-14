import React, { FC } from 'react'
import { useForm } from "react-hook-form"
import Column from '../components/Column'
import { Form, FormInput, FormLabel, FormRow, Button, Error } from '../components/Form'
import usePath from 'react-use-path'
import { adminSignIn } from '../share/api'
import useSession from '../hooks/useSession'

const AdminSignPage: FC = () => {
    const [_, setPath] = usePath()
    const [__, setSession] = useSession()
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const onSubmit = async(data: any) => {
        const result = await adminSignIn({
            username: data.username,
            password: data.password
        })
        if (result) {
            setSession(result)
            setPath('/admin')
        } else {
            setError('username', {message: '用戶名不存在或密碼錯誤'})
        }
    }
    return <Column>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow className="form-control-row">
                <FormLabel htmlFor="username">用户名</FormLabel>
                <FormInput autoCorrect="off" autoCapitalize="none" {...register('username', { required: "請輸入用户名" })} />
                {errors.username ? <Error>{errors.username.message}</Error> : null}
            </FormRow>
            <FormRow className="form-control-row">
                <FormLabel htmlFor="password">密碼</FormLabel>
                <FormInput type="password" {...register('password', { required: "請輸入密碼"})} />
                {errors.password ? <Error>{errors.password.message}</Error> : null}
            </FormRow>
            <Button type='submit'>登陆</Button>
        </Form>
    </Column>
}

export default AdminSignPage
