import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface Props {
  favourites: {
    [k: string]: {
      date: string,
      explanation: string,
      title: string,
      url: string,
    }
  },
  onDeleteFavourite: Function,
  onDeleteAllFavourites: Function,
  onPictureDetails: Function,
}

const Favourites: React.FunctionComponent<Props> = ({ favourites, onDeleteFavourite, onDeleteAllFavourites, onPictureDetails }) => {
  const [show, setShow] = useState(false);
  const renderFavourites = () => {
    let favouritesArr: any = [];
    if (favourites) {
      for (const fav in favourites) {
        const favourite = favourites[fav];
        favouritesArr.push(
          <div className="card mr-4" style={{ width: '18rem', marginRight: "10px" }} key={favourite.date}>
            <div className="card-body">
              <h5 className="card-title">{favourite.title}</h5>
              <p className="card-text">{favourite.explanation.slice(0, 70)}...</p>
              <button className="btn btn-outline-danger mr-4" onClick={() => onDeleteFavourite(favourite.date)}>Delete</button>
              <button className="btn btn-outline-primary" onClick={() => onPictureDetails(favourite.date)}>View</button>
            </div>
          </div>
        )
      }
    }
    return favouritesArr;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onClickYes = () => {
    handleClose()
    onDeleteAllFavourites()
  }

  return (
    <div className="mt-4">
      <div className="card-group">
        {renderFavourites()}
      </div>
      <div className="row mt-4 ml-3" style={{ marginBottom: '20px' }}>
        {Object.keys(favourites).length > 0 && <Button id="delete-all" variant="outline-danger" onClick={handleShow} disabled={Object.keys(favourites).length === 0}>Delete all</Button>}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete all your favourited pictures?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="outline-danger" onClick={onClickYes}>
              Yes
          </Button>
          </Modal.Footer>
        </Modal> 
      </div>
    </div>
  )
}

export default Favourites;
