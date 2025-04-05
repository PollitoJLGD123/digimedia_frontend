
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body3 from '../components/Body3'

export default function Page() {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-12 relative bg-gradient-to-r text-black min-h-screen w-full">
                <div className="hidden lg:block w-20 xl:w-24 2xl:w-32 bg-gradient-to-b from-red-700 via-sky to-blue-800 fixed left-0 top-0 h-full -z-10"></div>

                <Body3 />

                <Footer />
            </div>
        </div>
    )
}
