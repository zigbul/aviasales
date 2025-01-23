import { FC, FormEvent, useState } from 'react';

import './SearchBar.scss';

import { isValidIATACode, isValidData } from '../../utils/validation.tsx';

import { setParams } from '../../redux/slices/ticketsSlice.ts';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';

const SearchBar: FC = () => {
  const { params } = useSelector((state: RootState) => state.tickets);
  const dispatch = useDispatch<AppDispatch>();

  const [originLocationCode, setOrigin] = useState('');
  const [destinationLocationCode, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFields()) {
      dispatch(
        setParams({
          ...params,
          originLocationCode,
          destinationLocationCode,
          departureDate,
        }),
      );

      clearForm();
    }
  };

  const validateFields = (): boolean => {
    const validationErrors: Record<string, string> = {};

    if (!isValidIATACode(originLocationCode)) {
      validationErrors.originLocationCode = 'Код аэропорта должен состоять из 3 латинских букв.';
    }

    if (!isValidIATACode(destinationLocationCode)) {
      validationErrors.destinationLocationCode =
        'Код аэропорта должен состоять из 3 латинских букв.';
    }

    if (!isValidData(departureDate)) {
      validationErrors.departureDate = 'Дата должна быть не раньше сегодняшнего числа.';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const clearForm = () => {
    setOrigin('');
    setDestination('');
    setDepartureDate('');
  };

  const isDisabled = !(originLocationCode && destinationLocationCode && departureDate);

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        className="search-bar__text-input"
        type="text"
        placeholder="Откуда (IATA код)"
        value={originLocationCode}
        onChange={(e) => setOrigin(e.target.value.toUpperCase())}
      />
      {errors.originLocationCode && <ErrorMessage>{errors.originLocationCode}</ErrorMessage>}
      <input
        className="search-bar__text-input"
        type="text"
        placeholder="Куда (IATA код)"
        value={destinationLocationCode}
        onChange={(e) => setDestination(e.target.value.toUpperCase())}
      />
      {errors.destinationLocationCode && (
        <ErrorMessage>{errors.destinationLocationCode}</ErrorMessage>
      )}
      <input
        className="search-bar__date-input"
        type="date"
        placeholder="Дата вылета"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
      />
      {errors.departureDate && <ErrorMessage>{errors.departureDate}</ErrorMessage>}
      <button className="search-bar__submit-button" type="submit" disabled={isDisabled}>
        Поиск
      </button>
    </form>
  );
};

export default SearchBar;
