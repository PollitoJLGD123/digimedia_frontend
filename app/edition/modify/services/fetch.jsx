
import axios from 'axios'
import url from '../../../../api/url'
import { getCookie } from 'cookies-next'

const Fetch = {
    fetchBlogs: async function fetchBlogs(){
        try{
            const response = await axios.get(`${url}/api/blogs/`);

            if(response.status === 200){
                return response.data;
            }
            else{
                return null;
            }
        }
        catch(error){
            console.log(error);
            return error;
        }
    },

    fetchBlogById: async function fetchBlogById(id){
        try{
            const response = await axios.get(`${url}/api/blogs/${id}`);
            
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }
        catch(error){
            console.log(response.data.error);
            return null;
        }
    },

    fetchCards: async function fetchCards(){
        try{
            const response = await axios.get(`${url}/api/cards`);
            if(response.status === 200){
                return response.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    },

    fetchBlogHead: async function fetchBlogHead(id){
        try{
            const response = await axios.get(`${url}/api/blog_head/${id}`);
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    },

    fetchBlogFooter: async function fetchBlogFooter(id){
        try{
            const response = await axios.get(`${url}/api/blog_footer/${id}`);
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    },

    fetchBlogBodyById: async function fetchBlogBodyById(id){
        try{
            const response = await axios.get(`${url}/api/blog_body/${id}`);
            if(response.status === 200){
                return response.data.data;
            }
            else{
                return null;
            }
        }catch(error){
            console.log(error);
            return null;
        }
    },

    updateGeneric: async function (path, id, data) {
        try {
          // URL para el PUT
          const response = await axios.put(`${url}/api/${path}/${id}`, data, {
            headers: {
              Authorization: `Bearer ${getCookie('token')}`,  // Autenticación mediante token
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            console.log("Respuesta de la API:", response.data);  // Ver la respuesta en consola
            return response.data;  // Devuelve los datos de la respuesta si la solicitud fue exitosa
          } else {
            console.error("Error en la respuesta", response);  // Si la respuesta no es 200
            return null;  // En caso de error, devuelve null
          }
        } catch (error) {
          console.error("Error en updateGeneric:", error);  // Si hay algún error en la solicitud
          return null;  // En caso de error, devuelve null
        }
      },

    saveImage: async function saveImage(formData,ruta) {
        try {

            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            const response = await axios.post(`${url}/${ruta}`, formData, {
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (response.status === 200) {
                return response.data;
            } else if(response.status === 400){
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    },
}

export default Fetch;
