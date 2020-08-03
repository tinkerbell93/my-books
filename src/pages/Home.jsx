import React from 'react';
import withAuth from '../hocs/withAuth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Counter from '../components/Counter';
import Example9 from '../components/Example9';
import PersonContext from '../context/PersonContext';
import {
  LoadingOutlined,
  HomeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import '../css/home.scss';

class Home extends React.Component {
  static contextType = PersonContext;
  state = {
    books: [],
    loading: false,
    error: null,
    mainBook: [],
    mainBookTitle: '',
    mainBookauthor: '',
    mainBookMessage: '',
    mainBookLink: '',
  };
  render() {
    console.log(this.state.mainBookLink);
    return (
      <div className="home-wrapper">
        <div className="center">
          <h1 className="a11y-hidden">HOME</h1>
          <h2>Book List</h2>
          {this.state.error && <h3>에러다!!!</h3>}

          <div className="book-wrapper">
            <div className="left">
              {/* 초기화 */}
              {this.state.loading && (
                <div className="loading-wrapper">
                  <LoadingOutlined />
                </div>
              )}
              {!this.state.mainBookTitle &&
                this.state.books.map((book, index) => {
                  if (index !== 0) return;
                  return (
                    <div>
                      {this.state.loading && (
                        <div className="loading-wrapper">
                          <LoadingOutlined />
                        </div>
                      )}
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <p>{book.message}</p>
                      <div className="button-wrapper">
                        <a href={book.url} target="_blank">
                          <HomeOutlined />
                        </a>
                        <button>
                          <EditOutlined />
                        </button>
                        <button>
                          <DeleteOutlined />
                        </button>
                      </div>
                    </div>
                  );
                })}
              <div className={!this.state.mainBookTitle ? 'none' : ''}>
                <h3>{this.state.mainBookTitle}</h3>
                <p>{this.state.mainBookauthor}</p>
                <p>{this.state.mainBookMessage}</p>
                <div className="button-wrapper">
                  <a href={this.state.mainBookLink} target="_blank">
                    <HomeOutlined />
                  </a>
                  <button>
                    <EditOutlined />
                  </button>
                  <button>
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
            <div className="back-img right">
              <span></span>
            </div>
          </div>
          <ul>
            {this.state.error === null &&
              this.state.books.map((book, index) => (
                <li>
                  <span>{index + 1}</span>
                  <p className="title">{book.title}</p>
                  <p className="author">{book.author}</p>
                  <p className="message">{book.message}</p>
                  <a className="link" href={book.url}>
                    link
                  </a>
                  <button
                    onClick={this.changeMainbook}
                    className="click"
                  ></button>
                </li>
              ))}
          </ul>
          <p>{JSON.stringify(this.context)}</p>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    // API 를 요청해서 책 리스트를 가져온다.
    // url => 'https://api.marktube.tv/v1/book'
    // token
    // localStorage.getItem('token') => this.props.token

    // 로딩 시작
    this.setState({
      loading: true,
      error: null,
    });
    try {
      await sleep(0);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      console.log(response.data);
      const books = response.data;
      this.setState({ books, loading: false, error: null });
    } catch (error) {
      this.setState({
        loading: false,
        error,
      });
      console.log(error);
    }
  }

  changeMainbook = async (e) => {
    const mainBook = [...e.target.parentNode.children].map(
      (list) => list.textContent,
    );
    const mainBookLink = e.target.parentNode.children[4].href;
    console.log(mainBookLink);

    this.setState({
      mainBookTitle: mainBook[1],
      mainBookauthor: mainBook[2],
      mainBookMessage: mainBook[3],
      mainBookLink,
    });
  };
}

export default withAuth(Home);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
