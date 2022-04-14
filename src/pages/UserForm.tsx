import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import * as api from '../share/api'
import Column from '../components/Column'
import useSession from '../hooks/useSession'
import usePath from 'react-use-path'
import HSpace from '../components/HSpace'
import Button from '../components/Button'
import { useMutation, useQuery } from '../hooks/useQueryMutation'
import { Table } from '../components/FormTable'
import { TableContainer } from '../components/Table'
import { HouseLevel, Sex, UserUpdateInput } from '../share/models'
import Layout from '../components/Layout'
import AdminHeader from '../components/AdminHeader'
import Header from '../components/Header'
import Container from '../components/Container'
import Row from '../components/Row'
import WSpace from '../components/WSpace'
import Loading from '../components/Loading'
import { useForm } from 'react-hook-form'
import { Label } from '../components/Form'



interface UserFormProps {
    id?: string
}

const UserForm: FC<UserFormProps> = ({ id }) => {

    const [session, setSession] = useSession()
    const { register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
    useQuery(() => api.getUser(id!), {
        onData: (d) => reset(d)
    })
    const { mutating: updateLoading, mutate: update } = useMutation((input: UserUpdateInput) => api.updateUser(id!, input), {
        onResult:() => window.location.reload(),
        onError:() => {alert("出现错误"); window.location.reload()}
     })
    const onSubmit = async(data: any) => { await update(data) }
    return <Layout>
        {session?.admin ? <AdminHeader /> : <Header />}
        <HSpace height={16} />
        <Container>
            <Row style={{ justifyContent: 'space-between' }}>
                <Button onClick={() => window.history.go(-1)}>返回</Button>
            </Row>
            <HSpace height={16} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <TableContainer>
                    <h1>修改用户</h1>
                    <Table>
                        <tbody>
                            <tr>
                                <th>用户名</th>
                                <td><input {...register('username', { required: "請输入用户名"})} /></td>
                            </tr>
                            <tr>
                                <th>姓名</th>
                                <td><input {...register('name', { required: "請输入姓名"})} /></td>
                            </tr>
                            <tr>
                                <th>性别</th>
                                <td>
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
                                </td>
                            </tr>
                            <tr>
                                <th>租房等级</th>
                                <td>
                                <select onChange={(e) => {
                                    setValue("houseLevel", e.target.value as HouseLevel)
                                }}>
                                    <option value='' hidden disabled selected>请选择租房资格等级</option>
                                    <option value={HouseLevel.one}>一级</option>
                                    <option value={HouseLevel.two}>二级</option>
                                    <option value={HouseLevel.three}>三级</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <th>邮箱</th>
                                <td><input {...register('email')} /></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button type='submit'>{updateLoading ? <div className={css`
                        width: 12px;
                        align-items: center;
                        margin: 0 auto;
                    `}><Loading /></div> : '修改'}</Button>
                </TableContainer>
            </form>
        </Container>
    </Layout>
}

export default UserForm
