import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb"
import {NextApiRequest, NextApiResponse} from "next"

export default async function handler(req:NextApiRequest, res:NextApiResponse){
   if(req.method!= 'POST' && req.method!='GET'){
        return res.status(405).end();
   }

   try{
        if(req.method=='POST'){
            const{currentUser}= await serverAuth(req,res);
            const {body} = req.body;

            const post= await prisma.post.create({
                data:{
                    body,
                    userID:currentUser.id
                }
            });

            return res.status(200).json(post);
        }
        if(req.method=='GET'){
            const {userID} = req.query;
            let posts;
            if(userID && typeof userID=='string'){
                posts=await prisma.post.findMany({
                    where:{
                        userID
                    },
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                });
            }

            else{
                posts=await prisma.post.findMany({
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                       createdAt:'desc' 
                    }
                });
            }

            return res.status(200).json(posts);
        }

   }catch(error){
    console.log(error);
    return res.status(400).end();
   }
}