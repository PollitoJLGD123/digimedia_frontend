
import React from 'react'
import axios from 'axios'
import url from "../../../api/url"
import { getCookie } from 'cookies-next';

const URL_API = `${url}/api/`

const Servicios = {

    saveHeader : async function saveHeader(formData) {
        try{
            const response = await axios.get(`${url}/blog_head`, formData ,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    saveFooter : async function saveFooter(formData){
        try{
            const response = await axios.post(`${url}/blog_footer`, formData,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    saveBody : async function saveBody(formData){
        try{
            const response = await axios.post(`${url}/blog_body`, formData,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    saveCommendTarjeta : async function saveCommendTarjeta(formData){
        try{
            const response = await axios.post(`${url}/commend_tarjeta`, formData,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    saveTarjeta : async function saveTarjeta(formData){
        try{
            const response = await axios.post(`${url}/tarjeta`, formData,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    saveBlog : async function saveBlog(formData){
        try{
            const response = await axios.post(`${url}/blog`, formData,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    },

    saveCard : async function saveCard(formData){
        try{
            const response = await axios.post(`${url}/card`, formData,{
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.status === 200){
                return response.data.id;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }

}

export default Servicios;
