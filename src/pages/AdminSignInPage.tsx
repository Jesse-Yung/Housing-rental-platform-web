import React, { FC } from 'react'
import { api } from "../api"
import { useForm } from "react-hook-form"
import Column from '../components/Column'
import { Form, FormInput, FormLabel, FormRow, Button, Error } from '../components/Form'
import usePath from 'react-use-path'

const AdminSignPage: FC = () => {
    const [_, setPath] = usePath()
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const onSubmit = (data: any) => {
        api.admins.signIn({
            username: data.username,
            password: data.password
        }).exec().then(() => {
            setPath('/admin')
        })
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
