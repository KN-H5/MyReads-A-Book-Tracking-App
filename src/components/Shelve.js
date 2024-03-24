import React from 'react';
import { Card, Header, Icon, Label, Segment } from 'semantic-ui-react';
import BookCard from './BookCard';
import * as LibraryHelper from '../utils/LibraryHelper';

function Shelve(props) {

    const {
        books,
        total,
        shelf,
        title,
        onMoveBook
    } = props;

    if (!books.length) {
        return (
            <Segment basic as='section' className='shelve'>
                <Label color='black' ribbon='right'>empty shelf</Label>
                <Header inverted dividing as='h2'><Icon name={LibraryHelper.getIconByShelfValue(shelf)} />{title} - empty</Header>
                <Header inverted size='medium' content='There are no books in this shelf.' />
            </Segment>
        );
    } else {
        return (
            <Segment basic as='section' className='shelve'>
                <Label color='black' ribbon='right'>{books.length + ' of ' + total + ' books'}</Label>
                <Header inverted dividing as='h2'><Icon name={LibraryHelper.getIconByShelfValue(shelf)} />{title}</Header>
                <Card.Group centered>
                    {books.map(book => (
                        <BookCard book={book} key={book.id} onMoveBook={onMoveBook} />
                    ))}
                </Card.Group>
            </Segment>
        );
    }

}

export default Shelve;
