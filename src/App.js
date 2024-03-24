import React, { useState, useEffect } from "react";
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

const App = () => {

    const [loading, setLoading] = useState(true);
    const [currentlyReadingShelf, setCurrentlyReadingShelf] = useState([]);
    const [wantToReadShelf, setWantToReadShelf] = useState([]);
    const [readShelf, setReadShelf] = useState([]);
    const [library, setLibrary] = useState([]);

    const getAllBooks = () => {
        setLoading(true);

        BooksAPI.getAll().then(books => {
            const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
            const wantToRead = books.filter(book => book.shelf === 'wantToRead');
            const read = books.filter(book => book.shelf === 'read');

            console.log(read)
            setCurrentlyReadingShelf(currentlyReading);
            setWantToReadShelf(wantToRead);
            setReadShelf(read);
            setLibrary(books);
            setLoading(false);
        });
    };
    useEffect(() => {
        getAllBooks()
    }, []);

    const moveBook = (book, newShelf, oldShelf) => {
        if (book && newShelf.length && oldShelf.length) {
            setLoading(true);

            BooksAPI.update(book, newShelf).then(response => {
                const deleteBookFromShelf = () => {
                    switch (oldShelf) {
                        case 'currentlyReading':
                            setCurrentlyReadingShelf(prevShelf => prevShelf.filter(item => item.id !== book.id));
                            break;
                        case 'wantToRead':
                            setWantToReadShelf(prevShelf => prevShelf.filter(item => item.id !== book.id));
                            break;
                        case 'read':
                            setReadShelf(prevShelf => prevShelf.filter(item => item.id !== book.id));
                            break;
                        default:
                            break;
                    }
                };

                const addBookToShelf = () => {
                    switch (newShelf) {
                        case 'currentlyReading':
                            setCurrentlyReadingShelf(prevShelf => [...prevShelf, book]);
                            break;
                        case 'wantToRead':
                            setWantToReadShelf(prevShelf => [...prevShelf, book]);
                            break;
                        case 'read':
                            setReadShelf(prevShelf => [...prevShelf, book]);
                            break;
                        default:
                            break;
                    }
                };

                const updateLibrary = () => {
                    setLibrary(prevLibrary => prevLibrary.filter(item => item.id !== book.id).concat(book));
                };

                deleteBookFromShelf();
                addBookToShelf();
                updateLibrary();

                setLoading(false);

                notifyMovedBook(book, newShelf, oldShelf);
            });
        }
    };

    const notifyMovedBook = (book, newShelf, oldShelf) =>
        toast(`“${book.title}” was moved from “${LibraryHelper.getTextByShelfValue(oldShelf)}” to “${LibraryHelper.getTextByShelfValue(newShelf)}”.`);

    const total = currentlyReadingShelf.length + wantToReadShelf.length + readShelf.length;

    return (
        <div className="app">
            <MenuTop />
            <Switch>
                <Route exact path="/">
                    <Container as="main" id="content" className="content content--home">
                        <Shelve title="Currently Reading" books={currentlyReadingShelf} shelf="currentlyReading" total={total} onMoveBook={moveBook} />
                        <Shelve title="Want to Read" books={wantToReadShelf} shelf="wantToRead" total={total} onMoveBook={moveBook} />
                        <Shelve title="Read" books={readShelf} shelf="read" total={total} onMoveBook={moveBook} />
                    </Container>
                </Route>
                <Route exact path="/search">
                    <Container as="main" id="content" className="content content--search">
                        <Search library={library} onMoveBook={moveBook} />
                    </Container>
                </Route>
                <Route exact path="/404">
                    <Container as="main" id="content" className="content content--not-found">
                        <NotFound />
                    </Container>
                </Route>
                <Redirect from="*" to="/404" />
            </Switch>
            <Footer />
            {loading === true && <LoadingIndicator />}
            <ToastContainer autoClose={8000} position="bottom-right" />
        </div>
    );
};

export default App;
