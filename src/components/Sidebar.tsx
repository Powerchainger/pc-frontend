import React, {useState, useEffect, useContext} from "react";
import kc from "../keycloak"
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
import {Link, useLocation, useNavigate} from "react-router-dom";
import NewNoticesContext from '../hooks/NewNoticesContext';

interface SidebarProps {
    showSidebar: boolean;
}

export default function Sidebar({ showSidebar }: SidebarProps) {
    const context = useContext(NewNoticesContext);
    if (!context) {
        throw new Error('DevicesPage must be used within a NewNoticesContext.Provider');
    }
    const { newNotices, setNewNotices } = context;
    const location = useLocation();
    const navigation = useNavigate();

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

    const logOut = () => {
        localStorage.setItem("username", " ")
        localStorage.setItem("email", " ")
        localStorage.setItem("token", " ")
        kc.logout();
    }

    return (
        <div className={`transition-width duration-300 ease-in-out overflow-hidden ${showSidebar ? 'min-w-[14rem] max-w-[16rem]' : 'w-0 min-w-0 max-w-0'}`}>
            <Card className="h-full flex-1 p-0">
                <div className="my-1 p-4 flex justify-center items-center">
                    <Typography variant="h5" color="blue-gray">
                        Dashboard
                    </Typography>
                </div>
                <List>
                    <Link to={"/"}>
                        <ListItem>
                            <ListItemPrefix>
                                <FontAwesomeIcon icon={faHouse} className="h-5 w-5" />
                            </ListItemPrefix>
                            Home
                        </ListItem>
                    </Link>
                    <Link to={"/prediction"}>
                        <ListItem>
                            <ListItemPrefix>
                                <FontAwesomeIcon icon={faPlug} className="h-5 w-5" />
                            </ListItemPrefix>
                            Predictions
                        </ListItem>
                    </Link>
                    <hr className="my-2 border-blue-gray-50" />
                    {/*<Link to={"/notices"}>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemPrefix>*/}
                    {/*            <FontAwesomeIcon icon={faBell} className={newNotices > 0 ? "h-5 w-5 bounce" : "h-5 w-5"} />*/}
                    {/*        </ListItemPrefix>*/}
                    {/*        Notices*/}
                    {/*        <ListItemSuffix>*/}
                    {/*            <Chip value={newNotices} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />*/}
                    {/*        </ListItemSuffix>*/}
                    {/*    </ListItem>*/}
                    {/*</Link>*/}
                    {/*<ListItem>*/}
                    {/*    <ListItemPrefix>*/}
                    {/*        <FontAwesomeIcon icon={faUser} className="h-5 w-5" />*/}
                    {/*    </ListItemPrefix>*/}
                    {/*    Profile*/}
                    {/*</ListItem>*/}
                    {/*<Link to={"/settings"}>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemPrefix>*/}
                    {/*            <FontAwesomeIcon icon={faGear} className="h-5 w-5" />*/}
                    {/*        </ListItemPrefix>*/}
                    {/*        Settings*/}
                    {/*    </ListItem>*/}
                    {/*</Link>*/}
                    {/*<Link to={"/login"}>*/}
                    <div onClick={logOut}>
                    <ListItem>
                        <ListItemPrefix>
                            <FontAwesomeIcon icon={faPowerOff} className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                    </div>
                    {/*</Link>*/}
                </List>
            </Card>
        </div>
    );
}
