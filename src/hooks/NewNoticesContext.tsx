import React from 'react';

export interface NewNoticesContextType {
    newNotices: number;
    setNewNotices: React.Dispatch<React.SetStateAction<number>>;
}

// Initialize the Context with an empty object
const NewNoticesContext = React.createContext<NewNoticesContextType | undefined>(undefined);

export default NewNoticesContext;
