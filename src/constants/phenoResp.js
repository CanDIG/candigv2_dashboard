const None = null;
const True = true;
const False = false;

const RESPONSE = {results: [{
  id: '004-93-4316',
  phenotypic_features: [{
    type: { id: 'HP:0031246', label: 'Dry cough' }, description: 'Yes, with sputum production - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.751200Z', updated: '2020-10-09T18:56:15.751219Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0031245', label: 'Wet cough' }, description: 'Yes - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.752343Z', updated: '2020-10-09T18:56:15.752362Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0002098', label: 'Difficulty breathing' }, description: 'Yes, severe - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.753400Z', updated: '2020-10-09T18:56:15.753418Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0012378', label: 'Fatigue' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.754450Z', updated: '2020-10-09T18:56:15.754468Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0003326', label: 'Myalgia' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.755507Z', updated: '2020-10-09T18:56:15.755526Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0031417', label: 'Runny nose' }, description: 'Yes - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.756612Z', updated: '2020-10-09T18:56:15.756630Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:267102003', label: 'Sore throat symptom' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.757665Z', updated: '2020-10-09T18:56:15.757684Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0000421', label: 'Nosebleed' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.758732Z', updated: '2020-10-09T18:56:15.758750Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0030766', label: 'Ear pain' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.759824Z', updated: '2020-10-09T18:56:15.759843Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0030828', label: 'Wheezing' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.761023Z', updated: '2020-10-09T18:56:15.761042Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0100749', label: 'Chest pain' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.762166Z', updated: '2020-10-09T18:56:15.762185Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0002027', label: 'Abdominal pain' }, description: 'Yes - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.767554Z', updated: '2020-10-09T18:56:15.767572Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0005059', label: 'Joint pain/Joint inflammation' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.763247Z', updated: '2020-10-09T18:56:15.763265Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0002315', label: 'Headache' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.764326Z', updated: '2020-10-09T18:56:15.764345Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0001250', label: 'Seizures' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.765381Z', updated: '2020-10-09T18:56:15.765399Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0001289', label: 'Confusion' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.766473Z', updated: '2020-10-09T18:56:15.766494Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0002014', label: 'Diarrhea' }, description: "Don't know - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.", negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.768604Z', updated: '2020-10-09T18:56:15.768623Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0002018', label: 'Nausea' }, description: 'Yes - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.769652Z', updated: '2020-10-09T18:56:15.769670Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0000509', label: 'Conjunctivitis' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.770705Z', updated: '2020-10-09T18:56:15.770724Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0000988', label: 'Skin rash' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.771992Z', updated: '2020-10-09T18:56:15.772012Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:84387000', label: 'Asymptomatic' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.773150Z', updated: '2020-10-09T18:56:15.773168Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'NCIT:C114901', label: 'Bodily pain' }, description: 'No - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.774237Z', updated: '2020-10-09T18:56:15.774255Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'HP:0001945', label: 'Fever' }, description: 'Temperature 38.8 C - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.775323Z', updated: '2020-10-09T18:56:15.775344Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:364075005', label: 'Heart rate' }, description: '60 beats per minute - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.776363Z', updated: '2020-10-09T18:56:15.776382Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:86290005', label: 'Respiratory rate' }, description: '15 breaths per minute - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.777427Z', updated: '2020-10-09T18:56:15.777445Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:271649006', label: 'Systolic blood pressure' }, description: '100 mmHg - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.778500Z', updated: '2020-10-09T18:56:15.778518Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:271650006', label: 'Diastolic blood pressure' }, description: '60 mmHg - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.779565Z', updated: '2020-10-09T18:56:15.779584Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:447755005', label: 'Finding of oxygen saturation' }, description: '98 % - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.780621Z', updated: '2020-10-09T18:56:15.780639Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:36955009', label: 'Loss of taste' }, description: 'Only taste - Original value extracted from the source CRF.', negated: False, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.781705Z', updated: '2020-10-09T18:56:15.781724Z', phenopacket: '004-93-4316',
  }, {
    type: { id: 'SNOMED:272028008', label: 'C/O - loss of smell sense' }, description: 'Only taste - Original value extracted from the source CRF.The phenotype was looked for, but found to be absent.', negated: True, extra_properties: { datatype: 'symptom' }, created: '2020-10-09T18:56:15.782813Z', updated: '2020-10-09T18:56:15.782832Z', phenopacket: '004-93-4316',
  }],
  created: '2020-10-09T18:56:15.817868Z',
  updated: '2020-10-09T18:56:15.817888Z',
  subject: {
    id: '004-93-4316', date_of_birth: '1987-10-18', sex: 'UNKNOWN_SEX', karyotypic_sex: 'UNKNOWN_KARYOTYPE', taxonomy: { id: 'NCBITaxon:9606', label: 'Homo sapiens' }, ethnicity: 'More than one race', extra_properties: { height: '157 cm', weight: '176 Kg', education: 'High school' }, created: '2020-10-09T18:56:15.749668Z', updated: '2020-10-09T18:56:15.749687Z',
  },
  meta_data: {
    resources: [{
      id: 'MP:2020-07-09', name: 'Mammalian Phenotype Ontology', namespace_prefix: 'MP', url: 'http://purl.obolibrary.org/obo/mp.owl', version: '2020-07-09', iri_prefix: 'http://purl.bioontology.org/ontology/MP/', created: '2020-10-09T18:56:12.068482Z', updated: '2020-10-09T18:56:12.068503Z',
    }, {
      id: 'SNOMED:2019-04-11', name: 'SNOMED Clinical Terms', namespace_prefix: 'SNOMED', url: 'http://purl.bioontology.org/ontology/SNOMEDCT', version: '2019-04-11', iri_prefix: 'http://purl.bioontology.org/ontology/SNOMEDCT/', created: '2020-08-25T19:48:46.199643Z', updated: '2020-08-25T19:48:46.199662Z',
    }, {
      id: 'NCBITaxon:2018-07-27', name: 'NCBI Taxonomy OBO Edition', namespace_prefix: 'NCBITaxon', url: 'http://purl.obolibrary.org/obo/ncbitaxon.owl', version: '2018-07-27', iri_prefix: 'http://purl.obolibrary.org/obo/NCBITaxon_', created: '2020-08-25T19:48:46.196289Z', updated: '2020-08-25T19:48:46.196309Z',
    }, {
      id: 'NCIT:2020-08-31', name: 'National Cancer Institute Thesaurus', namespace_prefix: 'NCIT', url: 'https://bioportal.bioontology.org/ontologies/NCIT', version: '2020-08-31', iri_prefix: 'http://purl.bioontology.org/ontology/NCIT/', created: '2020-10-09T18:56:12.071741Z', updated: '2020-10-09T18:56:12.071761Z',
    }, {
      id: 'HP:2020-06-08', name: 'The Human Phenotype Ontology', namespace_prefix: 'HP', url: 'http://purl.obolibrary.org/obo/hp.owl', version: '2020-06-08', iri_prefix: 'https://hpo.jax.org/app/browse/term/', created: '2020-08-25T19:48:46.202849Z', updated: '2020-08-25T19:48:46.202869Z',
    }],
    created: '2020-10-09T18:56:15.809982Z',
    created_by: 'Ksenia Zaytseva',
    submitted_by: 'Ksenia Zaytseva',
    phenopacket_schema_version: '1.0.0-RC3',
    updated: '2020-10-09T18:56:15.810181Z',
  },
  table: '26c457da-e751-4304-8158-f7f319a937d4',
  diseases: [{
    id: 65, term: { id: 'SNOMED:46635009', label: 'Type 1 diabetes mellitus' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'immune system' }, created: '2020-10-09T18:56:12.275946Z', updated: '2020-10-09T18:56:12.275968Z',
  }, {
    id: 66, term: { id: 'HP:0001297', label: 'Stroke' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'cardiovascular system' }, created: '2020-10-09T18:56:12.284509Z', updated: '2020-10-09T18:56:12.284529Z',
  }, {
    id: 51, term: { id: 'SNOMED:195967001', label: 'Asthma' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'respiratory system' }, created: '2020-10-09T18:56:12.042216Z', updated: '2020-10-09T18:56:12.042237Z',
  }, {
    id: 52, term: { id: 'SNOMED:13645005', label: 'Chronic obstructive lung disease' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'respiratory system' }, created: '2020-10-09T18:56:12.045614Z', updated: '2020-10-09T18:56:12.045635Z',
  }, {
    id: 55, term: { id: 'HP:0001658', label: 'Myocardial infarction' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'cardiovascular system' }, created: '2020-10-09T18:56:12.055339Z', updated: '2020-10-09T18:56:12.055359Z',
  }, {
    id: 56, term: { id: 'HP:0004950', label: 'Peripheral arterial stenosis' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'cardiovascular system' }, created: '2020-10-09T18:56:12.058522Z', updated: '2020-10-09T18:56:12.058542Z',
  }, {
    id: 60, term: { id: 'HP:0011675', label: 'Arrhythmia' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'cardiovascular system' }, created: '2020-10-09T18:56:12.166580Z', updated: '2020-10-09T18:56:12.166629Z',
  }, {
    id: 61, term: { id: 'SNOMED:52448006', label: 'Dementia' }, extra_properties: { datatype: 'comorbidity', comorbidities_group: 'neurological' }, created: '2020-10-09T18:56:12.170264Z', updated: '2020-10-09T18:56:12.170284Z',
  }],
  biosamples: [],
  genes: [],
  variants: [],
  hts_files: [],
}]};

export default RESPONSE;