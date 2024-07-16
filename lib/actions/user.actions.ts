'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"
import { userAgent } from "next/server"

export const signIn = async({email, password}: signInProps)=>{
    try {
        //mutation/ modify database/ fetch values
        const { account } = await createAdminClient();
        //set session of existing user
        const response = await account.createEmailPasswordSession(email, password)
        return parseStringify(response)

        
    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async(userData: SignUpParams)=>{
    //destructure those below values
    const {email, password, firstName, lastName} = userData
   
    try {
        //mutation/ modify database/ fetch values
        //use APPWRITE to create a user account
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(),
         email, 
         password, 
        `${firstName} ${lastName}` 
        );
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
  });

    return parseStringify(newUserAccount)

    } catch (error) {
        console.error('Error', error)
    }
}

//if user is loggedin then 

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      //change below code ebecause it return null
      const user =  await account.get();
      return parseStringify(user)
    } catch (error) {
      return null;
    }
  }
  
//now logOut  the session
export const logOutAccount = async()=>{
    try {
        //destructure the existing account
        const { account}  = await createSessionClient();
        cookies().delete('appwrite-session');

        await account.deleteSession('current');

    } catch (error) {
        return null
        
    }
}