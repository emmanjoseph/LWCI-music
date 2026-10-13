import React from 'react'
import {Hero} from "@/components/Hero";
import About from "@/components/about";
import Courses from "@/components/Courses";
import Features from "@/components/features";
import ContactCta from "@/components/Contact";
import Footer from "@/components/Footer";
import Faq from "@/components/FAQ";

const Page = () => {
    return (
        <>
            <Hero/>
            <About/>
            <Courses/>
            <Features/>
            <Faq/>
            <ContactCta/>
            <Footer/>

        </>
    )
}
export default Page
