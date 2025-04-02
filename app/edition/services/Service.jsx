
import React from 'react'
import axios from 'axios'

const servicios = [

    async function saveHeader(data) {
        const response = await axios.post('http://localhost:3000/api/headers', data);
        return response.data;
    },



]

export default servicios;
