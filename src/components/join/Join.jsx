import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./style.css";
import { useStateValue } from "../../context";
import { toast } from "react-toastify";

function Join() {
  const { setJoin, join } = useStateValue();
  const [arr, setArr] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    const password = e.target[0].value;
    console.log(password);

    (async () => {
      try {
        let response = await axios.post(
          "https://nt-shopping-list.onrender.com/api/groups/:groupId/join",
          {
            password,
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("Signed in successfully");

          localStorage.setItem("token", response.data.token);
        }
      } catch (error) {
        toast.error("Invalid credentials");
        console.error(error);
      }
    })();
  };

  return (
    <div className="join">
      <div className="join_item">
        <h5>Group name and password</h5>
        <HighlightOffIcon
          style={{ fontSize: "36px" }}
          onClick={() => setJoin(false)}
        />
      </div>

      <form onSubmit={onSubmit} action="">
        <input type="password" placeholder="Group password" />
        <Stack spacing={2} direction="row">
          <Button type="submit" style={{ width: "220px" }} variant="contained">
            Join Group
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Join;
