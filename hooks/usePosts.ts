import useSWR from 'swr';
import fetcher from '@/libs/fetcher';
const usePosts= (userID?:string)=>{

    const url= userID ?`/api/posts?userID=${userID}`: '/api/posts';
    const {data,error, isLoading, mutate} = useSWR(url,fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePosts;