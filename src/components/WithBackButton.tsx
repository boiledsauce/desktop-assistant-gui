import React, { ComponentType, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WithBackButton = (Component: ComponentType) => {
    return (props: PropsWithChildren<any>) => {
        const navigate = useNavigate();

        return (
            <>
                <IconButton onClick={() => navigate(-1)} color="primary" aria-label="go back">
                    <ArrowBackIcon />
                </IconButton>
                <Component {...props} />
            </>
        );
    };
};

export default WithBackButton;