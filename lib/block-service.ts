import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export async function isBlockedByUser(id: string) {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
}

export async function blockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot block user");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not Found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already Blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
}

export async function unBlockUser(id: string) {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("Cannot unblock user");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not Found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("Not blocked");
  }

  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
}


export async function getBlockedUser(){

  const self = await getSelf();
  const blockedUsers = await db.block.findMany({
    where :{
      blockedId : self.id,
    },
    include :{
      blocked : true
    }
  }) 
  return blockedUsers
}