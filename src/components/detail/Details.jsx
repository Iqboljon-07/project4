import React, { useEffect } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../context";
import axios from "axios";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { HiH1 } from "react-icons/hi2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
function Details() {
  const { groupId } = useParams();
  const { detail, setDetail, text, setText } = useStateValue();
  const { items, setItems, members, setMembers } = useStateValue();
  const { shopping, setShopping } = useStateValue();
  const [pending, setisPending] = React.useState("");

  console.log(groupId);
  const Select = async (e) => {
    e.preventDefault();
    let event = e.target.value;
    if (event === "1") {
      alert("Add");

      try {
        let response = await axios.post(
          "https://nt-shopping-list.onrender.com/api/groups/:groupId/members",
          {
            // memberId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else if (event === "2") {
      alert("Delete");
    }
  };

  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(
          `https://nt-shopping-list.onrender.com/api/groups`,

          {
            headers: {
              "x-auth-token": `${localStorage.getItem("token")}`,
            },
          }
        );
        let result = response.data?.find((val) => val._id === groupId);
        setDetail(result);
        setItems(result.items);
        setMembers(result.members);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [groupId]);
  console.log(detail);

  const onSubmit = async (e) => {
    e.preventDefault();

    let todos = {
      text,
    };

    try {
      let response = await axios.post(
        `https://nt-shopping-list.onrender.com/api/items`,
        {
          title: todos.text,
          groupId,
        },
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.status == 201) {
        toast.success("Ma'lumotingiz qo'shildi");
        setItems([...items, response.data.item]);
        setText("");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Xatolik");
    }
  };

  const deletItem = async (id) => {
    try {
      setisPending(id);
      let response = await axios.delete(
        `https://nt-shopping-list.onrender.com/api/items/${id}`,
        {
          headers: {
            "x-auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        setisPending(false);
        setItems(items.filter((item) => item._id !== id));
        toast.success(response.data.message);
      }
    } catch (err) {
      setisPending(false);
      console.log(err.message);
      toast.error("Xatolik");
    }
  };

  console.log(text);
  //let result = detail?.find((val) => val._id === groupId); //tashqarida qo'llasak ham bo'ladi
  // console.log(result);

  // if (shopping) {
  //   toast.success("Sotib oldingiz");
  // } else {
  //   toast.error("Buyurtmangiz qaytarildi");
  // }
  return (
    <div className="detail">
      <div className="detail_item">
        <div className="detail_title">
          <h1>{detail?.name} </h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button>
              Owner:
              <span className="span" style={{ paddingLeft: "3px" }}>
                {detail?.owner?.name.toUpperCase().charAt(0)}
              </span>
              {detail?.owner?.name.toUpperCase().charAt(0) +
                detail?.owner.name.slice(1)}
              (
              {detail?.owner.username.toUpperCase().charAt(0) +
                detail?.owner.username.slice(1)}
              )
            </button>
            <select
              onChange={Select}
              style={{
                width: "90px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
              }}
              name=""
              id=""
            >
              <option value="">Add && Del </option>
              <option value="1">Add member</option>
              <option value="2">Delete Group</option>
            </select>
          </div>
        </div>
        <div className="detail_title2">
          <div style={{ backgroundColor: "#ffffff" }} className="detail_items">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                Items <span className="span">{items?.length}</span>
              </h3>
              <form
                onSubmit={onSubmit}
                style={{ display: "flex", gap: "5px" }}
                action=""
              >
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{
                    padding: "5px 0",

                    border: "1px solid #ccc",

                    borderRadius: "5px",
                  }}
                  type="text"
                  placeholder="Title"
                />

                <button type="submit">
                  <AddIcon style={{ fontSize: "14px" }} />
                </button>
              </form>
            </div>
            <div className="items_title">
              {items?.map((val) => (
                <div key={val._id} className="items_title1">
                  <div style={{ display: "flex", gap: "10px" }}>
                    <span className="span">
                      {val?.title?.toUpperCase()?.charAt(0)}
                    </span>

                    <div style={{ display: "grid", gap: "5px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <p>
                          {val?.title?.toUpperCase()?.charAt(0) +
                            val?.title.slice(1)}
                        </p>
                        <p
                          style={{
                            background: "aqua",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            fontSize: "10px",
                          }}
                        >
                          Bought By{" "}
                          {val?.boughtBy?.name?.toUpperCase()?.charAt(0) +
                            val?.boughtBy?.name?.slice(1)}{" "}
                          {val?.createdAt}
                        </p>
                      </div>

                      <p
                        style={{
                          display: "flex",
                          gap: "5px",
                          color: "grey",
                          fontSize: "12px",
                        }}
                      >
                        <span> Crated By</span>
                        {val?.owner?.name?.toUpperCase()?.charAt(0) +
                          val?.owner.name.slice(1)}
                        ({val?.createdAt})
                      </p>
                    </div>
                  </div>

                  <div className="icons">
                    <div onClick={() => setShopping(!shopping)}>
                      {shopping ? (
                        <DoneAllIcon style={{ backgroundColor: "blue" }} />
                      ) : (
                        <ShoppingCartIcon
                          style={{ backgroundColor: "green" }}
                        />
                      )}
                    </div>
                    <div onClick={() => deletItem(val._id)}>
                      {pending === val._id ? "..." : <DeleteIcon />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff" }} className="detail_items">
            <h3>
              Members <span className="span">{detail?.members?.length}</span>
            </h3>

            <div style={{ marginTop: "15px" }} className="items_title">
              {members?.map((item) => (
                <div className="members_title" key={item._id}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span className="span">
                        {item?.name?.toUpperCase()?.charAt(0)}{" "}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <p>
                          {item.name.toUpperCase().charAt(0) +
                            item?.name.slice(1)}{" "}
                        </p>
                        <p style={{ color: "grey" }}>{item?.username} </p>
                      </div>
                    </div>
                  </div>
                  <DeleteIcon style={{ color: "red" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;

// useEffect(() => {
//   const test = function () {
//     axios
//       .get(`https://nt-shopping-list.onrender.com/api/groups`, {
//         headers: {
//           "x-auth-token": localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         let result = response?.data?.find((item) => item.id == id);
//         setDetail(result);
//       });
//   };
//   test();
// }, []);

// useEffect(() => {
//   (async function () {
//     let response = await axios.get(
//       `https://nt-shopping-list.onrender.com/api/groups`,
//       {
//         headers: {
//           "x-auth-token": `${localStorage.getItem("token")}`, //2-usul
//         },
//       }
//     );
//     let result = response.data.find((val) => val._id === id);
//     setDetail(result);
//   })();
// }, []);

{
  /* <div>
              <h4 style={{ display: "flex", alignItems: "center" }}>
                Items <span className="span"> </span>
              </h4>
            </div> */
}
