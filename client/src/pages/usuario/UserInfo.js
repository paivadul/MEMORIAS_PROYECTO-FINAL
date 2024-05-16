import React from "react";
import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../context/global-context';

export const UserInfo = () => {
    const { user} = useContext(GlobalContext);

    useEffect(() => {
    }, [user])

    return (
        <>
            <h1>UserInfo</h1>
        </>
    )
}