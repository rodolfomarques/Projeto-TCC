import { AppBar as MuiAppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu } from '@mui/icons-material';



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1
  
}));


const Header = ({open, handleDrawerOpen}) => {

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="abrir Menu"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2 }}
            >
                <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Que Rua é Essa?
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;