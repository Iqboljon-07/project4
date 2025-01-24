import React, { useRef } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./style.css";
import { useStateValue } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Modal() {
  const { setPopal, popal } = useStateValue();
  const { creatgroup, setCreatGroup } = useStateValue();
  const name = useRef(null);
  const password = useRef(null);
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    let user = {
      name: name.current.value,
      password: password.current.value,
    };
    console.log(user);

    try {
      let response = await axios.post(
        "https://nt-shopping-list.onrender.com/api/groups",

        {
          name: user.name,
          password: user.password,
        },

        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Group created successfully");
        setPopal(false);
        name.current.value = "";
        password.current.value = "";
        let todos = {
          name: name.current.value,
        };
        setCreatGroup((prev) => [...prev, todos]);

        // location.reload();
        // setCreatGroup([...groups, response.data.group]);
      }
      console.log(response);
    } catch (error) {
      toast.error("Invalid credentials");
      console.error("Error", error.response.data || error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal_item">
        <h5>Group name and password</h5>
        <HighlightOffIcon
          style={{ fontSize: "36px" }}
          onClick={() => setPopal(false)}
        />
      </div>

      <form onSubmit={onSubmit} action="">
        <input ref={name} type="text" placeholder="Group name" />
        <input ref={password} type="password" placeholder="Group password" />
        <Stack spacing={2} direction="row">
          <Button type="submit" style={{ width: "100px" }} variant="contained">
            Create
          </Button>
          <Button
            onClick={() => setPopal(false)}
            style={{ width: "100px" }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Modal;
