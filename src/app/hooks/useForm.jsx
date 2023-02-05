import {useState} from "react";
export const useForm = (initialState={}, onSubmit) => {
    const [form, setForm] = useState(initialState);
    const handeleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(form)
    };

    const handleChange = (target) => {
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    return {form, handeleSubmit, handleChange}
}
