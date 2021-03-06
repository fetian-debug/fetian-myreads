import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Home from "./components/Home";
import Search from "./components/Search";
import { BrowserRouter as Router, Route } from "react-router-dom";

// APP
class BooksApp extends React.Component {
  state = {
    books: [],
  };

  // To Get Books
  componentDidMount() {
    this.getBooks();
  }

  // Async API
  getBooks = async () => {
    const receivedBooks = await BooksAPI.getAll();
    this.setState({ books: receivedBooks });
  };

  // Async books
  updateBook = async (id, shelfTitle) => {
    await BooksAPI.update(id, shelfTitle);
    this.getBooks();
  };
  // Async Shelf
  changeBookShelf = async (bookId, shelfTitle) => {
    this.updateBook(bookId, shelfTitle);
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Route exact path="/">
            <Home
              books={this.state.books}
              onChangeBookShelf={this.changeBookShelf}
            />
          </Route>
          <Route path="/search">
            <Search
              books={this.state.books}
              onChangeBookShelf={this.changeBookShelf}
            />
          </Route>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
