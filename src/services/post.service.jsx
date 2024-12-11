import axiosClient from "../lib/axios"

export const  getAllPosts = ()=>{
  
    return  axiosClient 
    .get("/posts")
   
}


export const  deletePost = ()=>{

}


