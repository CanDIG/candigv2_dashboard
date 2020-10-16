import React, {
    useState, forwardRef, useRef, useEffect,
  } from 'react';
import PropTypes from 'prop-types';
  
import {
    Row, Button, ButtonDropdown, DropdownToggle,
    InputGroup, InputGroupAddon, DropdownMenu,
    InputGroupText, Col, DropdownItem, Dropdown,
    Input,
  } from 'reactstrap';
import Style from '../../assets/css/StyledComponents/ColumnControlStyled';
import {searchSymptom, fetchIndividuals} from 'api/api';
import { CHORD_METADATA_URL } from '../../constants/constants';
import RESPONSE from 'constants/phenoResp';
import ClinMetadataTable from 'components/Tables/ClinMetadataTable';
import {
    ProcessMetadata, ProcessData, diseaseSchema, 
    featureSchema, ProcessPhenopackets, ProcessSymptoms
  } from '../Processing/ChordSchemas';

import LoadingIndicator, {
    trackPromise,
    usePromiseTracker,
  } from '../LoadingIndicator/LoadingIndicator';
import Autosuggest from 'react-autosuggest';
import INDIVIDUALS from 'constants/LOCAL_individuals2'



function SearchBySymptom({setSymptom}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [value, setValue] = useState('');
    const [suggestionValue, setSuggestionValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [fetchedSuggestions, setFetchedSuggesions] = useState([])


    useEffect(() => {
      try {
        // trackPromise(
        //   fetchIndividuals()
        //     .then((dataResponse) => {
        //       const [_, phenopacketS] = ProcessMetadata(dataResponse.results);
        //       const symptomS = ProcessSymptoms(phenopacketS)
        //       console.log(symptomS)
        //       setSymptoms(symptomS)
        //     })
        //     .catch(() => {
        //       notify(
        //         notifyEl,
        //         'The resources you requested were not available.',
        //         'warning',
        //       );
        //     }),
        // );
  
        const [_, phenopacketS] = ProcessMetadata(INDIVIDUALS.results);
        ProcessSymptoms(phenopacketS).then((symptoms) => {
          console.log(symptoms)
          setFetchedSuggesions(symptoms)
        })
          
        
        // console.log(symptomS)
        // setSymptoms(symptomS)
  
      } catch (err) {
        console.log(err)
      }
    }, []);

    // From https://github.com/moroshko/react-autosuggest#installation

    const getSuggestions = value => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
    
      return inputLength === 0 ? [] : fetchedSuggestions.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
      );
    };
    
    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
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

    const sendRequest = (symptom) => {
        console.log("Button Pressed");
        setSymptom(symptom);
    }

    const onChange = (event, { newValue }) => {
      setSuggestionValue(newValue);
      setValue(newValue)
    };

    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: onChange
    };

    return (
        <>
        <Style>
        <Col>
            <InputGroup>
 

            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <InputGroupAddon addonType="append">
                <Button onClick={() => sendRequest(value)}>Search</Button></InputGroupAddon>
            </InputGroup>

        </Col>
        </Style>
        
        </>
    )

    // <Input 
    // placeholder="Symptoms" 
    // value={value || ''}
    // onChange={(e) => {
    //     setValue(e.target.value);
    //   }}

    // />
}

export {SearchBySymptom}