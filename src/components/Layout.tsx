import React, {ReactNode, useState} from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="flex h-screen">
            <Sidebar showSidebar={showSidebar} />
            <div className="flex flex-col flex-grow">
                <Topbar toggleSidebar={toggleSidebar} />
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
}
