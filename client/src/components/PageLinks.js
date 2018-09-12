import React from 'react';
import { Link } from 'react-router-dom';

const PageLinks = () => {
  return (
    <div className="row d-flex justify-content-center pt-3 pb-3">
      <div className="col-auto mr-2">
        <PageLink path="/" name="Home" />
      </div>
      <div className="col-auto ml-2">
        <PageLink path="/saved" name="Saved" />
      </div>
    </div>
  )
}

const PageLink = (props) => {
  return (
    <div>
      <Link to={props.path}><button className={`btn btn-outline-info ${window.location.pathname === props.path ? "active" : null}`}>{props.name}</button></Link>
    </div>
  )
}

export default PageLinks;