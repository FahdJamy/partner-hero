import React, { useState, useEffect } from 'react';
import Favourites from '../components/Favourites';
import Picture from '../components/Picture';
import { useDispatch, useSelector } from 'react-redux';
import {getPicture} from '../store/actions';
import { ROOT_STATE } from '../store';

interface Picture {
  date: string,
  explanation: string,
  title: string,
  url: string,
}

const App = () => {
  const nowDate = new Date();
  const [date, setDate] = useState(nowDate);
  const dispatch = useDispatch();
  const storeData = useSelector((state: ROOT_STATE) => state);
  const [disableNext, setDisableNext] = useState(true);
  let favouritedPictures = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites") as string) : {};
  const [favourites, setFavourites] = useState(favouritedPictures);

  const nextImageHandler = () => {
    const nextDate = new Date(date.setDate(date.getDate() + 1));
    const frmtNextDate = `${nextDate.getFullYear()}-${nextDate.getMonth()}-${nextDate.getDate()}`;
    const frmtNowDate = `${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDate()}`;
    if (frmtNextDate === frmtNowDate) {
      setDisableNext(true);
    }
    setDate(nextDate);
  }

  const onDeleteFavourite = (key: string) => {
    const favorites = JSON.parse(localStorage.getItem("favourites") as string);
    delete favorites[key];
    localStorage.setItem('favourites', JSON.stringify(favorites));
    setFavourites(JSON.parse(localStorage.getItem("favourites") as string));
  }

  const onDeleteAllFavourites = () => {
    localStorage.removeItem('favourites');
    setFavourites({});
  }

  const onPictureDetails = (date: string) => {
    setDate(new Date(date));
  }

  const maxDate = () => {
    return `${nowDate.getFullYear()}-${nowDate.getMonth() > 9 ? '' : '0'}${nowDate.getMonth()}-${nowDate.getDate()}`;
  }

  const onDateSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value))
  }

  const setFavorite = (picture: Picture, dateVal: string) => {
    let userFavourites = localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites") as string): {};
    const favorites = {...userFavourites, [dateVal]: picture};
    localStorage.setItem('favourites', JSON.stringify(favorites));
    setFavourites(JSON.parse(localStorage.getItem("favourites") as string));
  }

  const previousImageHandler = () => {
    setDate(new Date(date.setDate(date.getDate() - 1)));
    setDisableNext(false);
  }

  useEffect(() => {
    const apiDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    dispatch(getPicture({apiDate}))
  }, [date])

  return (
    <div className="container">
      <Picture
        picture={storeData.picture.picture}
        maxDate={maxDate()}
        isLoading={storeData.picture.isLoading}
        favourites={favourites}
        disableNext={disableNext}
        setFavorite={setFavorite}
        onDateSelected={onDateSelected}
        nextImageHandler={nextImageHandler}
        previousImageHandler={previousImageHandler}
      />
      <div className="row">
        <Favourites
          favourites={favourites}
          onDeleteFavourite={onDeleteFavourite}
          onDeleteAllFavourites={onDeleteAllFavourites}
          onPictureDetails={onPictureDetails}
        />
      </div>
    </div>
  );
}

export default App;
