const FilterModal = ({ filterDate, setFilterDate, getFilteredData }) => {
  return (
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
  );
};

export default FilterModal;
