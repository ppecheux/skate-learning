import React from 'react'
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton'


export const TricksPage = () => {
    return (
        <Link to="/addTrick">
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <Add />
            </IconButton>
        </Link>
    )
}