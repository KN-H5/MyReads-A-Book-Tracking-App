import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'semantic-ui-react';

import * as LibraryHelper from './utils/LibraryHelper';
import * as BooksAPI from './api/BooksAPI';

import MenuTop from './components/MenuTop';
import Shelve from './components/Shelve';
import Search from './components/Search';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import LoadingIndicator from './components/LoadingIndicator';

import './App.css';

class App extends Component {
    state = {
        loading: true,
        currentlyReadingShelf: [],
        wantToReadShelf: [],
        readShelf: [],
        noneShelf: [],
        library: []
    }

    getAllBooks() {
        this.setState({ loading: true });

        BooksAPI.getAll().then(books => {
            const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
            const wantToRead = books.filter(book => book.shelf === 'wantToRead');
            const readShelf = books.filter(book => book.shelf === 'read');
            this.setState({
                loading: false,
                currentlyReadingShelf: currentlyReading,
                wantToReadShelf: wantToRead,
                readShelf: readShelf,
                library: books
            });
        })
    }



    componentDidMount() {
        this.getAllBooks();
    }

    moveBook = (book, newShelf, oldShelf) => {
        if (book && newShelf.length && oldShelf.length) {
            this.setState({ loading: true });

            BooksAPI.update(book, newShelf).then(response => {

                const deleteBookFromShelf = () => {
                    this.setState({
                        [oldShelf + 'Shelf']: this.state[oldShelf + 'Shelf'].filter(item => item.id !== book.id)
                    });
                }

                const addBookToShelf = () => {
                    this.setState({
                        [newShelf + 'Shelf']: this.state[newShelf + 'Shelf'].concat(book)
                    });
                }

                const updateLibrary = () => {
                    this.setState({
                        library: this.state.library.filter((item) => item.id !== book.id).concat(book)
                    });
                }

                deleteBookFromShelf();
                addBookToShelf();
                updateLibrary();

                this.setState({ loading: false });

                this.notifyMovedBook(book, newShelf, oldShelf);
            });
        }
    }

    notifyMovedBook = (book, newShelf, oldShelf) => toast(`“${book.title}” was moved from “${LibraryHelper.getTextByShelfValue(oldShelf)}” to “${LibraryHelper.getTextByShelfValue(newShelf)}”.`)

    render() {
        const {
            loading,
            currentlyReadingShelf,
            wantToReadShelf,
            readShelf,
            library
        } = this.state;

        const total = currentlyReadingShelf.length + wantToReadShelf.length + readShelf.length;

        return (
            <div className="app">
                <MenuTop />
                <Switch>
                    <Route exact path='/' render={() => (
                        <Container as='main' id='content' className='content content--home'>
                            <Shelve title='Currently Reading' books={currentlyReadingShelf} shelf='currentlyReading' total={total} onMoveBook={this.moveBook} />
                            <Shelve title='Want to Read' books={wantToReadShelf} shelf='wantToRead' total={total} onMoveBook={this.moveBook} />
                            <Shelve title='Read' books={readShelf} shelf='read' total={total} onMoveBook={this.moveBook} />
                        </Container>
                    )}/>
                    <Route exact path='/search' render={() => (
                        <Container as='main' id='content' className='content content--search'>
                            <Search library={library} onMoveBook={this.moveBook} />
                        </Container>
                    )} />
                    <Route exact path='/404' render={() => (
                        <Container as='main' id='content' className='content content--not-found'>
                            <NotFound />
                        </Container>
                    )} />
                    <Redirect from='*' to='/404' />
                </Switch>
                <Footer />
                {loading === true && (<LoadingIndicator />)}
                <ToastContainer autoClose={8000} position='bottom-right'/>
            </div>
        );
    }
}

export default App;
