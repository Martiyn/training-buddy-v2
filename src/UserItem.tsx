import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Optional, UserListener } from "./shared-types";
import { User, UserGender, UserRole, UserStatus } from "./users-model";
import "./UserItem.css";

const CARD_HEADER_HEIGHT = 60;
const CARD_CONTENT_HEIGHT = 100;

interface UserItemProps {
  user: User;
  loggedUser: Optional<User>;
  onDeleteUser: UserListener;
  onEditUser: UserListener;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const UserItem = ({
  user,
  loggedUser,
  onDeleteUser,
  onEditUser,
}: UserItemProps) => {
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  function handleEdit() {
    onEditUser(user);
  }
  function handleDelete() {
    onDeleteUser(user);
  }
  return (
    <div className="UserItem">
      <span className="UserItem-username">{user.userName}</span>
      <img className="UserItem-picture" src={user.picture}></img>
      <span className="UserItem-names">
        {user.firstName} {user.lastName}
      </span>
      <span className="UserItem-description">
        About me: {user.shortDescription}
      </span>
      <span className="UserItem-status">Status: {UserStatus[user.status]}</span>
      <span className="UserItem-gender">Gender: {UserGender[user.gender]}</span>
      <span className="UserItem-role">Role: {UserRole[user.role]}</span>
      <span className="UserItem-created-modified-on">
        <p>Created On: {user.registeredOn}</p>
        <p>Updated On: {user.modifiedOn}</p>
      </span>
      {loggedUser?.id === user.id || loggedUser?.role === UserRole.Admin ? (
        <div className="UserItem-btn-container">
          <span className="UserItem-button" onClick={handleDelete}>
            Delete
          </span>
          <span className="UserItem-button" onClick={handleEdit}>
            Edit
          </span>
        </div>
      ) : null}
    </div>
  );
};
