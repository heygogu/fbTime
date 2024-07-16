const DeleteModal=({id,deleteData})=>{
    return (
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

    )
}
export default DeleteModal;