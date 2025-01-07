"use server"


import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"

import { getSelf } from "@/lib/auth-service"


export async function updateStream(vlaues : Partial<Stream>){

    try{
        const self = await getSelf();
        const selfStream = await db.stream.findUnique({
            where :{
                userId : self.id
            }
        });
        if(!selfStream){
            throw new Error("Stream not found")
        }

        const validData = {
            thumbnailUrl : vlaues.thumbnailUrl,
            name:vlaues.name,
            isChatEnabled : vlaues.isChatEnabled,
            isChatFollowersOnly : vlaues.isChatFollowersOnly,
            isChatDelayed : vlaues.isChatDelayed
        }   

        const stream  = await db.stream.update({
            where :{
                id: selfStream.id
            },
            data : {
                ...validData,
            }
        });
        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`${self.username}`)

        return stream;
    }catch{
        throw new Error("Internal Error")
    }

}