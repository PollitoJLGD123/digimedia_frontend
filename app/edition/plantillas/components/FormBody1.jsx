
import React from 'react'

export default function FormBody1(props) {

    const {
        formCommendBody,
        setFormCommendBody,
        formInfoBody,
        setFormInfoBody,
        formEncabezadoBody,
        setFormEncabezadoBody,
        formGaleryBody,
        setFormGaleryBody
    } = props;

    const handleCommendBodyChange = (e) => {
        const { name, value } = e.target
        setFormCommendBody((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleInfoBodyChange = (e) => {
        const { name, value } = e.target
        setFormInfoBody((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleEncabezadoBodyChange = (e) => {
        const { name, value } = e.target
        setFormEncabezadoBody((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleGaleryBodyChange = (e) => {
        const { name, value } = e.target
        setFormGaleryBody((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <>

        </>
    )
}
