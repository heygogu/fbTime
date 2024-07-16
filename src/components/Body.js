import { useEffect, useState } from "react";
import superagent from "superagent";
import toast, { Toaster } from "react-hot-toast";
import Shimmer from "./Shimmer";
import Filter from "./Filter.js";
import Card from "./Card";
import Upload from "./Upload.js";
import InfiniteScroll from "react-infinite-scroll-component";
import UploadModal from "../modals/UploadModal.js";
import FilterModal from "../modals/FilterModal.js";

const Body = () => {
  // All States
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

  useEffect(() => {
    getData();
  }, []);

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
        `http://139.59.47.49:4004/api/posts?limit=8&start=1&orderby=0`
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
      hasMore={hasMore}>
      {/* Upload Component */}
      <Upload />

      {/* Filter Component */}
      <Filter getData={getData} />

      {/* Cards Getting Rendered */}
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

      {/* Upload/Post Modal */}

      <UploadModal
        imgCaption={imgCaption}
        setImgCaption={setImgCaption}
        imageFile={imageFile}
        setImageFile={setImageFile}
        createPost={createPost}
      />

      {/* Filter Modal */}

      <FilterModal
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        getFilteredData={getFilteredData}
      />

      <Toaster />
    </InfiniteScroll>
  );
};

export default Body;
