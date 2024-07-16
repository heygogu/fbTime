import FILTER_IMG from "../assets/icons/filters.png";
const Filter=({getData})=>{
    return (
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

    )
}
export default Filter;