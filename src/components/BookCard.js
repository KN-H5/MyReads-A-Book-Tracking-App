import React, { Component } from 'react';
import { Button, Card, Dropdown, Header, Image, Label, Modal } from 'semantic-ui-react';

import * as LibraryHelper from '../utils/LibraryHelper';
import * as Utils from '../utils/Utils';

import placeholderImage from '../img/placeholder-book-cover-128x189.png';

class BookCard extends Component {

    render() {

        // const book = this.props.book;

        const { book } = this.props;

        if (!book.shelf) {
            book.shelf = 'none';
        }

        const moveThisBook = (event, data) => {
            const newShelf = data.value;
            const oldShelf = data.defaultValue;
            const hasChanged = newShelf === oldShelf ? false : true;
            if (hasChanged) {
                book.shelf = newShelf;
                this.props.onMoveBook(book, newShelf, oldShelf);
            }
        }

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{book.title}</Card.Header>
                    <Card.Meta>{book.subtitle}</Card.Meta>
                </Card.Content>
                <Card.Content className='light-gradient'>
                    <Image centered className='book-cover-card-image' size='small' src={book.imageLinks ? book.imageLinks.thumbnail : placeholderImage} />
                </Card.Content>
                {book.authors && (
                    <Card.Content>
                        <Card.Description>
                            <p>Written by {book.authors.map(
                                (author, index) => {
                                    return index === 0 ?
                                        <strong key={'author-' + index}>“{author}”</strong> :
                                        <React.Fragment key={'author-' + index}> and <strong>“{author}”</strong></React.Fragment>
                                }
                            )}.</p>
                            {book.publisher && (
                                <p>Published by <strong>“{book.publisher}”</strong>{book.publishedDate ? ' in ' + book.publishedDate.slice(0, 4) : ''}.</p>
                            )}
                        </Card.Description>
                    </Card.Content>
                )}
                {book.categories && (
                    <Card.Content>
                        {book.categories.map(
                            (category, index) => {
                                return <Label tag size='mini' key={'cat-' + index}>{Utils.capitalizeString(category)}</Label>
                            }
                        )}
                    </Card.Content>
                )}
                {/* {book.industryIdentifiers[0].identifier && (
                    <Card.Content>
                        <Card.Description>
                            <p>BR {book.industryIdentifiers[0].identifier}</p>
                        </Card.Description>
                    </Card.Content>
                )} */}
                {book.description && (
                    <Card.Content>
                        <Modal dimmer='blurring' trigger={<Button basic content='Show description' fluid />} closeIcon>
                            <Modal.Header>Details</Modal.Header>
                            <Modal.Content image scrolling className='align-items-start'>
                                <Image className='book-cover-modal-image' size='small' src={book.imageLinks ? book.imageLinks.thumbnail : placeholderImage} />
                                <Modal.Description>
                                    <Header>{book.title} {book.subtitle ? ' – ' + book.subtitle : ''}</Header>
                                    <p>{book.description}</p>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </Card.Content>
                )}
                <Card.Content>
                    <Card.Description>
                        <Button as='a' basic fluid content='Show on Google Books' icon='external' href={book.previewLink} target='blank' />
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Description textAlign='center'>
                        Stored in shelf <Dropdown inline options={LibraryHelper.getShelvesDropdownOptions()} defaultValue={book.shelf} onChange={moveThisBook} />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra />
            </Card>
        )
    }
}

export default BookCard;
