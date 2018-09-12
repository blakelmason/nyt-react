import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Saved extends React.Component {
  state = {
    articles: null,
    modal: false
  }

  componentDidMount() {
    this.getArticles();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getArticles() {
    axios.get('/articles')
      .then(response => {
        const articles = response.data.articles;
        console.log(articles);
        this.setState({
          articles: articles
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteArticle(id) {
    const self = this;
    axios.delete('/delete-article', { data: { id: id } })
      .then(() => {
        self.toggle();
        self.getArticles();
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    this.toggle = this.toggle.bind(this);
    const articles = [];
    if (this.state.articles) {
      this.state.articles.forEach(elem => {
        articles.push(
          <div className="row border border-dark rounded mx-2 my-4 p-3 text-center bg-light" key={elem._id}>
            <div className="col-12">
              <h4 className="d-inline">{elem.title}</h4>
            </div>
            <div className="col-12 font-italic py-2">
              {elem.date.substring(0, 10)}
            </div>
            <div className="col-12" style={{ minWidth: '0px', wordBreak: 'break-all' }}>
              <a href={elem.url}>{elem.url}</a>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button className="btn btn-outline-primary btn-block mt-3" style={{ maxWidth: '400px' }} onClick={() => this.deleteArticle(elem._id)}>Delete</button>
            </div>
          </div>
        );
      })
    }

    return (
      <div className="container animated fadeIn">
        <div className="row">
          <div className="col bg-light border border-dark rounded mt-3 mb-0 mb-sm-5 mt-sm-5">
            <div className="row">
              <div className="col border-bottom border-dark py-3 text-center">
                <h4 className="mb-0">Saved Articles</h4>
              </div>
            </div>
            <div className="row">
              <div className="col bg-secondary">
                {articles}
              </div>
            </div>
          </div>
        </div>
        <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Deleted</ModalHeader>
          <ModalBody>
            Your article has been deleted!
            </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Saved;