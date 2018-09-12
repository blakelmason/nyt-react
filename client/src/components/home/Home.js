import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//components
import Search from './Search';
import Results from './Results';

class Home extends React.Component {

  state = {
    topic: '',
    start: '',
    end: '',
    articles: null,
    modal: false
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })
  }

  searchNyt(e) {
    this.setState({
      articles: null
    })

    //form validation using bootstrap 4
    const form = document.getElementById('search-form');
    e.preventDefault();
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
    } else if (form.classList.contains('was-validated')) {
      form.classList.remove('was-validated');
    } else if (form.checkValidity() === true) {

      //axios request
      axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
        params: {
          'api-key': '732f4e5a12654bb192d4e33829e2d0bc',
          'q': this.state.topic,
          'begin_date': this.state.start + '0101',
          'end_date': this.state.end + '1231'
        }
      })
        .then(response => {
          console.log(response);
          this.renderResults(response);
        })
        .catch(error => {
          console.error(error);
          this.setState({
            articles: []
          })
        })
    }
  }

  renderResults(response) {
    const articles = [];
    response.data.response.docs.forEach((elem) => {
      const data = {
        title: elem.headline.main,
        date: elem.pub_date,
        url: elem.web_url
      }
      articles.push(data);
    })
    this.setState({
      articles: articles
    })
  }

  saveArticle(i) {
    const article = this.state.articles[i];
    const self = this;
    axios.post('/new-article', article)
      .then(function (response) {
        console.log(response);
        self.toggle();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    this.toggle = this.toggle.bind(this);
    return (
      <div className="animated fadeIn">
        <Search searchNyt={this.searchNyt.bind(this)}
          topic={this.state.target}
          start={this.state.start}
          end={this.state.end}
          handleChange={this.handleChange.bind(this)}
        />
        {this.state.articles ? <Results articles={this.state.articles} saveArticle={this.saveArticle.bind(this)} /> : null}
        <div>
          <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Saved</ModalHeader>
            <ModalBody>
              Your article has been saved!
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}


export default Home;