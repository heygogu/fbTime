import BG_IMAGE from "../assets/images/background.jpg";
import ProfileImage from "./ProfileImage";
const Header = () => {
  return (
    <div className="container-fluid header">
      <div className="row row-first">
        <div className="col">
          <img className="profile-bg" src={BG_IMAGE}></img>
        </div>
      </div>
      <div className="row row-second">
        <div className="col ">
          <ProfileImage height={160} width={160} />
        </div>
        <h3 style={{ textAlign: "center" }}>Rohit Kumar</h3>
      </div>
      <hr className="hr"></hr>
      <div className="row" style={{}}>
        <div className="col">
          <div style={{padding:"0"}}>
            <h5 className="timeline">Timeline</h5>
            <div className="below-heading"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
