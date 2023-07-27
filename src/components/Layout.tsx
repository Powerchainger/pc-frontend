import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex m-4">
            <div className="">
                <Sidebar />
            </div>
            <div className="flex flex-grow justify-center m-4">
                <div>
                    <div className="border-t border-gray-300 w-full my-2"></div>
                    {children}
                </div>
            </div>
        </div>
    );
}
