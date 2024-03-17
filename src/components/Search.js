import React, { Component } from 'react';
import { Card, Icon, Header, Input, Label, Segment } from 'semantic-ui-react';

import * as Utils from '../utils/Utils';
import * as BooksAPI from '../api/BooksAPI';

import BookCard from './BookCard';
import LoadingIndicator from './LoadingIndicator';

class Search extends Component {
    state = {
        searchQuery: '',
        queriedBooks: [],
        countQueriedBooks: 0,
        loading: true
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    updateSearchQuery = (event, data) => {
        const query = data.value.trim();
        if (query.length) {
            this.setState({
                searchQuery: query
            });
            this.getQueriedBooks(query);
        } else {
            this.resetSearch();
        }
    }

    getQueriedBooks = (query) => {
        BooksAPI.search(query).then((queriedBooks) => {
            const countQueriedBooks = queriedBooks.length;
            this.setState({
                queriedBooks: queriedBooks,
                countQueriedBooks: countQueriedBooks
            });
        });
    }

    resetSearch() {
        this.setState({
            searchQuery: '',
            queriedBooks: [],
            countQueriedBooks: 0,
            loading: false
        });
    }

    renderLabel(searchQuery) {
        return (
            <Label color='black' ribbon='right' >{searchQuery ? searchQuery : 'no query'}</Label >
        )
    }

    render() {
        const { library, onMoveBook } = this.props;
        const { countQueriedBooks, loading, searchQuery, queriedBooks } = this.state;

        if (queriedBooks && queriedBooks.length) {

            let updatedBooks = Utils.mergeArray(queriedBooks, library, 'id'); /* overwrite queried books with those already in library*/

            return (
                <Segment basic as='section' className='search'>
                    {this.renderLabel(searchQuery)}
                    <Header inverted dividing as='h2'><Icon name='book' />{countQueriedBooks} books found for query “{searchQuery}”</Header>
                    <Segment basic>
                        <Input
                            onChange={this.updateSearchQuery}
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
                    {loading === true && (<LoadingIndicator />)}
                </Segment>
            );
        } else {
            return (
                <Segment basic as='section' className='search'>
                    {this.renderLabel(searchQuery)}
                    <Header inverted dividing as='h2'><Icon name='search' />Search</Header>
                    <Segment basic>
                        <Input
                            onChange={this.updateSearchQuery}
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
                    {loading === true && (<LoadingIndicator />)}
                </Segment>
            );
        }
    }
}

export default Search;
