import axios from 'axios'
import { stringify } from 'qsparser-js'


enum Sex {
    male = 'MALE',
    female = 'FEMALE',
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


type Mode = 'default' | 'insensitive'

interface StringContainsQuery {
    _contains: string
    _mode?: Mode
}

interface StringPrefixQuery {
    _prefix: string
    _mode?: Mode
}

interface StringSuffixQuery {
    _suffix: string
    _mode?: Mode
}

interface StringMatchQuery {
    _match: string
    _mode?: Mode
}

interface StringEqQuery {
    _eq: string
}

interface StringNeqQuery {
    _neq: string
}

interface StringNullQuery {
    _null: boolean
}

interface StringCompareQuery {
    _gt?: string
    _gte?: string
    _lt?: string
    _lte?: string
}

interface StringOrQuery {
    _or: StringQuery[]
}

interface StringAndQuery {
    _and: StringQuery[]
}

export type StringQuery = string | StringContainsQuery | StringPrefixQuery | StringSuffixQuery | StringMatchQuery |
                          StringEqQuery | StringNeqQuery | StringNullQuery | StringCompareQuery | StringOrQuery | StringAndQuery


interface NumberValueQuery {
    _gt?: number
    _gte?: number
    _lt?: number
    _lte?: number
}

interface NumberEqQuery {
    _eq: number
}

interface NumberNeqQuery {
    _neq: number
}

interface NumberNullQuery {
    _null: boolean
}

interface NumberOrQuery {
    _or: NumberQuery[]
}

interface NumberAndQuery {
    _and: NumberQuery[]
}

export type NumberQuery = number | NumberEqQuery | NumberNeqQuery | NumberNullQuery | NumberValueQuery | NumberOrQuery | NumberAndQuery


interface BooleanEqQuery {
    _eq: boolean
}

interface BooleanNeqQuery {
    _neq: boolean
}

interface BooleanNullQuery {
    _null: boolean
}

interface BooleanOrQuery {
    _or: BooleanQuery[]
}

interface BooleanAndQuery {
    _and: BooleanQuery[]
}

export type BooleanQuery = boolean | BooleanEqQuery | BooleanNeqQuery | BooleanNullQuery | BooleanOrQuery | BooleanAndQuery


interface DateValueQuery {
    _gt?: Date
    _gte?: Date
    _lt?: Date
    _lte?: Date
    _on?: Date
}

interface DateEqQuery {
    _eq: Date
}

interface DateNeqQuery {
    _neq: Date
}

interface DateNullQuery {
    _null: boolean
}

interface DateOrQuery {
    _or: DateQuery[]
}

interface DateAndQuery {
    _and: DateQuery[]
}

interface DateBeforeQuery {
    _before: Date
}

interface DateAfterQuery {
    _after: Date
}

export type DateQuery = Date | DateValueQuery | DateEqQuery | DateNeqQuery | DateNullQuery | DateOrQuery | DateAndQuery |
                        DateBeforeQuery | DateAfterQuery


interface IDQuery {
    _eq: String
    _neq: String
    _null: boolean
}


interface Link {
    _add: String
}

interface UnLink {
    _del: String
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

type AdminSortOrder = 'username' | '-username' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt'

type AdminResultPick = 'id' | 'username' | 'createdAt' | 'updatedAt'

interface AdminSingleQuery {
    _pick?: AdminResultPick[]
    _omit?: AdminResultPick[]
}

interface AdminListQuery {
    id?: StringQuery
    username?: StringQuery
    createdAt?: DateQuery
    updatedAt?: DateQuery
    _order?: AdminSortOrder | AdminSortOrder[]
    _limit?: number
    _skip?: number
    _pageNo?: number
    _pageSize?: number
    _pick?: AdminResultPick[]
    _omit?: AdminResultPick[]
}

interface AdminSeekQuery {
    id?: StringQuery
    username?: StringQuery
    createdAt?: DateQuery
    updatedAt?: DateQuery
}

interface AdminQueryData {
    _query: AdminSeekQuery
    _data: AdminUpdateInput
}


export interface User {
    id: string
    username?: string
    phoneNumber: string
    sex?: Sex
    houseLevels?: HouseLevel
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
    houseLevels?: HouseLevel | null
    reviewMaterial?: ReviewMaterialUpdateInput | null
}

type UserSortOrder = 'username' | '-username' | 'phoneNumber' | '-phoneNumber' | 'sex' | '-sex' | 'houseLevels' | '-houseLevels' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt'

type UserResultPick = 'id' | 'username' | 'phoneNumber' | 'sex' | 'houseLevels' | 'reviewMaterial' | 'createdAt' | 'updatedAt'

interface UserReview_materialInclude {
    review_material?: ReviewMaterialSingleQuery
}

type UserInclude = UserReview_materialInclude

interface UserSingleQuery {
    _pick?: UserResultPick[]
    _omit?: UserResultPick[]
    _includes?: UserInclude[]
}

interface UserListQuery {
    id?: StringQuery
    username?: StringQuery
    phoneNumber?: StringQuery
    sex?: Sex
    houseLevels?: HouseLevel
    createdAt?: DateQuery
    updatedAt?: DateQuery
    _order?: UserSortOrder | UserSortOrder[]
    _limit?: number
    _skip?: number
    _pageNo?: number
    _pageSize?: number
    _pick?: UserResultPick[]
    _omit?: UserResultPick[]
    _includes?: UserInclude[]
}

interface UserSeekQuery {
    id?: StringQuery
    username?: StringQuery
    phoneNumber?: StringQuery
    sex?: Sex
    houseLevels?: HouseLevel
    createdAt?: DateQuery
    updatedAt?: DateQuery
}

interface UserQueryData {
    _query: UserSeekQuery
    _data: UserUpdateInput
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
    author?: (UserCreateInput | Link)
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
    author?: (UserUpdateInput | Link | UnLink) | null
    author_id?: string | null
    name?: string
    phoneNumber?: string
    idNumber?: string
    degree?: string
    certification?: string
    accountInformation?: string
    status?: Status | null
}

type ReviewMaterialSortOrder = 'name' | '-name' | 'phoneNumber' | '-phoneNumber' | 'idNumber' | '-idNumber' | 'degree' | '-degree' | 'certification' | '-certification' | 'accountInformation' | '-accountInformation' | 'status' | '-status' | 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt'

type ReviewMaterialResultPick = 'id' | 'author' | 'author_id' | 'name' | 'phoneNumber' | 'idNumber' | 'degree' | 'certification' | 'accountInformation' | 'status' | 'createdAt' | 'updatedAt'

interface ReviewMaterialAuthorInclude {
    author?: UserSingleQuery
}

type ReviewMaterialInclude = ReviewMaterialAuthorInclude

interface ReviewMaterialSingleQuery {
    _pick?: ReviewMaterialResultPick[]
    _omit?: ReviewMaterialResultPick[]
    _includes?: ReviewMaterialInclude[]
}

interface ReviewMaterialListQuery {
    id?: StringQuery
    author_id?: IDQuery
    name?: StringQuery
    phoneNumber?: StringQuery
    idNumber?: StringQuery
    degree?: StringQuery
    certification?: StringQuery
    accountInformation?: StringQuery
    status?: Status
    createdAt?: DateQuery
    updatedAt?: DateQuery
    _order?: ReviewMaterialSortOrder | ReviewMaterialSortOrder[]
    _limit?: number
    _skip?: number
    _pageNo?: number
    _pageSize?: number
    _pick?: ReviewMaterialResultPick[]
    _omit?: ReviewMaterialResultPick[]
    _includes?: ReviewMaterialInclude[]
}

interface ReviewMaterialSeekQuery {
    id?: StringQuery
    author_id?: IDQuery
    name?: StringQuery
    phoneNumber?: StringQuery
    idNumber?: StringQuery
    degree?: StringQuery
    certification?: StringQuery
    accountInformation?: StringQuery
    status?: Status
    createdAt?: DateQuery
    updatedAt?: DateQuery
}

interface ReviewMaterialQueryData {
    _query: ReviewMaterialSeekQuery
    _data: ReviewMaterialUpdateInput
}


export interface House {
    id: string
    createdAt: string
    updatedAt: string
}

export interface HouseCreateInput {
}

export interface HouseUpdateInput {
}

type HouseSortOrder = 'createdAt' | '-createdAt' | 'updatedAt' | '-updatedAt'

type HouseResultPick = 'id' | 'createdAt' | 'updatedAt'

interface HouseSingleQuery {
    _pick?: HouseResultPick[]
    _omit?: HouseResultPick[]
}

interface HouseListQuery {
    id?: StringQuery
    createdAt?: DateQuery
    updatedAt?: DateQuery
    _order?: HouseSortOrder | HouseSortOrder[]
    _limit?: number
    _skip?: number
    _pageNo?: number
    _pageSize?: number
    _pick?: HouseResultPick[]
    _omit?: HouseResultPick[]
}

interface HouseSeekQuery {
    id?: StringQuery
    createdAt?: DateQuery
    updatedAt?: DateQuery
}

interface HouseQueryData {
    _query: HouseSeekQuery
    _data: HouseUpdateInput
}


interface AdminSessionInput {
    username: string
    password: string
}


interface UserSessionInput {
    username?: string
    phoneNumber?: string
    password: string
}


export interface AdminSession {
    token: string
    admin: Admin
}

export interface UserSession {
    token: string
    user: User
}


class SessionManager {

    #sessionKey = '_jsonclasses_session'
    #session: AdminSession | UserSession | undefined

    static share = new SessionManager()

    constructor() {
        const item = localStorage.getItem(this.#sessionKey)
        if (item && item !== null && item !== '') {
            this.#session = JSON.parse(item)
        } else {
            this.#session = undefined
        }
    }

    setSession(session: AdminSession | UserSession | undefined | null) {
        if (session) {
            this.#session = session
            localStorage.setItem(this.#sessionKey, JSON.stringify(session))
        } else {
            this.#session = undefined
            localStorage.removeItem(this.#sessionKey)
        }
    }

    hasSession(): boolean {
        return this.#session !== undefined
    }

    getToken(): string | undefined {
        return this.#session?.token
    }

    getSession(): AdminSession | UserSession | undefined {
        return this.#session
    }

    clearSession() {
        this.#session = undefined
        localStorage.removeItem(this.#sessionKey)
    }
}


class RequestManager {

    static share = new RequestManager()

    #baseURL: string = "http://127.0.0.1:8000"


    get headers() {
        const token = SessionManager.share.hasSession() ? SessionManager.share.getToken() :  undefined
        return token ? {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        } : undefined
    }

    qs(val: any): string {
        if (!val) {
            return ''
        }
        if (Object.keys(val).length === 0) {
            return ''
        }
        return '?' + stringify(val)
    }

    async post<T, U, V>(url: string, input: T, query: V | undefined = undefined): Promise<U> {
        const response = await axios.post(this.#baseURL + url + this.qs(query), input, this.headers)
        return response.data.data
    }

    async patch<T, U, V>(url: string, input: T, query: V | undefined = undefined): Promise<U> {
        const response = await axios.patch(this.#baseURL + url + this.qs(query), input, this.headers)
        return response.data.data
    }

    async delete<V>(url: string, query: V | undefined = undefined): Promise<void> {
        await axios.delete(this.#baseURL + url + this.qs(query), this.headers)
        return
    }

    async get<U, V>(url: string, query: V | undefined = undefined): Promise<U> {
        const response = await axios.get(this.#baseURL + url + this.qs(query), this.headers)
        return response.data.data
    }
}


class AdminUpdateRequest<T extends Partial<Admin>> extends Promise<T> {

    #id: string
    #input: AdminUpdateInput
    #query?: AdminSingleQuery

    constructor(id:string, input: AdminUpdateInput, query?: AdminSingleQuery,) {
        super(() => {})
        this.#id = id
        this.#input = input
        this.#query = query
    }

    pick(picks: AdminResultPick[]): AdminUpdateRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: AdminResultPick[]): AdminUpdateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<Admin> {
        return await RequestManager.share.patch(`/admins/${this.#id}`, this.#input, this.#query)
    }
}

class AdminUpdateManyRequest<T extends Partial<Admin>> extends Promise<T> {

    #input: AdminQueryData
    #query?: AdminSingleQuery

    constructor(input: AdminQueryData, query?:AdminSingleQuery) {
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: AdminResultPick[]): AdminUpdateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: AdminResultPick[]): AdminUpdateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<Admin> {
        return await RequestManager.share.patch('/admins', { '_update': this.#input })
    }
}


class AdminSignInRequest<T extends Partial<AdminSession>> extends Promise<T> {

    #input: AdminSessionInput
    #query?: AdminSingleQuery

    constructor(input: AdminSessionInput, query?:AdminSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: AdminResultPick[]): AdminSignInRequest<T> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: AdminResultPick[]): AdminSignInRequest<T> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<AdminSession> {
        const session = await RequestManager.share.post('/admins/session', this.#input, this.#query) as AdminSession
        SessionManager.share.setSession(session)
        return session
    }
}

class AdminClient {

    update(id: string, input: AdminUpdateInput, query?: AdminSingleQuery): AdminUpdateRequest<Admin> {
        return new AdminUpdateRequest(id, input, query)
    }

    updateMany(input: AdminQueryData): AdminUpdateManyRequest<Admin> {
        return new AdminUpdateManyRequest(input)
    }

    signIn(input: AdminSessionInput, query?: AdminSingleQuery): AdminSignInRequest<AdminSession>{
       return new AdminSignInRequest(input, query)
    }

}


class UserCreateRequest<T extends Partial<User>> extends Promise<T> {

    #input: UserCreateInput
    #query?: UserSingleQuery

    constructor(input: UserCreateInput, query?:UserSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: UserResultPick[]): UserCreateRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserCreateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserCreateRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<T> {
        return await RequestManager.share.post('/users', this.#input, this.#query)
    }
}

class UserUpdateRequest<T extends Partial<User>> extends Promise<T> {

    #id: string
    #input: UserUpdateInput
    #query?: UserSingleQuery

    constructor(id:string, input: UserUpdateInput, query?: UserSingleQuery,) {
        super(() => {})
        this.#id = id
        this.#input = input
        this.#query = query
    }

    pick(picks: UserResultPick[]): UserUpdateRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserUpdateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserUpdateRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<User> {
        return await RequestManager.share.patch(`/users/${this.#id}`, this.#input, this.#query)
    }
}

class UserDeleteRequest extends Promise<void> {

    #id: string

    constructor(id: string) {
        super(() => {})
        this.#id = id
    }
    async exec(): Promise<void> {
        return await RequestManager.share.delete(`/users/${this.#id}`)
    }
}

class UserIDRequest<T extends Partial<User>> extends Promise<T> {

    #id: string
    #query?: UserSingleQuery

    constructor(id: string, query?: UserSingleQuery) {
        super(() => {})
        this.#id = id,
        this.#query = query
    }

    pick(picks: UserResultPick[]): UserIDRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserIDRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserIDRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<User> {
        return await RequestManager.share.get(`/users/${this.#id}`, this.#query)
    }
}

class UserUpsertRequest<T extends Partial<User>> extends Promise<T> {

    #input: UserQueryData

    constructor(input: UserQueryData){
        super(() => {})
        this.#input = input
    }

    async exec(): Promise<T> {
        return await RequestManager.share.post('/users', { '_upsert': this.#input })
    }
}


class UserCreateManyRequest<T extends Partial<User>> extends Promise<T> {

    #input: UserCreateInput[]
    #query?: UserSingleQuery

     constructor(input: UserCreateInput[], query?:UserSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: UserResultPick[]): UserCreateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserCreateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserCreateManyRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<T[]> {
        return await RequestManager.share.post('/users', { '_create': this.#input })
    }
}


class UserUpdateManyRequest<T extends Partial<User>> extends Promise<T> {

    #input: UserQueryData
    #query?: UserSingleQuery

    constructor(input: UserQueryData, query?:UserSingleQuery) {
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: UserResultPick[]): UserUpdateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserUpdateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserUpdateManyRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<User> {
        return await RequestManager.share.patch('/users', { '_update': this.#input })
    }
}


class UserDeleteManyRequest extends Promise<void> {

    #query?: UserSeekQuery

    constructor(query?: UserSeekQuery) {
        super(() => {})
        this.#query = query
    }

    async exec(): Promise<void> {
        return await RequestManager.share.delete('/users', this.#query)
    }
}


class UserListRequest<T extends Partial<User>> extends Promise<T[]> {

    #query?: UserListQuery

    constructor(query?: UserListQuery) {
        super(() => {})
        this.#query = query
    }

    order(order: UserSortOrder | UserSortOrder[]): UserListRequest<T> {
        this.#query = {...this.#query, _order: order}
        return this
    }

    skip(skip: number): UserListRequest<T> {
        this.#query = {...this.#query, _skip: skip}
        return this
    }

    limt(limit: number): UserListRequest<T> {
        this.#query = {...this.#query, _limit:limit}
        return this
    }

    pageSize(pageSize: number): UserListRequest<T> {
        this.#query = {...this.#query, _pageSize: pageSize}
        return this
    }

    pageNo(pageNo: number): UserListRequest<T> {
        this.#query = {...this.#query, _pageNo: pageNo}
        return this
    }

    pick(picks: UserResultPick[]): UserListRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserListRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserListRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<User[]> {
        return await RequestManager.share.get('/users',this.#query)
    }
}

class UserSignInRequest<T extends Partial<UserSession>> extends Promise<T> {

    #input: UserSessionInput
    #query?: UserSingleQuery

    constructor(input: UserSessionInput, query?:UserSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: UserResultPick[]): UserSignInRequest<T> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: UserResultPick[]): UserSignInRequest<T> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: UserInclude[]): UserSignInRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<UserSession> {
        const session = await RequestManager.share.post('/users/session', this.#input, this.#query) as UserSession
        SessionManager.share.setSession(session)
        return session
    }
}

class UserClient {

    create(input: UserCreateInput, query?: UserSingleQuery): UserCreateRequest<User> {
        return new UserCreateRequest(input, query)
    }

    createMany(input: UserCreateInput[]): UserCreateManyRequest<User> {
        return new UserCreateManyRequest(input)
    }

    id(id: string, query?: UserSingleQuery) {
        return new UserIDRequest(id, query)
    }

    update(id: string, input: UserUpdateInput, query?: UserSingleQuery): UserUpdateRequest<User> {
        return new UserUpdateRequest(id, input, query)
    }

    updateMany(input: UserQueryData): UserUpdateManyRequest<User> {
        return new UserUpdateManyRequest(input)
    }

    upsert(input: UserQueryData): UserUpsertRequest<User> {
        return new UserUpsertRequest(input)
    }

    find(query?: UserListQuery): UserListRequest<User> {
        return new UserListRequest(query)
    }

    delete(id: string): UserDeleteRequest {
        return new UserDeleteRequest(id)
    }

    deleteMany(query?: UserSeekQuery): UserDeleteManyRequest {
        return new UserDeleteManyRequest(query)
    }

    signIn(input: UserSessionInput, query?: UserSingleQuery): UserSignInRequest<UserSession>{
       return new UserSignInRequest(input, query)
    }

}


class ReviewMaterialCreateRequest<T extends Partial<ReviewMaterial>> extends Promise<T> {

    #input: FormData
    #query?: ReviewMaterialSingleQuery

    constructor(input: FormData, query?:ReviewMaterialSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: ReviewMaterialResultPick[]): ReviewMaterialCreateRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: ReviewMaterialResultPick[]): ReviewMaterialCreateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: ReviewMaterialInclude[]): ReviewMaterialCreateRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<T> {
        return await RequestManager.share.post('/review-materials', this.#input, this.#query)
    }
}

class ReviewMaterialUpdateRequest<T extends Partial<ReviewMaterial>> extends Promise<T> {

    #id: string
    #input: ReviewMaterialUpdateInput
    #query?: ReviewMaterialSingleQuery

    constructor(id:string, input: ReviewMaterialUpdateInput, query?: ReviewMaterialSingleQuery,) {
        super(() => {})
        this.#id = id
        this.#input = input
        this.#query = query
    }

    omit(omits: ReviewMaterialResultPick[]): ReviewMaterialUpdateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: ReviewMaterialInclude[]): ReviewMaterialUpdateRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<ReviewMaterial> {
        return await RequestManager.share.patch(`/review-materials/${this.#id}`, this.#input, this.#query)
    }
}

class ReviewMaterialDeleteRequest extends Promise<void> {

    #id: string

    constructor(id: string) {
        super(() => {})
        this.#id = id
    }
    async exec(): Promise<void> {
        return await RequestManager.share.delete(`/review-materials/${this.#id}`)
    }
}

class ReviewMaterialIDRequest<T extends Partial<ReviewMaterial>> extends Promise<T> {

    #id: string
    #query?: ReviewMaterialSingleQuery

    constructor(id: string, query?: ReviewMaterialSingleQuery) {
        super(() => {})
        this.#id = id,
        this.#query = query
    }

    pick(picks: ReviewMaterialResultPick[]): ReviewMaterialIDRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: ReviewMaterialResultPick[]): ReviewMaterialIDRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: ReviewMaterialInclude[]): ReviewMaterialIDRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<ReviewMaterial> {
        return await RequestManager.share.get(`/review-materials/${this.#id}`, this.#query)
    }
}

class ReviewMaterialUpsertRequest<T extends Partial<ReviewMaterial>> extends Promise<T> {

    #input: ReviewMaterialQueryData

    constructor(input: ReviewMaterialQueryData){
        super(() => {})
        this.#input = input
    }

    async exec(): Promise<T> {
        return await RequestManager.share.post('/review-materials', { '_upsert': this.#input })
    }
}


class ReviewMaterialCreateManyRequest<T extends Partial<ReviewMaterial>> extends Promise<T> {

    #input: ReviewMaterialCreateInput[]
    #query?: ReviewMaterialSingleQuery

     constructor(input: ReviewMaterialCreateInput[], query?:ReviewMaterialSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: ReviewMaterialResultPick[]): ReviewMaterialCreateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: ReviewMaterialResultPick[]): ReviewMaterialCreateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: ReviewMaterialInclude[]): ReviewMaterialCreateManyRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<T[]> {
        return await RequestManager.share.post('/review-materials', { '_create': this.#input })
    }
}


class ReviewMaterialUpdateManyRequest<T extends Partial<ReviewMaterial>> extends Promise<T> {

    #input: ReviewMaterialQueryData
    #query?: ReviewMaterialSingleQuery

    constructor(input: ReviewMaterialQueryData, query?:ReviewMaterialSingleQuery) {
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: ReviewMaterialResultPick[]): ReviewMaterialUpdateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: ReviewMaterialResultPick[]): ReviewMaterialUpdateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: ReviewMaterialInclude[]): ReviewMaterialUpdateManyRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<ReviewMaterial> {
        return await RequestManager.share.patch('/review-materials', { '_update': this.#input })
    }
}


class ReviewMaterialDeleteManyRequest extends Promise<void> {

    #query?: ReviewMaterialSeekQuery

    constructor(query?: ReviewMaterialSeekQuery) {
        super(() => {})
        this.#query = query
    }

    async exec(): Promise<void> {
        return await RequestManager.share.delete('/review-materials', this.#query)
    }
}


class ReviewMaterialListRequest<T extends Partial<ReviewMaterial>> extends Promise<T[]> {

    #query?: ReviewMaterialListQuery

    constructor(query?: ReviewMaterialListQuery) {
        super(() => {})
        this.#query = query
    }

    order(order: ReviewMaterialSortOrder | ReviewMaterialSortOrder[]): ReviewMaterialListRequest<T> {
        this.#query = {...this.#query, _order: order}
        return this
    }

    skip(skip: number): ReviewMaterialListRequest<T> {
        this.#query = {...this.#query, _skip: skip}
        return this
    }

    limt(limit: number): ReviewMaterialListRequest<T> {
        this.#query = {...this.#query, _limit:limit}
        return this
    }

    pageSize(pageSize: number): ReviewMaterialListRequest<T> {
        this.#query = {...this.#query, _pageSize: pageSize}
        return this
    }

    pageNo(pageNo: number): ReviewMaterialListRequest<T> {
        this.#query = {...this.#query, _pageNo: pageNo}
        return this
    }

    pick(picks: ReviewMaterialResultPick[]): ReviewMaterialListRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: ReviewMaterialResultPick[]): ReviewMaterialListRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }

    include(includes: ReviewMaterialInclude[]): ReviewMaterialListRequest<T> {
        this.#query = {...this.#query, _includes: includes }
        return this
    }

    async exec(): Promise<ReviewMaterial[]> {
        return await RequestManager.share.get('/review-materials',this.#query)
    }
}

class ReviewMaterialClient {

    create(input: FormData, query?: ReviewMaterialSingleQuery): ReviewMaterialCreateRequest<ReviewMaterial> {
        return new ReviewMaterialCreateRequest(input, query)
    }


    id(id: string, query?: ReviewMaterialSingleQuery) {
        return new ReviewMaterialIDRequest(id, query)
    }

    update(id: string, input: ReviewMaterialUpdateInput, query?: ReviewMaterialSingleQuery): ReviewMaterialUpdateRequest<ReviewMaterial> {
        return new ReviewMaterialUpdateRequest(id, input, query)
    }


    find(query?: ReviewMaterialListQuery): ReviewMaterialListRequest<ReviewMaterial> {
        return new ReviewMaterialListRequest(query)
    }

    delete(id: string): ReviewMaterialDeleteRequest {
        return new ReviewMaterialDeleteRequest(id)
    }

    deleteMany(query?: ReviewMaterialSeekQuery): ReviewMaterialDeleteManyRequest {
        return new ReviewMaterialDeleteManyRequest(query)
    }

}


class HouseCreateRequest<T extends Partial<House>> extends Promise<T> {

    #input: HouseCreateInput
    #query?: HouseSingleQuery

    constructor(input: HouseCreateInput, query?:HouseSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: HouseResultPick[]): HouseCreateRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: HouseResultPick[]): HouseCreateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<T> {
        return await RequestManager.share.post('/houses', this.#input, this.#query)
    }
}

class HouseUpdateRequest<T extends Partial<House>> extends Promise<T> {

    #id: string
    #input: HouseUpdateInput
    #query?: HouseSingleQuery

    constructor(id:string, input: HouseUpdateInput, query?: HouseSingleQuery,) {
        super(() => {})
        this.#id = id
        this.#input = input
        this.#query = query
    }

    pick(picks: HouseResultPick[]): HouseUpdateRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: HouseResultPick[]): HouseUpdateRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<House> {
        return await RequestManager.share.patch(`/houses/${this.#id}`, this.#input, this.#query)
    }
}

class HouseDeleteRequest extends Promise<void> {

    #id: string

    constructor(id: string) {
        super(() => {})
        this.#id = id
    }
    async exec(): Promise<void> {
        return await RequestManager.share.delete(`/houses/${this.#id}`)
    }
}

class HouseIDRequest<T extends Partial<House>> extends Promise<T> {

    #id: string
    #query?: HouseSingleQuery

    constructor(id: string, query?: HouseSingleQuery) {
        super(() => {})
        this.#id = id,
        this.#query = query
    }

    pick(picks: HouseResultPick[]): HouseIDRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: HouseResultPick[]): HouseIDRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<House> {
        return await RequestManager.share.get(`/houses/${this.#id}`, this.#query)
    }
}

class HouseUpsertRequest<T extends Partial<House>> extends Promise<T> {

    #input: HouseQueryData

    constructor(input: HouseQueryData){
        super(() => {})
        this.#input = input
    }

    async exec(): Promise<T> {
        return await RequestManager.share.post('/houses', { '_upsert': this.#input })
    }
}


class HouseCreateManyRequest<T extends Partial<House>> extends Promise<T> {

    #input: HouseCreateInput[]
    #query?: HouseSingleQuery

     constructor(input: HouseCreateInput[], query?:HouseSingleQuery){
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: HouseResultPick[]): HouseCreateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: HouseResultPick[]): HouseCreateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<T[]> {
        return await RequestManager.share.post('/houses', { '_create': this.#input })
    }
}


class HouseUpdateManyRequest<T extends Partial<House>> extends Promise<T> {

    #input: HouseQueryData
    #query?: HouseSingleQuery

    constructor(input: HouseQueryData, query?:HouseSingleQuery) {
        super(() => {})
        this.#input = input
        this.#query = query
    }

    pick(picks: HouseResultPick[]): HouseUpdateManyRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: HouseResultPick[]): HouseUpdateManyRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<House> {
        return await RequestManager.share.patch('/houses', { '_update': this.#input })
    }
}


class HouseDeleteManyRequest extends Promise<void> {

    #query?: HouseSeekQuery

    constructor(query?: HouseSeekQuery) {
        super(() => {})
        this.#query = query
    }

    async exec(): Promise<void> {
        return await RequestManager.share.delete('/houses', this.#query)
    }
}


class HouseListRequest<T extends Partial<House>> extends Promise<T[]> {

    #query?: HouseListQuery

    constructor(query?: HouseListQuery) {
        super(() => {})
        this.#query = query
    }

    order(order: HouseSortOrder | HouseSortOrder[]): HouseListRequest<T> {
        this.#query = {...this.#query, _order: order}
        return this
    }

    skip(skip: number): HouseListRequest<T> {
        this.#query = {...this.#query, _skip: skip}
        return this
    }

    limt(limit: number): HouseListRequest<T> {
        this.#query = {...this.#query, _limit:limit}
        return this
    }

    pageSize(pageSize: number): HouseListRequest<T> {
        this.#query = {...this.#query, _pageSize: pageSize}
        return this
    }

    pageNo(pageNo: number): HouseListRequest<T> {
        this.#query = {...this.#query, _pageNo: pageNo}
        return this
    }

    pick(picks: HouseResultPick[]): HouseListRequest<Pick<T, typeof picks[number]>> {
        this.#query = {...this.#query, _pick: picks}
        return this
    }

    omit(omits: HouseResultPick[]): HouseListRequest<Omit<T, typeof omits[number]>> {
        this.#query = {...this.#query, _omit: omits}
        return this
    }


    async exec(): Promise<House[]> {
        return await RequestManager.share.get('/houses',this.#query)
    }
}

class HouseClient {

    create(input: HouseCreateInput, query?: HouseSingleQuery): HouseCreateRequest<House> {
        return new HouseCreateRequest(input, query)
    }

    createMany(input: HouseCreateInput[]): HouseCreateManyRequest<House> {
        return new HouseCreateManyRequest(input)
    }

    id(id: string, query?: HouseSingleQuery) {
        return new HouseIDRequest(id, query)
    }

    update(id: string, input: HouseUpdateInput, query?: HouseSingleQuery): HouseUpdateRequest<House> {
        return new HouseUpdateRequest(id, input, query)
    }

    updateMany(input: HouseQueryData): HouseUpdateManyRequest<House> {
        return new HouseUpdateManyRequest(input)
    }

    upsert(input: HouseQueryData): HouseUpsertRequest<House> {
        return new HouseUpsertRequest(input)
    }

    find(query?: HouseListQuery): HouseListRequest<House> {
        return new HouseListRequest(query)
    }

    delete(id: string): HouseDeleteRequest {
        return new HouseDeleteRequest(id)
    }

    deleteMany(query?: HouseSeekQuery): HouseDeleteManyRequest {
        return new HouseDeleteManyRequest(query)
    }

}


class API {

    get admins(): AdminClient {
        return new AdminClient()
    }

    get users(): UserClient {
        return new UserClient()
    }

    get reviewMaterials(): ReviewMaterialClient {
        return new ReviewMaterialClient()
    }

    get houses(): HouseClient {
        return new HouseClient()
    }

    get session(): SessionManager {
       return SessionManager.share
    }

    signOut(): void {
       SessionManager.share.clearSession()
    }

}


export const api = new API()
