import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import axios from "axios";

// SEARCH
class Search extends Component {
  state = {
    query: "",
    books: [],
  };

  // To cancel request
  cancelRequest = null;

  getSearchedBooks = async (searchText) => {
    // try search books using terms
    try {

      const searchedBooks = await BooksAPI.search(
        searchText,
        this.cancelRequest
      );
      if (searchedBooks.error) {
        return [];
      } else if (searchedBooks) {
        const updatedBooks = this.updateShelvesInBooks(searchedBooks);
        return updatedBooks;
      }
    } catch (error) {
      // if catch error print in console
      console.log('msg error: ',error)
    }
  };

  // To update Shelves 
  updateShelvesInBooks(searchedBooks) {
    const { books } = this.props;
    const updatedBooks = searchedBooks.map((searchedBook) => {
      books.forEach((homeBook) => {
        // if home Book == search Book
        if (homeBook.id === searchedBook.id) {
          // add book in home book
          searchedBook.shelf = homeBook.shelf;

        }
      });
      if (!searchedBook.shelf) searchedBook.shelf = "none";
      return searchedBook;
    });
    return updatedBooks;
  }
  // handel cancel request
  cancelOrInitializeRequest = () => {
    if (this.cancelRequest !== null) {
      this.cancelRequest.cancel(
        "The request is cancelled."
      );
    }
    this.cancelRequest = axios.CancelToken.source();
  };

  handleQueryChange = async (event) => {
    const searchQuery = event.target.value;
    this.setState({ query: searchQuery });
    this.cancelOrInitializeRequest();
    if (searchQuery === "") {
      this.setState({ books: [] });
    } else if (searchQuery) {
      const searchedBooks = await this.getSearchedBooks(searchQuery);
      if (searchedBooks && searchedBooks.length > 0) {
        this.setState({ books: searchedBooks });
      } else {
        this.setState({ books: [] });
      }
    }
  };

  render() {
    // const onChange BookShelf
    const { onChangeBookShelf } = this.props;
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.query}
              onChange={this.handleQueryChange}
              placeholder="Search by title like: Education, Everything,Production, Programming, React, Virtual Reality, Web Development
              "
            />
          </div>
          <p></p>
          
          
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length === 0 ? (
              <li />
            ) : (
              books.map((book) => (
                <li key={book.id}>
                  <Book book={book} onChangeBookShelf={onChangeBookShelf} />
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
