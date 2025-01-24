import React, { memo, useEffect, useState } from "react";

import "./style.css";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateValue } from "../../context";
function Yourprofile() {
  const [data, setData] = useState([]);
  const { setPopal } = useStateValue();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log("data");
  //       let response = await axios.get(
  //         "https://nt-shopping-list.onrender.com/api/auth",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //       let data = await response.data;
  //       setData(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  // console.log(localStorage.getItem("user"));
  // console.log(data);
  //   console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <div className="item">
        <div className="title1">
          <h1>Your profile</h1>

          <div className="title4">
            <div className="title3">
              <h1>
                {JSON.parse(localStorage.getItem("user"))
                  .name.toUpperCase()
                  .slice(0, 1)}
              </h1>
            </div>

            <div className="title11">
              <div className="title10">
                <h1>
                  {JSON.parse(localStorage.getItem("user"))
                    .name.charAt(0)
                    .toUpperCase() +
                    JSON.parse(localStorage.getItem("user")).name.slice(1)}
                </h1>

                <Stack direction="row" spacing={2}>
                  <Button
                    style={{
                      width: "80px",
                      height: "27px",
                      background: "green",
                      color: "white",
                      textAlign: "center",
                    }}
                    variant="outlined"
                  >
                    {JSON.parse(localStorage.getItem("user")).status}
                  </Button>
                </Stack>
              </div>
              <p>{JSON.parse(localStorage.getItem("user")).username}</p>
            </div>
          </div>
        </div>
        <div className="title2">
          <Button
            style={{ width: "200px", height: "40px" }}
            variant="contained"
          >
            <ContentCopyIcon /> Copy UserName
          </Button>
          <Button
            style={{ width: "200px", background: "red", height: "40px" }}
            variant="contained"
          >
            <DeleteIcon />
            Delete AccounT
          </Button>
        </div>
      </div>
    </>
  );
}

export default Yourprofile;
