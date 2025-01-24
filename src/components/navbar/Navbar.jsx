import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.svg";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useStateValue } from "../../context";
import Search from "../search/Search";
function Navbar() {
  const [age, setAge] = React.useState("");
  const { search, setSearch } = useStateValue();
  const { datas, setDatas } = useStateValue();
  const { join, setJoin } = useStateValue();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setAge(event.target.value);

    // if (event.target.value === 10) {
    //   localStorage.removeItem("token"), navigate("/login");//remove qilish 2-usul
    // }
  };

  const onChange = async (e) => {
    setSearch(e.target.value);
    let response = await axios.get(
      `https://nt-shopping-list.onrender.com/api/groups/search`,
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
        params: {
          q: search,
        },
      }
    );

    setDatas(response.data);
  };

  return (
    <>
      <nav>
        <div className="nav_title1">
          <img src={logo} alt="" />
          <Stack spacing={2} direction="row">
            <Button style={{ borderRadius: "20px" }} variant="contained">
              + New
            </Button>
          </Stack>
        </div>

        <input
          value={search}
          onChange={onChange}
          type="text"
          placeholder="search"
        />

        <div className="nav_title2">
          <AutorenewIcon />
          <Badge badgeContent={"9+ "} color="error">
            <NotificationsIcon />
          </Badge>

          <Box sx={{ minWidth: 60 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                <SettingsIcon style={{ fontSize: "20px" }} />
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{
                  fontSize: "10px",
                }}
              >
                <MenuItem
                  onClick={() => {
                    const result = confirm(" Chiqishni xoxlaysizmi");
                    if (result) {
                      localStorage.removeItem("token"), navigate("/login");
                      toast.info("Siz dasturni tark etdingiz");
                    }
                  }}
                  value={10}
                >
                  lang out
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </nav>
      {/* 
      {search ? <Search /> : setJoin(false)} */}
      {search && <Search />}
    </>
  );
}

export default Navbar;
