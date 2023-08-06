import bcrypt from 'bcrypt'

export interface User{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    password :string
}

export async function hashPassword(password:string):Promise<string>{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds)
    return hashedPassword;
}

export async function isPasswordvalid(enteredPassword : string, storedPassword :string):Promise<boolean>{
    // console.log(enteredPassword,storedPassword);
    
    return await bcrypt.compare(enteredPassword,storedPassword);
}