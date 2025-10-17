import { ErrorBase } from "@kanban/shared/utils"

type IdentityErrorName = 'USER_NOT_FOUND' | 'USER_ALREADY_EXISTS' | 'INVALID_CREDENTIAL' | 'AUTH_FAILED'
export default class IdentityErrors extends ErrorBase<IdentityErrorName>{};