import React from 'react';

const Search = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col bg-light border border-dark rounded mt-3 mb-5 mt-sm-5 mx-3 mx-sm-0 pb-3">
          <div className="row">
            <div className="col border-bottom border-dark py-3 text-center">
              <h4 className="mb-0">Search</h4>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <form className="needs-validation" id="search-form" noValidate>
                <div className="form-group">
                  <label htmlFor="topic">Topic</label>
                  <input value={props.topic} onChange={props.handleChange} name="topic" id="topic" type="text" className="form-control" placeholder="Search Topic" required />
                  <div className="invalid-feedback">Please enter a topic.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="start-year">Start Year (back to 1851)</label>
                  <input value={props.start} onChange={props.handleChange} name="start" id="start-year" type="number" className="form-control" placeholder="Start" required />
                  <div className="invalid-feedback">Please enter a start date.</div>
                </div>
                <div className="form-group">
                  <label htmlFor="end-year">End Year</label>
                  <input vlaue={props.end} onChange={props.handleChange} name="end" id="end-year" type="number" className="form-control" placeholder="End" required />
                  <div className="invalid-feedback">Please enter an end date.</div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={props.searchNyt}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search;