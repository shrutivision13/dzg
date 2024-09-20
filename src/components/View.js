import React from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

function View() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Header open={open} setOpen={setOpen} />
            <Sidebar open={open} setOpen={setOpen} />

        </>
    )
}

export default View