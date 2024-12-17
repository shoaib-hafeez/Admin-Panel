import axiosClient from "../lib/axios"

export const getAllPostsApi = () => {

    return axiosClient
        .get("/social-media/posts")

}

// export const createPostApi =()=>{

//     return axiosClient
//        .post("/social-media/posts")


// }

export const deletePostApi = () => {

    return axiosClient
        .delete('/social-media/posts/')

}


// export const updatePostApi = () => {

//     return

// }


