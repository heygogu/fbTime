import ProfileImage from "./ProfileImage";

const Upload = () => {
  return (
    <div className="container post-container">
      <div className="row">
        <div className="col post">
          <div className="upload-dp">
            <ProfileImage height={50} width={50} />
          </div>
          <input
            className="upload"
            placeholder="What's on your mind"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"></input>
        </div>
      </div>
    </div>
  );
};
export default Upload;
