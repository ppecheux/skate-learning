import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import logout from '../utils/logout'

export default function ProfilePictureMenu({ classes, user }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Avatar alt={user.given_name} src={user.profilePicture} className={classes.orange} onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/profile">
                        <ListItemIcon>
                            <FaceIcon />
                        </ListItemIcon>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon onClick={logout}>
                        <ExitToAppIcon />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </div>
    );
}
