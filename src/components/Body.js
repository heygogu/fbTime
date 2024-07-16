import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import ProfileImage from "./ProfileImage";
import superagent from "superagent";
import toast, { Toaster } from "react-hot-toast";
import Shimmer from "./Shimmer";
import FILTER_IMG from "../assets/icons/filters.png";
import Card from "./Card";

// import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Body = () => {
  const [imgCaption, setImgCaption] = useState("");

  const [postData, setPostData] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchMoreData = () => {
    superagent
      .get(`http://139.59.47.49:4004/api/posts?limit=7&start=${index}`)
      .then((res) => {
        const newPosts = res.body.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        if (isFiltered) {
          const newFilteredPosts = newPosts.filter((post) => {
            const postDate = new Date(post.created_at)
              .toISOString()
              .split("T")[0];
            return postDate === filterDate;
          });
          setFilteredData((prevItems) => [...prevItems, ...newFilteredPosts]);
          newFilteredPosts.length > 0 ? setHasMore(true) : setHasMore(false);
        } else {
          setPostData((prevItems) => [...prevItems, ...newPosts]);
          newPosts.length > 0 ? setHasMore(true) : setHasMore(false);
        }
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  async function getData() {
    try {
      setIndex(2); 
      setHasMore(true); 
      setIsFiltered(false); 

      let result = await superagent.get(
        `http://139.59.47.49:4004/api/posts?limit=8&start=1`
      );

      const sortedPosts = result.body.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setPostData(sortedPosts);
    } catch (error) {
      console.log("An Error Occured:", error);
    }
  }

  async function getFilteredData(filterDate) {
    try {
      setIndex(2);
      setHasMore(true);
      setIsFiltered(true); 

      const result = await superagent.get(
        `http://139.59.47.49:4004/api/posts?limit=10&start=1`
      );

      const filteredPosts = result.body.filter((post) => {
        const postDate = new Date(post.created_at).toISOString().split("T")[0];
        return postDate === filterDate;
      });

      setFilteredData(filteredPosts);
      setPostData(filteredPosts);
    } catch (error) {
      console.log("Error While Filtering :", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const uploadImg = async () => {
    try {
      let formdata = new FormData();
      formdata.append("file", imageFile[0]);

      let response = await superagent
        .post("http://139.59.47.49:4004/api/upload/image")
        .send(formdata);

      return response.body.filename;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const createPost = async (event) => {
    try {
      event.preventDefault();
      let filename = await uploadImg();

      let payload = {
        post: imgCaption,
        background: filename,
      };

      const apiRes = await superagent
        .post("http://139.59.47.49:4004/api/post")
        .send(payload);

      setPostData((prevItems) => [apiRes.body, ...prevItems]);
      console.log("Post created successfully:", apiRes.body);
      getData();
      setImageFile([]);
      setImgCaption("");

      toast.success("Post Created Successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error While Creating Post");
    }
  };

  return (
    <InfiniteScroll
      dataLength={postData.length}
      next={fetchMoreData}
      hasMore={hasMore}
      // loader={<Loader />}
    >
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

      <div className="container filter-comp">
        <div className="row ">
          <div className="col-6">
            <button
              className="all-posts btn btn-primary"
              style={{ borderRadius: "20px" }}
              onClick={() => getData()}>
              All Posts
            </button>
          </div>
          <div className="col-5">
            <div>
              <h5 style={{ textAlign: "center" }}>
                Filter through your posts {"-->"}
              </h5>
            </div>
          </div>
          <div className="col-1 ms-auto">
            <button
              style={{ border: "none", backgroundColor: "white" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              <img
                src={FILTER_IMG}
                style={{ height: "26px", width: "23px" }}></img>
            </button>
          </div>
        </div>
      </div>

      {!postData?.length ? (
        <Shimmer />
      ) : (
        (isFiltered ? filteredData : postData)?.map((item) => (
          <Card
            key={item.id}
            imgURL={item.background}
            caption={item.post}
            getData={getData}
            id={item.id}
          />
        ))
      )}

      {/* post modal */}
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
                          onChange={(e) =>
                            setImageFile(e.target.files)
                          }></input>
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
                      src={
                        imageFile.length && URL?.createObjectURL(imageFile[0])
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

      {/* Filter Modal */}

      <div
        className="modal fade filterModal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Select Date
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body date">
              <input
                type="date"
                id="datepicker"
                name="datepicker"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                style={{ border: "none" }}></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() =>
                  setFilterDate(new Date().toISOString().split("T")[0])
                }>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => getFilteredData(filterDate)}>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </InfiniteScroll>
  );
};

export default Body;
