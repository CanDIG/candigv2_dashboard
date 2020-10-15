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
import {searchSymptom} from 'api/api';
import { CHORD_METADATA_URL } from '../../constants/constants';
import RESPONSE from 'constants/phenoResp';
import ClinMetadataTable from 'components/Tables/ClinMetadataTable';
import {
    ProcessMetadata, ProcessData, diseaseSchema, 
    featureSchema, ProcessPhenopackets,
  } from '../Processing/ChordSchemas';

import LoadingIndicator, {
    trackPromise,
    usePromiseTracker,
  } from '../LoadingIndicator/LoadingIndicator';


function SearchBySymptom({setSymptom}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [value, setValue] = useState('');

    const sendRequest = (symptom) => {
        console.log("Button Pressed");
        setSymptom(symptom);
    }

    return (
        <>
        <Style>
        <Col>
            <InputGroup>
            <Input 
                placeholder="Symptoms" 
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                  }}

            />
            <InputGroupAddon addonType="append">
                <Button onClick={() => sendRequest(value)}>Search</Button></InputGroupAddon>
            </InputGroup>

        </Col>
        </Style>
        
        </>
    )
}

export {SearchBySymptom}