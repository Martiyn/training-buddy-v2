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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Optional, UserListener } from "./shared-types";
import { User, UserGender, UserRole, UserStatus } from "./users-model";

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
    <Card sx={{ width: 400 }}>
      <CardHeader
        sx={{ height: CARD_HEADER_HEIGHT }}
        avatar={<Avatar alt="user" src={user.picture} />}
        title={user.userName}
        subheader={UserRole[user.role]}
      />
      <CardContent sx={{ height: CARD_CONTENT_HEIGHT }}>
        <Typography paragraph>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gender: {UserGender[user.gender]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {UserStatus[user.status]}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {loggedUser?.id === user.id || loggedUser?.role === UserRole.Admin ? (
          <React.Fragment>
            <IconButton onClick={handleEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        ) : null}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>About me: {user.shortDescription}</Typography>
          <Typography paragraph>Registered on: {user.registeredOn}</Typography>
          <Typography paragraph>Modified on: {user.modifiedOn}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
