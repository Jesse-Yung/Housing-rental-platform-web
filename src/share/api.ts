import { getSessionToken } from '../hooks/useSession'
import { AdminSessionInput, APIResponse, House, Image, ReviewMaterial, ReviewMaterialUpdateInput, Session, User, UserCreateInput, UserSessionInput, UserUpdateInput } from './models'

const host = "http://127.0.0.1:8000"

function url(path: string): string {
    return host + path
}

async function _request<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
                           path: string,
                           headers?: {[key: string]: string},
                           body?: any): Promise<APIResponse<T>> {
    if (!headers) { headers = {} }
    const token = getSessionToken()
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(url(path), {method, headers, body})
    if (method == 'DELETE') {
        return {}
    } else {
        const json = await response.json()
        return json
    }
}

async function _get<T>(path: string): Promise<T> {
    const result = await _request('GET', path, {
        'Accept': 'application/json'
    })
    return result.data! as T
}

async function _data<T>(method: 'POST' | 'PATCH',
                        path: string,
                        data: any): Promise<APIResponse<T>> {
    return await _request(method, path, {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }, JSON.stringify(data))
}

async function _delete(path: string): Promise<void> {
    await _request('DELETE', path, {
        'Accept': 'application/json'
    })
}

async function _post<T>(path: string, data: any): Promise<T> {
    const result = await _data<T>('POST', path, data)
    return result.data!
}

async function _patch<T>(path: string, data: any): Promise<T> {
    return (await _data<T>('PATCH', path, data)).data!
}

// 登陆模块
export async function userSignIn(input: UserSessionInput): Promise<Session> {
    return await _post<Session>('/users/session', input)
}

export async function adminSignIn(input: AdminSessionInput): Promise<Session> {
    return await _post<Session>('/admins/session', input)
}


// 用户模块
export async function getUsers(qs?: string): Promise<User[]> {
    return await _get<User[]>(`/users?${qs ? qs : ''}`)
}

export async function getUser(id: string, qs?: string): Promise<User> {
    return await _get<User>(`/users/${id}?${qs ? qs : ''}`)
}

export async function createUser(input: UserCreateInput): Promise<UserCreateInput> {
    return await _post<UserCreateInput>(`/users`, input)
}

export async function updateUser(id: string, input: UserUpdateInput): Promise<User> {
    return await _patch<User>(`/users/${id}`, input)
}

export async function deleteUser(id: string): Promise<void> {
    return await _delete(`/users/${id}`)
}

//房源
export async function getHouses(qs?: string): Promise<House[]> {
    return await _get<House[]>(`/houses?${qs ? qs : ''}`)
}

export async function getHouse(id: string, qs?: string): Promise<House> {
    return await _get<House>(`/houses/${id}?${qs ? qs : ''}`)
}

export async function createHouse(input: House): Promise<House> {
    return await _post<House>(`/houses`, input)
}

export async function updateHouse(id: string, input: House): Promise<House> {
    return await _patch<House>(`/houses/${id}`, input)
}

export async function deleteHouse(id: string): Promise<void> {
    return await _delete(`/houses/${id}`)
}

// 审核模块
export async function getReviewMaterials(qs?: string): Promise<ReviewMaterial[]> {
    return await _get<ReviewMaterial[]>(`/review-materials?${qs ? qs : ''}`)
}

export async function getReviewMaterial(id: string, qs?: string): Promise<ReviewMaterial> {
    return await _get<ReviewMaterial>(`/review-materials/${id}?${qs ? qs : ''}`)
}

export async function createReviewMaterial(input: any): Promise<APIResponse<any>> {
    return await _formData<any>('POST', '/review-materials', input)
}

export async function updateReviewMaterial(id: string, input: ReviewMaterialUpdateInput): Promise<any> {
    return await _patch<any>(`/review-materials/${id}`, input)
}






// 上传文件
async function _formData<T>(method: 'POST' | 'PATCH',
                        path: string,
                        data: FormData): Promise<APIResponse<T>> {
    return await _request(method, path, {
        'Accept': 'application/json'
    }, data)
}

export async function upload(input: FormData): Promise<APIResponse<Image>> {
    return await _formData<Image>('POST', '/pictures', input)
}
