import { useEffect, useState } from "react";


export const useFetch = ( url ) => {
  
    const [state, setState] = useState({
        data: null,
        isLoading: true, // porque estara cargando hasta obtener la respuesta 
        hasError: null,
    })

    const getFetch = async() => {

        setState({
            ...state,
            isLoading: true,
        });

        const resp = await fetch(url);
        const data = await resp.json();
        
        // console.log(data);
        setState({
            data, //data: data,
            isLoading: false,
            hasError: null,
        });
    }


    useEffect(() => {
        getFetch();
    }, [url])
    
  
  
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    };
}
