export interface UserLoginInfo{
    email: string
    password: string
}

export interface UserInfo{
    id: number
    name: string
    surname: string
    email: string
    roles: Role[]
}

export interface UserInfoWithPassword{
    id: number
    name: string
    surname: string
    email: string
    password: string
    roles: Role[]
}

export interface LoginResponse {
    jwt: string
}
  
export interface Role{
    id: number
    name: string
}

export interface MachineInfo {
    id: number
    name: string
    status: string
    createdBy: UserInfo
    active: boolean
    creationDate: Date
}

export interface MachinePostInfo {
    name: string
    userEmail: string
}

export interface MachineScheduleInfo {
    id: number
    operation: string
    date: string
    time: string
}

export interface ErrorMessageInfo {
    id: number
    message: string
    operation: string
    creationDate: Date
    machine: MachineInfo
}

export interface MachineSearchFilters {
    name: string
    status: string
    dateFrom: string
    dateTo: string
}