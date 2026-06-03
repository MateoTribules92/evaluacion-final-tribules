import { useEffect, useState } from "react"
import { Post } from "../types/api";
import { getPosts, getPostById } from '../services/apiService';

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        const fetchPosts = async()=>{
            try{
                const data = await getPosts();
                //Almacenar datos
                setPosts(data);
            }
            catch(error){
                setError('Error al cargar los datos. Intente mas tarde.')
                console.log(error);

            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return {posts, loading, error };
};

export const usePostDetail = (id: number) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

   useEffect(()=>{
        const fetchPost = async()=>{
            try{
                const data = await getPostById(id);
                setPost(data);
            }
            catch(error){
                setError('Error al cargar el detalle.')
                console.log(error);

            }finally{
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);
     
    return {post, loading, error };
};