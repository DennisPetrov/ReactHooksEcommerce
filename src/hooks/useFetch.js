import {useState, useEffect, useCallback} from 'react'
import Axios from 'axios';


export default url => {
    const baseUrl = "http://cw68008.tmweb.ru/api";
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({});

    const doFetch = useCallback((options = {}) => {
        setOptions(options);
        setIsLoading(true);
    }, [])
    useEffect(() => {
        let skipGetResponseAfterDestroy = false
        const requestOptions = {
            ...options
        }
        if (isLoading) {
            Axios(baseUrl + url, requestOptions).then(res =>{
                if(!skipGetResponseAfterDestroy){
                    setIsLoading(false);
                    setResponse(res.data);
                }
            }).catch(error =>{
                console.log(error.message);
                if(!skipGetResponseAfterDestroy){
                    setIsLoading(false);
                    setError(error.message)
                }
            })
        }else{
            return;
        }
        return () => {
            skipGetResponseAfterDestroy = true
        }
    }, [isLoading, options, url])
    return [{
        isLoading, response, error
    }, doFetch];
}