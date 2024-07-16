import InputEmoji from "react-input-emoji";
import ProfileImage from "../components/ProfileImage";
const UploadModal = ({
  imgCaption,
  setImgCaption,
  imageFile,
  setImageFile,
  createPost,
  
}) => {
  return (
    <div
      className="modal fade "
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Create Post
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setImgCaption("");
                setImageFile([]);
              }}></button>
          </div>
          <form onSubmit={createPost}>
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
                        onChange={(e) => setImageFile(e.target.files)}></input>
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
                    src={imageFile.length && URL?.createObjectURL(imageFile[0])}
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
                  setImgCaption("");
                  setImageFile([]);
                }}>
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                type="submit"
                className="btn btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
