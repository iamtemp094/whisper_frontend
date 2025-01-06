import axios from 'axios';

export const login = async (email, password) => {
    try {
        const { data } = await axios.post("http://127.0.0.1:8000/auth/login/", {
            username: email,
            password: password,
        });

        return data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

export const signup = async (email, name, password) => {
    try {
        const { data } = await axios.post("http://127.0.0.1:8000/auth/signup/", {
            email: email,
            username: name,
            password: password,
        });
        return data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};
export const logout = async ()=>{
    try{
        const {data} = axios.post("http://127.0.0.1:8000/auth/logout/");
        removeAuthData();
        return data;
    }
    catch(error){
        return error.response? error.response.data : error;
    }
}
