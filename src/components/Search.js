import React, { useState, useEffect } from 'react';
import { Card, Icon, Header, Input, Label, Segment } from 'semantic-ui-react';

import * as Utils from '../utils/Utils';
import * as BooksAPI from '../api/BooksAPI';

import BookCard from './BookCard';
import LoadingIndicator from './LoadingIndicator';

const Search = ({ library, onMoveBook }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [queriedBooks, setQueriedBooks] = useState([]);
    const [countQueriedBooks, setCountQueriedBooks] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const updateSearchQuery = (event, data) => {
        const query = data.value.trim();
        if (query.length) {
            setSearchQuery(query);
            getQueriedBooks(query);
        } else {
            resetSearch();
        }
    };

    const getQueriedBooks = (query) => {
        BooksAPI.search(query).then((queriedBooks) => {
            const countQueriedBooks = queriedBooks.length;
            setQueriedBooks(queriedBooks);
            setCountQueriedBooks(countQueriedBooks);
        });
    };

    const resetSearch = () => {
        setSearchQuery('');
        setQueriedBooks([]);
        setCountQueriedBooks(0);
        setLoading(false);
    };

    const renderLabel = (searchQuery) => (
        <Label color='black' ribbon='right'>{searchQuery ? searchQuery : 'no query'}</Label>
    );

    if (queriedBooks && queriedBooks.length) {
        let updatedBooks = Utils.mergeArray(queriedBooks, library, 'id'); /* overwrite queried books with those already in library*/

        return (
            <Segment basic as='section' className='search'>
                {renderLabel(searchQuery)}
                <Header inverted dividing as='h2'><Icon name='book' />{countQueriedBooks} books found for query “{searchQuery}”</Header>
                <Segment basic>
                    <Input
                        onChange={updateSearchQuery}
                        size='massive'
                        fluid
                        icon={{ name: 'search', circular: true }}
                        placeholder='Search&hellip;'
                    />
                </Segment>
                <Card.Group centered>
                    {updatedBooks.map(book => (
                        <BookCard book={book} key={book.id} onMoveBook={onMoveBook} />
                    ))}
                </Card.Group>
                {loading && (<LoadingIndicator />)}
            </Segment>
        );
    } else {
        return (
            <Segment basic as='section' className='search'>
                {renderLabel(searchQuery)}
                <Header inverted dividing as='h2'><Icon name='search' />Search</Header>
                <Segment basic>
                    <Input
                        onChange={updateSearchQuery}
                        size='massive'
                        fluid
                        icon={{ name: 'search', circular: true }}
                        placeholder='Search&hellip;'
                    />
                    <Header
                        inverted
                        size='medium'
                        content={
                            searchQuery ?
                                `There are no books that match your query “${searchQuery}”.` :
                                'Please enter a search string.'
                        }
                    />
                </Segment>
                {loading && (<LoadingIndicator />)}
            </Segment>
        );
    }
};

export default Search;
