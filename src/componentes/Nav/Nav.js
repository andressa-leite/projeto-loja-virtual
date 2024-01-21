import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { Avatar, Grid } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../../utils/AplicationContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ShoppingCart } from "@mui/icons-material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const aplicationContext = useContext(AppContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    /* setUser(aplicationContext.context?.user?.name) */
    /*   setUser(JSON.parse(localStorage.getItem("data"))?.user); */
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isLogged = () => {
    return localStorage.getItem("data");
  };

  const logOut = () => {
    localStorage.removeItem("data");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item>
              <Typography variant="h6" noWrap component="div" sx={8}>
                Loja Virtual {/* , {aplicationContext.context?.user?.name} */}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <ShoppingCartIcon  sx={{color: "#FFFFFF"}}/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {aplicationContext.context?.user && (
            <Link to="/users/account">
              <ListItemButton>
                <IconButton>
                  <ListItemIcon>
                    <Tooltip title="Open settings">
                      <Avatar
                        alt="Avatar"
                        src={
                          aplicationContext.context?.user?.avatar
                            ? aplicationContext.context?.user.avatar
                            : "/static/images/avatar/2.jpg"
                        }
                      ></Avatar>
                    </Tooltip>
                  </ListItemIcon>
                </IconButton>

                <ListItemText primary= {aplicationContext.context?.user?.name} />
              </ListItemButton>
            </Link>
          )}

          <Link to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/products">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon >
                  <ShoppingBasketIcon />
                </ListItemIcon>
                <ListItemText primary={"Products"} />
              </ListItemButton>
            </ListItem>
          </Link>
          {!isLogged() ? (
            <Link to="/Login">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : (
            <ListItem disablePadding>
              <ListItemButton onClick={logOut}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
