import {createContext, useContext, useEffect, useRef, useState} from "react";
import qualityService from "../services/qualityService";
import {toast} from "react-toastify";

const QualitiesContext = createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
}

export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const prevState = useRef();

    useEffect(() => {
        const getQualities = async () => {
            try {
                const {content} = await qualityService.fetchAll()
                setQualities(content);
                setIsLoading(false);
            } catch (e) {
                errorCatcher(e)
            }
        }
        getQualities();
    }, []);


    const getQuality = (id) => {
        return qualities.find((q) => q._id === id)
    }

    const updateQuality = async ({_id: id, ...data}) => {
        try {
            const {content} = await qualityService.update(id, data);
            setQualities((prevState) => prevState.map((item) => {
                if (item._id === content._id) {
                    return content
                } else {
                    return item;
                }
            }))
        } catch (e) {
            errorCatcher(e)
        }
    }

    const addQuality = async (data) => {
        try {
            const {content} = await qualityService.create(data);
            setQualities((prevState) => [...prevState, content]);
            return content;
        } catch (e) {
            errorCatcher(e)
        }
    }

    const deleteQuality = async (id) => {
        // Optimistic way
        // prevState.current = qualities;
        // setQualities((prevState) => {
        //     return prevState.filter((item) => item._id !== id);
        // })
        // try {
        //     await qualityService.delete(id)
        // } catch (e) {
        //     const {message} = e.response.data;
        //     toast.error('Object is not deleted')
        //     setErrors(message);
        //     setQualities(prevState.current);
        // }

        // pessimistic way
        try {
            const {content} = await qualityService.delete(id);
            setQualities((prevState) => {
                return prevState.filter((item) => item._id !== content._id);
            })
        }catch (e) {
            errorCatcher(e)
        }

        // beginner's way
        // try {
        //     await qualityService.delete(id);
        //     setQualities((prevState) => prevState.filter(item => (
        //      (item._id !== id))))
        // } catch (error) {
        //     console.log(error)
        // }
    }

    function errorCatcher(e) {
        const {message} = e.response.data;
        setErrors(message);
    }

    useEffect(() => {
       if(errors !== null) {
           toast(errors);
           setErrors(null);
       }
    },[errors]);

    return <QualitiesContext.Provider
        value={{qualities, setQualities, getQuality, updateQuality, addQuality, deleteQuality}}>
        {!isLoading ? children : <h1>Qualities Loading...</h1>}
    </QualitiesContext.Provider>;
}
