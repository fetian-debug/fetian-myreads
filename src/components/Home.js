import React, { Component } from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

// HOME 
class Home extends Component {
  getShelvesFromBooks = (books) => {
    // create const currently reading to filter books => currently Reading
    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    
    // create const wantToRead to filter books => want to read
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    // create const read to filter books => read
    const read = books.filter((book) => book.shelf === "read");

    // Objects Shelf Title
    return [
      {
        id: 1,
        title: "Currently Reading",
        books: currentlyReading,
      },
      {
        id: 2,
        title: "Want To Read",
        books: wantToRead,
      },
      {
        id: 3,
        title: "Read",
        books: read,
      },
    ];
  };

  render() {
    // const shelves => param props books
    const shelves = this.getShelvesFromBooks(this.props.books);
    const { onChangeBookShelf } = this.props;

    return (
      // home page
      <div className="list-books">
        <div className="list-books-title">
          <h1>Fetian Reads</h1>
        </div>
        <div className="list-books-content">
          {shelves.length > 0 &&
            shelves.map((shelf) => (
              <BookShelf
                key={shelf.id}
                books={shelf.books}
                shelfTitle={shelf.title}
                onChangeBookShelf={onChangeBookShelf}
              />
            ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;

