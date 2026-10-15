import React from 'react'
import StaggeredMenu from "@/components/staggered-menu";


const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Courses", ariaLabel: "View our courses", link: "/courses" },
    { label: "About", ariaLabel: "Learn about the school", link: "/#about" },
    { label: "Enroll", ariaLabel: "Enroll today", link: "/#enroll" },
];

const socialItems = [
    { label: "WhatsApp", link: "https://wa.me/254700000000" },
    { label: "Instagram", link: "https://instagram.com/yourschool" },
];

const Navbar = () => {
    return (
        <div>
            <StaggeredMenu
                isFixed
                position="right"
                items={menuItems}
                socialItems={socialItems}
                colors={["#c9d6a3", "#9cae65"]}
                accentColor="#7d8f4a"
                menuButtonColor="#ffffff"
                openMenuButtonColor="#111"
                logoUrl="/logo.svg"
            />
        </div>
    )
}
export default Navbar
