import React from "react";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";
import { Route } from "react-router-dom";
import MainPage from "./MainPage";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    });
  }

    moveShelf = ( newBook, newShelf ) => {
    BooksAPI.update(newBook, newShelf).then(() =>{

      newBook.shelf = newShelf

      let updatedBooks = this.state.books.filter( book => book.id !== newBook.id )

      updatedBooks.push(newBook);
      this.setState({ books: updatedBooks })
    })

  };

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <MainPage books={this.state.books} moveShelf={this.moveShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage moveShelf={this.moveShelf} books={this.state.books} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
