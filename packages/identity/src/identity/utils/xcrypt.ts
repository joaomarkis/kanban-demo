import { compare, hash } from "bcryptjs"

export const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

export const checkPassword = async (plainPassword: string, hashedPassword: string) => {
    try {
        const check = await compare(plainPassword, hashedPassword)
        return check
    }
    catch(error){
        console.log("Password hash is invalid")
        return false
    }
    
}