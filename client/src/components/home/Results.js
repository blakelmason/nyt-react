import React from 'react';

const Results = (props) => {

  const articles = props.articles.map((article, i) =>
    <div className="row border border-dark rounded mx-2 my-4 p-3 text-center bg-light" key={i}>
      <div className="col-12">
        <h4 className="d-inline">{article.title}</h4>
      </div>
      <div className="col-12 font-italic py-2">
        {article.date.substring(0, 10)}
      </div>
      <div className="col-12" style={{ minWidth: '0px', wordBreak: 'break-all' }}>
        <a href={article.url}>{article.url}</a>
      </div>
      <div className="col-12 d-flex justify-content-center">
        <button className="btn btn-outline-primary btn-block mt-3" style={{ maxWidth: '400px' }} onClick={() => props.saveArticle(i)}>Save</button>
      </div>
    </div>
  )

  if (props.articles.length === 0) {
    return (
      <div className="container animated fadeInDown">
        <div className="row">
          <div className="col bg-light border border-dark rounded-top rounded-bottom mb-0 mb-sm-5 mx-0 mx-sm-0 text-center">
            <h1>No Results</h1>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container animated fadeInDown">
        <div className="row">
          <div className="col bg-secondary border border-dark rounded-top rounded-bottom mb-0 mb-sm-5 mx-0 mx-sm-0">
            <div className="row bg-light rounded-top">
              <div className="col border-bottom border-dark py-3 text-center text-center">
                <h4 className="mb-0">Results</h4>
              </div>
            </div>
            {articles}
          </div>
        </div>
      </div>
    )
  }
}


export default Results;