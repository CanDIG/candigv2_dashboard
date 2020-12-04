export const diseaseSchema = (data) => {
  const entry = {
    ID: data.id,
    term: data.term.id,
    label: data.term.label,
    comorbidities: data.extra_properties.comorbidities_group,
    created: data.created,
    updated: data.updated,
  };
  return entry;
};

// can be either symptom or complication depending on datatype
export const featureSchema = (data) => {
  const entry = {
    ID: data.type.id,
    label: data.type.label,
    description: data.description,
    negated: data.negated,
    created: data.created,
    updated: data.updated,
  };
  return entry;
};

export const subjectSchema = (data) => {
  const subject = {
    ID: data.id,
    DOB: data.date_of_birth,
    Sex: data.sex,
    KSex: data.karyotypic_sex,
    ethnicity: data.ethnicity,
    height: data.extra_properties.height,
    weight: data.extra_properties.weight,
    education: data.extra_properties.education,
    abo_type: data.extra_properties.abo_type,
    taxID: data.taxonomy.id,
    taxLabel: data.taxonomy.label,
    household: data.extra_properties.household,
    employment: data.extra_properties.employment,
    asymptomatic: data.extra_properties.asymptomatic,
    covid19_test: data.extra_properties.covid19_test,
    covid19_test_date: data.extra_properties.covid19_test_date,
    covid19_diagnosis_date: data.extra_properties.covid19_diagnosis_date,
    hospitalized: data.extra_properties.hospitalized,
    birth_country: data.extra_properties.birth_country,
    host_hospital: data.extra_properties.host_hospital,
    residence_type: data.extra_properties.residence_type,
    enrollment_date: data.extra_properties.enrollment_date,
    created: data.created,
    updated: data.updated,
  };
  return subject;
};

// Called when using /api/individuals

export function ProcessMetadata(metadata) {
  const mainTable = [];
  const phenopacketsList = {};
  Object.values(metadata).forEach((entry) => {
    mainTable.push(subjectSchema(entry));
    const ID = entry.id;
    let Pheno;
    try {
      Pheno = entry.phenopackets[0];
      phenopacketsList[ID] = Pheno;
    } catch (e) {}    
  });
  return [mainTable, phenopacketsList];
}

// Called when using /api/phenopackets

export function ProcessPhenopackets(response) {
  // console.log(response);
  const mainTable = [];
  const phenopacketsList = {};
  response.forEach((entry) => {
    // console.log(entry);
    mainTable.push(subjectSchema(entry.subject));
    const ID = entry.id;
    phenopacketsList[ID] = entry;
  });

  return [mainTable, phenopacketsList];
}

export function ProcessData(ID, dataList, dataSchema) {
  const processedData = [];
  Object.values(dataList).forEach((data) => {
    const dataEntry = dataSchema(data);
    processedData.push(dataEntry);
  });
  return { [ID]: processedData };
}

export function ProcessFeatures(ID, dataList, dataSchema, feature) {
  const processedFeatures = [];

  Object.values(dataList)
    .filter((data) => data.extra_properties.datatype === feature)
    .forEach((entry) => {
      const dataEntry = dataSchema(entry);
      processedFeatures.push(dataEntry);
    });

  // console.log(processedFeatures);
  return { [ID]: processedFeatures };
}

export async function ProcessSymptoms(phenopackets) {
  const symptoms = new Set();
  Promise.all(Object.values(phenopackets).map(async (phenopacket) => {
    await Promise.all(phenopacket.phenotypic_features.map(async (feature) => {
      if (feature.extra_properties.datatype === 'symptom') {
        symptoms.add(feature.type.label);
      }
    }));
  }));

  const symptomList = Array.from(symptoms).map((symptom) => ({ name: symptom }));

  return symptomList;
}
