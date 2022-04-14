export interface APIError {
    type: string
    message: string
    fields?: {[name: string]: string}
}

export interface APIResponse<T> {
    data?: T
    error?: APIError
}

export enum HouseLevel {
    one = 'ONE',
    two = 'TWO',
    three = 'THREE',
}


export enum Status {
    pengding = 'PENGDING',
    processing = 'Processing',
    finished = 'FINISHED',
}

export enum Sex {
    male = 'MALE',
    female = 'FEMALE',
}

export interface Admin {
    id: string
    username: string
    createdAt: string
    updatedAt: string
}

export interface AdminCreateInput {
    username: string
    password: string
}

export interface AdminUpdateInput {
    username?: string
    password?: string
}

export interface User {
    id: string
    username?: string
    phoneNumber: string
    sex?: Sex
    houseLevel?: HouseLevel
    reviewMaterial?: ReviewMaterial
    createdAt: string
    updatedAt: string
}

export interface UserCreateInput {
    username?: string
    phoneNumber: string
    password: string
    sex?: Sex
    houseLevels?: HouseLevel
    reviewMaterial?: ReviewMaterialCreateInput
}

export interface UserUpdateInput {
    username?: string | null
    phoneNumber?: string
    password?: string
    sex?: Sex | null
    houseLevel?: HouseLevel | null
    reviewMaterial?: ReviewMaterialUpdateInput | null
}

export interface ReviewMaterial {
    id: string
    author?: User
    authorId?: string
    name: string
    phoneNumber: string
    idNumber: string
    degree: string
    certification: string
    accountInformation: string
    status?: Status
    createdAt: string
    updatedAt: string
}

export interface ReviewMaterialCreateInput {
    author?: UserCreateInput
    author_id?: string
    name: string
    phoneNumber: string
    idNumber: string
    degree: string
    certification: string
    accountInformation: string
    status?: Status
}

export interface ReviewMaterialUpdateInput {
    author?: UserUpdateInput
    author_id?: string | null
    name?: string
    phoneNumber?: string
    idNumber?: string
    degree?: string
    certification?: string
    accountInformation?: string
    status?: Status | null
}

export interface AdminSessionInput {
    username: string
    password: string
}


export interface UserSessionInput {
    username?: string
    phoneNumber?: string
    password: string
}


export interface Session {
    token: string
    admin?: Admin
    user?: User
}
