import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";


export async function getFollowedUser(){
try{
    const self = await getSelf();

    const followedUser = db.follow.findMany({
        where :{
            followerId : self.id,
            following:{
                blocking:{
                    none:{
                        blockedId : self.id,
                    }
                }
            }
        },
        include : {
            following : {
                include :{
                    stream : {
                        select :{
                            isLive : true,
                        }
                    },
                }
            },
        }
    })
    return followedUser;
}catch{
    return[]
}
}


export async function isFollowingUser(id:string){
try{
const self = await getSelf();
const otherUser = await db.user.findUnique({
    where : {id}
})

if(!otherUser){
    throw new Error("User not found")
}

if(otherUser.id === self.id){
    return true;
}
const existingFollow = await db.follow.findFirst({
    where :{
        followerId : self.id,
        followingId : otherUser.id,
    },
})

return !!existingFollow
}catch{
    return false;
}
}


export async  function followUser(id:string){
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where:{id}
    })

    if(!otherUser){
        throw new Error("user not found")
    }

    if(otherUser.id === self.id){
        throw new Error("Cannot follow Yourself")
    }

    const existingFollow  = await db.follow.findFirst({
        where:{
            followerId : self.id,
            followingId : otherUser.id,
        }
    })

    if(existingFollow){
        throw new Error("Already following")
    }

    const follow = await db.follow.create({
        data : {
            followerId : self.id,
            followingId : otherUser.id,
        },
        include:{
            following : true,
            follower : true,
        },
    });
    return follow;
}


export async function unfollowUser(id:string){
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where:{id}
    })

    if(!otherUser){
        throw new Error("user not found")
    }

    if(otherUser.id === self.id){
        throw new Error("Cannot unfollow Yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where :{
            followerId : self.id,
            followingId : otherUser.id,
        },
    })

    if(!existingFollow){
        throw new Error("Not Following")
    }

    const follow = await db.follow.delete({
        where :{
            id: existingFollow.id
        },
        include:{
            following : true
        }
    })
    return follow;
}

