import { ErrorBase } from "@kanban/shared/utils"
type PersistenceErrorName = 'USER_NOT_FOUND'
export default class PersistenceError extends ErrorBase<PersistenceErrorName> { }

