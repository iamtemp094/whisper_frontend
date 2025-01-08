import axios from 'axios';
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true
});

export const login = async (email, password) => {
    try {
        const { data } = await api.post("/auth/login/", {
            username: email,
            password: password,
        });
        await localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

export const signup = async (email, name, password) => {
    try {
        const { data } = await api.post("/auth/signup/", {
            email: email,
            username: name,
            password: password,
        });
        console.log(data)
        await localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

export const logout = async (token) => {
    console.log(token)
    try {
        const { data } = await axios.post("http://localhost:8000/auth/logout/",{
            token:token
          });
        return data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

export const verify_token = async () => {
    const token = localStorage.getItem('token');
    if(!token){
        return {data:"missing token"}
    }
    try {
        const { data } = await api.post("/auth/verify_token/",{
            token: token
        });
        return data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};