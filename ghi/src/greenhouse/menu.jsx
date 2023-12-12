// import React, { useState } from 'react'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
// import Drawer from '@material-ui/core/Drawer'

// const hamburger = () => {
//     const [isDrawerOpen, setDrawerOpen] = useState(false)

//     const toggleDrawer = (open) => {
//         setDrawerOpen(open)
//     }

//     return (
//         <div>
//             <IconButton
//                 edge="start"
//                 color="inherit"
//                 onClick={() => toggleDrawer(true)}
//             >
//                 <MenuIcon />
//             </IconButton>

//             <Drawer
//                 anchor="left"
//                 open={isDrawerOpen}
//                 onClose={() => toggleDrawer(false)}
//             >
//                 {/* Your drawer content goes here */}
//                 <div>Drawer Content</div>
//             </Drawer>

//             {/* The rest of your component content goes here */}
//         </div>
//     )
// }

// export default hamburger
