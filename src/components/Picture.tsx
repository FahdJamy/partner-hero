import React from 'react';

interface Props {
  picture: {
    date: string,
    explanation: string,
    title: string,
    url: string,
  },
  maxDate: string,
  favourites: any,
  isLoading: boolean,
  disableNext: boolean,
  setFavorite: Function,
  onDateSelected: Function,
  nextImageHandler: Function,
  previousImageHandler: Function,
}

const Picture: React.FunctionComponent<Props> = ({ picture, isLoading, setFavorite, onDateSelected, maxDate, disableNext, previousImageHandler, nextImageHandler, favourites }) => {
  return (
    <div className="container">
      <h3 className="text-center mt-3">{picture.title}</h3>
      <div className="row align-items-center">
        <div className="col-md-2">
          <button className="btn btn-outline-primary btn-sm" onClick={() => previousImageHandler()}>Previous</button>
        </div>
        <div className="col-md-8">
          {!isLoading && <img src={picture.url} alt="Pic of the day" className="img-fluid" />}
          {isLoading && <div className="text-center">
            <div className="spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
        </div>
        <div className="col-md-2">
          <button className="btn btn-outline-primary btn-sm" onClick={() => nextImageHandler()} disabled={disableNext}>Next</button>
        </div>
      </div>
      <div className="row justify-content-between mt-4">
        <div className="col-4"><button className="btn btn-outline-primary btn-sm" onClick={() => setFavorite(picture, picture.date)} disabled={favourites[picture.date]}>
          {favourites[picture.date] ? 'Already set as favourite': 'Set Favourite'}
        </button>
        </div>
        <div className="col-4">
          <input type="date" value={picture.date || ''} className="form-control" onChange={(e) => onDateSelected(e)} max={maxDate} />
        </div>
      </div>
      <div className="row mt-4">
        {picture.explanation}
      </div>
    </div>
  );
}

export default Picture;
