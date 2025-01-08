import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

interface CreatorPageProps{
    params : Promise< {
        username : string;
    }>
}


export default async function CreatorPage({params} : CreatorPageProps){

    const {username} = await params;

const externalUser = await currentUser();
const user = await getUserByUsername(username)

if(!user || user.externalUserId!== externalUser?.id || !user.stream){
    throw new Error("Unauthorised")
}

    return<>
    <div className="h-full ">
        <StreamPlayer user = {user} stream={user.stream} isFollowing/>
    </div>
    </>
}