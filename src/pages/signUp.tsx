import React, { FC } from 'react'
import { api } from "../api"
import { useForm, SubmitHandler } from "react-hook-form"

const SignUp: FC = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm()
    const onSubmit = (data: any) => {
        api.users.create({
            phoneNumber: data.phoneNumber,
            password: data.password
        }).exec()
    }
    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control-row">
                <label htmlFor="username">手机号码</label>
                <input autoCorrect="off" autoCapitalize="none" {...register('phoneNumber', { required: "請輸入手机号码" })} />
                {errors.username ? <div className="error">{errors.username.message}</div> : null}
            </div>
            <div className="form-control-row">
                <label htmlFor="password">密碼</label>
                <input type="password" {...register('password', { required: "請輸入密碼", minLength: { value: 6, message: '密碼最短6位' }, maxLength: { value: 16, message: '密碼最長16位' }})} />
                {errors.password ? <div className="error">{errors.password.message}</div> : null}
            </div>
            <button type='submit'>注册</button>
        </form>
    </div>
}

export default SignUp
