import React, { useState } from "react";
import {
  alpha,
  makeStyles,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { searchBlog } from "../redux/actions/blogAction";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  btn: {
    display: "block",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(
      theme.palette.common.white,
      0.15
    ),
    "&:hover": {
      backgroundColor: alpha(
        theme.palette.common.white,
        0.25
      ),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(
      4
    )}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState(null);
  const dispatch = useDispatch()

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(
    mobileMoreAnchorEl
  );

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const userLogout = () => {
    dispatch(logout())
    handleMenuClose();
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [search,setSearch] = useState("")
  const navigate = useNavigate()

  const searchHandler = (e) => {
    e.preventDefault()
    dispatch(searchBlog(search))
    setSearch("")
    navigate("/search")
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        to='/profile'
        style={{ textDecoration: "none" }}
      >
        <Link to={`/profile/${auth?.user?._id}`} style={{ textDecoration:"none" }}>
        <MenuItem onClick={handleMenuClose}>
          Profile
        </MenuItem>
          </Link>
      </Link>
      <MenuItem onClick={() => userLogout()}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId =
    "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {auth?.user ? (
        <div>
        <MenuItem onClick={handleProfileMenuOpen}>
          
          <p>Profile</p>
        </MenuItem>
        <MenuItem>
        <Link to="/createblog" style={{ textDecoration:"none" , color:"black" }} onClick={handleMenuClose}>
        <p>CreateBlog</p>
        </Link>
      </MenuItem>
      <MenuItem>
      <Link to="/createCategory" style={{ textDecoration:"none" , color:"black" }} onClick={handleMenuClose}>
        <p>CreateCategory</p>
        </Link>
    </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <Link
              to='/login'
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Login
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/register'
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Register
            </Link>
          </MenuItem>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            className={classes.title}
            variant='h6'
            noWrap
          >
            ZayBlog
          </Typography>
            <form onSubmit={searchHandler}  className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon   />
              <button type="submit" style={{ display:"none" }}></button>
          </div>
            
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              inputProps={{
                "aria-label": "search",
              }}
            />
          </form>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {auth?.user ? (
              <>
             <Button color='inherit'>
                  <Link
                    to='/createblog'
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    CreateBlog
                  </Link>
                </Button>
                <Button color='inherit'>
                  <Link
                    to='/createcategory'
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    CreateCategory
                  </Link>
                </Button>
              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <Avatar src={auth && auth.user.avatar} />
              </IconButton>
              </>
            ) : (
              <div>
                <Button color='inherit'>
                  <Link
                    to='/login'
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Login
                  </Link>
                </Button>

                <Button color='inherit'>
                  <Link
                    to='/register'
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Register
                  </Link>
                </Button>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
