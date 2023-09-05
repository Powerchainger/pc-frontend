import React, {useContext, useState} from 'react';
import { AppBar, Toolbar, Button, Breadcrumbs, Link, IconButton, Typography, Popover, List, ListItem, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faGear, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import { CheckCircleOutline } from '@mui/icons-material';

interface TopbarProps {
    toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
    const notices = JSON.parse(localStorage.getItem('notices') || '[]');
    const newNotices = notices.length;
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x && x !== 'login');

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        localStorage.setItem('notices', '[]');
    };

    return (
        <div className="flex flex-col w-full">
            <AppBar position="static" className="bg-gradient-to-r from-blue-400 to-blue-700">
                <Toolbar className="flex justify-start">
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                    {location.pathname !== '/' && (
                        <div className="p-2">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" component={RouterLink} to="/">
                                    home
                                </Link>
                                {pathnames.map((value, index) => {
                                    const last = index === pathnames.length - 1;
                                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                                    return last ? (
                                        <Typography color="inherit" key={to}>
                                            {value}
                                        </Typography>
                                    ) : (
                                        <Link color="inherit" component={RouterLink} to={to} key={to}>
                                            {value}
                                        </Link>
                                    );
                                })}
                            </Breadcrumbs>
                        </div>
                    )}
                    <div className="ml-auto">
                        <IconButton color="inherit" onClick={handleClick}>
                            <Chip
                                label={newNotices}
                                size="small"
                                variant="filled"
                                color="primary"
                                icon={<FontAwesomeIcon icon={faBell} />}
                            />
                        </IconButton>
                        <Link color="inherit" component={RouterLink} to="/settings">
                            <IconButton color="inherit">
                                <FontAwesomeIcon icon={faGear} />
                            </IconButton>
                        </Link>
                        <Link color="inherit" component={RouterLink} to="/settings">
                            <IconButton color="inherit">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </IconButton>
                        </Link>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            {notices.length === 0 ? (
                                <div className="p-4 flex items-center">
                                    <CheckCircleOutline className="text-green-500 mr-2" />
                                    <Typography>No new notices</Typography>
                                </div>
                            ) : (
                                <List>
                                    {notices.map((notice: any, index: any) => (
                                        <ListItem key={index}>
                                            <div className="p-4 flex items-center">
                                                <Typography fontFamily={"Monospace"} fontSize={"15px"}>
                                                    {notice.device} was turned on at {notice.time}. It was predicted at {notice.wattage} watts.
                                                </Typography>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Popover>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
