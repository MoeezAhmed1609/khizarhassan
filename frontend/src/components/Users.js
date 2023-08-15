import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import StyledButton from "../components/styledButton";
import StyledTextField from "../components/styledTextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, updateUserRole } from "../redux/actions/userActions";

const Users = () => {
  // Getting all users
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users);
  const users = usersData?.users?.data?.users;
  // Change role
  const handleChangeRole = (id, userRole) => {
    const role = userRole === "Admin" ? "User" : "Admin";
    dispatch(updateUserRole(id, role));
    window.location.reload();
  };
  // search users
  const [search, setSearch] = useState("");
  // Delete user
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
    window.location.reload();
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <StyledTextField
              title={"Search here"}
              type={"text"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              width="100%"
            />
          </Grid>

          {users
            ?.filter((user) =>
              user?.name?.toLowerCase()?.includes(search?.toLowerCase())
            )
            ?.map((user, i) => (
              <Grid item xs={12} sm={6} md={4} sx={{ margin: "0 5px" }}>
                <Card sx={{ width: "100%", textAlign: "left" }} key={i}>
                  <CardContent>
                    {/* <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Word of the Day
                        </Typography> */}
                    <Typography variant="h5" component="div">
                      {user?.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Email: {user?.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>Role: {user?.role}</Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Orders: {user?.orders?.length}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>
                      Favorites: {user?.favorites?.length}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ display: "flex", gap: "0 5px" }}>
                    <StyledButton
                      title={"Delete User"}
                      onClick={() => handleDeleteUser(user?._id)}
                      mode={"dark"}
                      width={"50%"}
                    />
                    <StyledButton
                      title={"Change Role"}
                      onClick={() => handleChangeRole(user?._id, user?.role)}
                      mode={"light"}
                      width={"50%"}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};
export default Users;
