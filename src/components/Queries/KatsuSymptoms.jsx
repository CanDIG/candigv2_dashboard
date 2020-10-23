import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import {
  Row, Button, InputGroup,
  InputGroupAddon, Col, Input,
} from 'reactstrap';
import Autosuggest from 'react-autosuggest';
import AutoSuggestStyle from '../../assets/css/StyledComponents/AutoSuggestStyled';

import { fetchIndividuals } from '../../api/api';
import Style from '../../assets/css/StyledComponents/ColumnControlStyled';
import {
  ProcessMetadata, ProcessSymptoms,
} from '../Processing/ChordSchemas';
import { notify, NotificationAlert } from '../../utils/alert';

import {
  trackPromise,
} from '../LoadingIndicator/LoadingIndicator';

function SearchBySymptom({ setSymptom }) {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [fetchedSuggestions, setFetchedSuggesions] = useState([]);

  const notifyEl = useRef(null);

  useEffect(() => {
    try {
      trackPromise(
        fetchIndividuals()
          .then((dataResponse) => {
            /* eslint-disable */
            const [_, phenopacketS] = ProcessMetadata(dataResponse.results);
            /* eslint-enable */
            ProcessSymptoms(phenopacketS).then((symptoms) => {
              console.log(symptoms);
              setFetchedSuggesions(symptoms);
            });
          })
          .catch(() => {
            notify(
              notifyEl,
              'The resources you requested were not available.',
              'warning',
            );
          }),
      );
    } catch (err) {
      // console.log(err)
    }
  }, []);

  // From https://github.com/moroshko/react-autosuggest#installation

  const getSuggestions = (input) => {
    const inputValue = input.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : fetchedSuggestions.filter((lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setSearch(newValue);
  };

  const inputProps = {
    placeholder: 'Symptom...',
    value,
    onChange,
  };

  const renderInputComponent = (iProps) => (
    <div>
      <InputGroup>
        <Input {...iProps} />
        <InputGroupAddon addonType="append">
          <Button onClick={() => setSymptom(search)}>Search</Button>

        </InputGroupAddon>
      </InputGroup>
    </div>
  );

  return (
    <>
      <Style>
        <NotificationAlert ref={notifyEl} />
        <Row>
          <Col>

            <AutoSuggestStyle>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
              />
            </AutoSuggestStyle>

          </Col>
        </Row>
      </Style>

    </>
  );
}

SearchBySymptom.propTypes = {
  setSymptom: PropTypes.func,
};

SearchBySymptom.defaultProps = {
  setSymptom: () => {},
};

export default SearchBySymptom;
