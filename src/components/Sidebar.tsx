import React, {useState, useEffect, useContext} from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlug, faBell, faUser, faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import {Link, useLocation} from "react-router-dom";
import NewNoticesContext from '../hooks/NewNoticesContext';


export default function Sidebar() {
    const context = useContext(NewNoticesContext);
    if (!context) {
        throw new Error('DevicesPage must be used within a NewNoticesContext.Provider');
    }
    const { newNotices, setNewNotices } = context;
    const location = useLocation();

    useEffect(() => {
        // Get stored notices count from localStorage
        const storedNoticesCount = localStorage.getItem('newNotices');
        if (storedNoticesCount) {
            setNewNotices(Number(storedNoticesCount));
        }
    }, []);

    useEffect(() => {
        // Reset the newNotices state when the user visits the notices page
        if (location.pathname === "/notices") {
            setNewNotices(0);
            localStorage.setItem('newNotices', '0');
        }
    }, [location]);

    useEffect(() => {
        // Save the newNotices count to localStorage whenever it changes
        localStorage.setItem('newNotices', String(newNotices));
    }, [newNotices]);

    return (
        <Card className="h-[calc(100vh-2rem)] flex-1 p-0 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Dashboard
                </Typography>
            </div>
            <List>
                <Link to={"/home"}>
                    <ListItem>
                        <ListItemPrefix>
                            <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />
                        </ListItemPrefix>
                        Home
                    </ListItem>
                </Link>
                <Link to={"/devices"}>
                    <ListItem>
                        <ListItemPrefix>
                            <FontAwesomeIcon icon={faPlug} className="h-5 w-5" />
                        </ListItemPrefix>
                        Devices
                    </ListItem>
                </Link>
                <hr className="my-2 border-blue-gray-50" />
                <Link to={"/notices"}>
                    <ListItem>
                        <ListItemPrefix>
                            <FontAwesomeIcon icon={faBell} className={newNotices > 0 ? "h-5 w-5 bounce" : "h-5 w-5"} />
                        </ListItemPrefix>
                        Notices
                        <ListItemSuffix>
                            <Chip value={newNotices} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                        </ListItemSuffix>
                    </ListItem>
                </Link>
                {/*<ListItem>*/}
                {/*    <ListItemPrefix>*/}
                {/*        <FontAwesomeIcon icon={faUser} className="h-5 w-5" />*/}
                {/*    </ListItemPrefix>*/}
                {/*    Profile*/}
                {/*</ListItem>*/}
                <Link to={"/settings"}>
                    <ListItem>
                        <ListItemPrefix>
                            <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
                        </ListItemPrefix>
                        Settings
                    </ListItem>
                </Link>
                <Link to={"/"}>
                <ListItem>
                    <ListItemPrefix>
                        <FontAwesomeIcon icon={faPowerOff} className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
                </Link>
            </List>
        </Card>
    );
}
