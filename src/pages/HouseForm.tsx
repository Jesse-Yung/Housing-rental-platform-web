import React, { FC, useEffect, useState } from 'react'
import { css } from 'linaria'
import * as api from '../share/api'
import ImageUploading from 'react-images-uploading';
import useSession from '../hooks/useSession'
import usePath from 'react-use-path'
import HSpace from '../components/HSpace'
import Button, { OpButton } from '../components/Button'
import { useMutation, useQuery } from '../hooks/useQueryMutation'
import { Table } from '../components/FormTable'
import { TableContainer } from '../components/Table'
import { House, HouseLevel, Sex, UserUpdateInput } from '../share/models'
import Layout from '../components/Layout'
import AdminHeader from '../components/AdminHeader'
import Header from '../components/Header'
import Container from '../components/Container'
import Row from '../components/Row'
import Loading from '../components/Loading'
import { useForm } from 'react-hook-form'
import { Error, Label } from '../components/Form'
import Column from '../components/Column';



interface HouseFormProps {
    mode: 'create' | 'update'
    id?: string
}

const HouseForm: FC<HouseFormProps> = ({ id, mode }) => {

    const [session] = useSession()
    const [_, setPath] = usePath()
    const [images, setImages] = useState<any[]>()
    const [loading, setLoading] = useState(false)
    const [canSend, setCanSend] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
    useQuery(() => api.getHouse(id!), {
        onData: (d) => {
            setImages(d.pictures?.map((p) => {
                return {"data_url": p, "exist": true}
            }))
            delete d.pictures
            reset(d)
        }
    })
    const { mutate: create } = useMutation((input: House) => api.createHouse(input))
    const { mutate: update } = useMutation((input: House) => api.updateHouse(id!, input))
    const onSubmit = async(data: any) => {
        data['pictures'] = []
        data['level'] = Number(data['level'])
        data['area'] = Number(data['area'])
        data['price'] = Number(data['price'])
        setLoading(true)
        console.log(data)
        images?.map((i: any, index) => {
            if (i['exist']) {
                data['pictures'] = [...data['pictures'], i['data_url']]
                return
            }
            const image = new FormData()
            image.append('url', i['file'])
            console.log(index+1, images.length)
            api.upload(image).then((u) => {
                data['pictures'] = [...data['pictures'], u.data?.url]
                if (index+1 === images.length) {
                    mode === 'create' ? create(data).then(() => { setLoading(false); setPath('/houses') }) : update(data).then(() => { setLoading(false); setPath('/houses') })
                }
            })
        })
    }
    return <Layout>
        {session?.admin ? <AdminHeader /> : <Header />}
        <HSpace height={16} />
        <Container>
            <Row style={{ justifyContent: 'space-between' }}>
                <Button onClick={() => window.history.go(-1)}>??????</Button>
            </Row>
            <HSpace height={16} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <TableContainer>
                    <h1>{mode === 'create' ? '??????' : '??????'}??????</h1>
                    <Table>
                        <tbody>
                            <tr>
                                <th>??????</th>
                                <td colSpan={3}>
                                    <input {...register('title', { required: "???????????????"})} />
                                    {errors.title ? <Error>{errors.title.message}</Error> : null}
                                </td>
                            </tr>
                            <tr>
                                <th>??????</th>
                                <td>
                                    <input {...register('type', { required: "???????????????"})} />
                                    {errors.type ? <Error>{errors.type.message}</Error> : null}
                                </td>
                                <th>????????????</th>
                                <td>
                                    <select {...register('level', { required: "???????????????"})}>
                                        <option value='' hidden disabled selected>?????????????????????</option>
                                        <option value={1}>??????</option>
                                        <option value={2}>??????</option>
                                        <option value={3}>??????</option>
                                    </select>
                                    {errors.level ? <Error>{errors.level.message}</Error> : null}
                                </td>
                            </tr>
                            <tr>
                                <th>??????</th>
                                <td colSpan={3}>
                                    <input {...register('location', { required: "???????????????"})} />
                                    {errors.location ? <Error>{errors.location.message}</Error> : null}
                                </td>
                            </tr>
                            <tr>
                                <th>??????</th>
                                <td>
                                    <input type='number' {...register('area', { required: "???????????????"})} />
                                    {errors.area ? <Error>{errors.area.message}</Error> : null}
                                </td>
                                <th>??????</th>
                                <td>
                                    <input type='number' {...register('price', { required: "???????????????"})} />
                                    {errors.price ? <Error>{errors.price.message}</Error> : null}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <ImageUploading
                        multiple
                        value={images!}
                        onChange={(imageList, addUpdateIndex) => {
                            console.log(imageList, addUpdateIndex);
                            setImages(imageList)}}
                        maxNumber={10}
                        dataURLKey="data_url"
                    >
                        {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        dragProps,
                        }) => (
                        <div className={css`
                            align-self: flex-start;
                        `}>
                            <h3>????????????</h3>
                            <OpButton
                            color='green'
                            action={onImageUpload}
                            {...dragProps}
                            >
                            +Add
                            </OpButton>
                            <OpButton color='red' action={onImageRemoveAll}>Remove All</OpButton>
                            <Row style={{ flexWrap: 'wrap', alignItems: 'center' }}>
                                {imageList.map((image, index) => (
                                <Column key={index} style={{ marginRight: '16px', marginTop: '16px' }}>
                                    <img src={image['data_url']} alt="" height="150" />
                                    <HSpace height={6} />
                                    <Row>
                                        <OpButton color='blue' action={() => onImageUpdate(index)}>Replace</OpButton>
                                        <OpButton color='red' action={() => onImageRemove(index)}>Remove</OpButton>
                                    </Row>
                                </Column>
                                ))}
                            </Row>
                        </div>
                        )}
                    </ImageUploading>
                    <HSpace height={16} />
                    <Button type='submit'>{loading ? <div className={css`
                        width: 12px;
                        align-items: center;
                        margin: 0 auto;
                    `}><Loading /></div> : mode === 'create' ? '??????' : '??????'}</Button>
                </TableContainer>
            </form>
        </Container>
    </Layout>
}

export default HouseForm
