import ProfileImage from "./ProfileImage";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IMG_API_URL } from "../utils/constants.js";
import superagent from "superagent";
import InputEmoji from "react-input-emoji";
const Card = ({ imgURL, caption, id, getData }) => {
  const [imgCaption, setImgCaption] = useState("");

  const [imageFile, setImageFile] = useState([]);
  const [img, setImg] = useState(imgURL);
  const [changes, setChanges] = useState(1);


  const uploadImg = async () => {
    try {
      if (imageFile.length === 0) {
        return imgURL;
      }
      let formdata = new FormData();
      formdata.append("file", imageFile[0]);

      let response = await superagent
        .post("http://139.59.47.49:4004/api/upload/image")
        .send(formdata);

      return response.body.filename;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const updatePost = async (event) => {
    try {
      event.preventDefault();
      let payload = {
        id: id,
        post: imgCaption,
        background: img,
      };
      if (changes === 0) {
        let filename = await uploadImg();
        payload.background = filename;
      }
      
      const apiRes = await superagent
        .put("http://139.59.47.49:4004/api/post")
        .send(payload);

      // You can handle the response from the post creation here
      console.log("Post updated successfully:", apiRes.body);
      getData();
      setImageFile([]);
      setImgCaption(imgCaption);

      document.getElementById("imageInput").value = "";
      setChanges(1);
      toast.success("Post Updated Successfully");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error While Updating Post");
    }
  };

  async function deleteData() {
    try {
      const result = await superagent.delete(
        `http://139.59.47.49:4004/api/post/delete/${id}`
      );

      console.log(result.body);
      getData();
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.log("Could not Delete", error);
      toast.error("Error Deleting Post");
    }
  }

  async function fetchValue() {
    try {
      let apires = await superagent.get(
        `http://139.59.47.49:4004/api/post/${id}`
      );
      setImg(apires.body.background);
      setImgCaption(apires.body.post);
    } catch (error) {}
  }

  useEffect(() => {
    fetchValue();
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="container card-header">
            <div className="row">
              <div className="col col-11">
                <div className="cardHeading">
                  <ProfileImage height={40} width={40} />
                  <h6
                    style={{
                      margin: "0 10px",
                      position: "relative",
                      top: "10px",
                    }}>
                    Rohit Kumar
                  </h6>
                </div>
              </div>
              <div className="col col-1">
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      marginTop: "15px",
                      borderRadius: "30px",
                    }}></button>
                  <ul
                    className="dropdown-menu"
                    style={{ borderRadius: "25px" }}>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          borderRadius: "40px",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target={`#staticBackdrop+${id}`}
                        onClick={fetchValue}>
                        Edit
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "40px",
                        }}
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal${id}`}>
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="card-text">{caption}</p>
        </div>
        <div className="img-contain">
          <img
            src={IMG_API_URL + imgURL}
            className="card-img"
            alt="post-img"></img>
        </div>
      </div>
      {
        // Sure to Delete Modal
      }

      <div
        className="modal fade"
        id={`exampleModal${id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <p>
                Posts deleted once can't be retrieved later. Click 'Delete' to
                proceed.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "lightblue", border: "none" }}>
                Close
              </button>
              <button
                type="button"
                style={{ backgroundColor: "red", border: "none" }}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deleteData()}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* edit modal */}

      <div
        className="modal fade "
        id={`staticBackdrop+${id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Post
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setImgCaption(imgCaption);
                  setImageFile([]);
                }}></button>
            </div>
            <form onSubmit={updatePost}>
              <div className="modal-body">
                <div className="container modalHeader">
                  <div className="row header-row">
                    <div className="col-6">
                      <div className="modalHeading">
                        <ProfileImage height={40} width={40} />
                        <h6
                          style={{
                            margin: "0 10px",
                            position: "relative",
                            top: "10px",
                          }}>
                          Rohit Kumar
                        </h6>
                      </div>
                    </div>

                    <div className="col-6">
                      <div style={{ width: "100%", display: "flex" }}>
                        <input
                          type="file"
                          id="imageInput"
                          name="image"
                          accept="image/*"
                          onChange={(e) => {
                            setImageFile(e.target.files);
                            setImg("");
                            setChanges(0);
                          }}></input>
                      </div>
                    </div>
                  </div>
                  <div className="caption">
                    
                    <InputEmoji
                      className="caption-input"
                      cleanOnEnter
                      keepOpened
                      name="caption"
                      value={imgCaption}
                      placeholder="Here goes caption.."
                      onChange={(value) => setImgCaption(value)}
                    />
                  </div>
                  <div className="image-display">
                    <img
                      id="preview"
                      // src={`${IMG_API_URL}${imageFile[0]}`}
                      src={
                        img !== ""
                          ? `${IMG_API_URL}${img}`
                          : imageFile.length > 0
                          ? URL.createObjectURL(imageFile[0])
                          : ""
                      }
                      style={{
                        objectFit: "fill",

                        width: "300px",
                        border: "none",
                        background: "none",
                        display: "block",
                      }}></img>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setImgCaption(imgCaption);
                    setImageFile([]);
                  }}>
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    // setImgCaption(caption);
                    // setImageFile();
                  }}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Card;
