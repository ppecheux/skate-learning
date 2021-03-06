import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import logout from '../utils/logout'
import { UserContext } from "../UserContext"


export default function ProfilePictureMenu({ classes, user }) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { setUser } = useContext(UserContext)


  return (
    <div>
      <Avatar alt={user.name.toUpperCase()} src={user.profilePicture || "use_alt"} className={classes.orange} onClick={handleClick} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to={"/profile/" + user.id}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon onClick={() => logout(setUser)}>
            <ExitToAppIcon />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
  );
}
