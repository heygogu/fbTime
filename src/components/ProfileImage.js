import DP from "../assets/images/yoo.png"
const ProfileImage=({height,width})=>{
    return (
        <img className="dp" src={DP} style={{height:height+'px',width:width+'px',objectFit:"cover"}} alt="my image"></img>
    )
}
export default ProfileImage;