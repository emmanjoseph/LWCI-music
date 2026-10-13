import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
    return (
        <main className={'font-sans'}>
            {children}
        </main>
    )
}
export default Layout
