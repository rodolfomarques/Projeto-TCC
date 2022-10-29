import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, List, Divider,
    IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {ChevronLeft, ChevronRight, Inbox } from '@mui/icons-material';
import Home from '../../pages/Home/Home';
import Header from '../Header/Header';
    
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    height: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
  }),
);



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const menuItems = [
    {text: 'Home', onClick: () => {}, icon: <Inbox />},
    {text: 'Sobre', onClick: () => {}, icon: <Inbox />},
    {text: 'Agradecimentos', onClick: () => {}, icon: <Inbox />},
]

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(prevState => !prevState);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Header handleDrawerOpen={handleDrawerOpen} open={open} />
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={`item-${index}`} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Main open={open}>
                <Home />
            </Main>
        </>
    );
}
