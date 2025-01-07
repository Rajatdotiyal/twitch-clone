import { db } from "./db";

export async function getStreamBuUserId(userId:string){
    const stream = await db.stream.findUnique({
        where :{userId}
    })
    return stream;
}