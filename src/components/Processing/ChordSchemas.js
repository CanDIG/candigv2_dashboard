// Assume data is present at this state

import { object } from "prop-types";


// Called when using /api/individuals

export function ProcessMetadata(metadata) {
  const mainTable = [];
  const phenopacketsList = {};
  Object.values(metadata).forEach((entry) => {
    // console.log(entry)
    mainTable.push(subjectSchema(entry));
    const ID = entry.id;
    const Pheno = entry.phenopackets[0];
    phenopacketsList[ID] = Pheno;
  });

  return [mainTable, phenopacketsList];
}

// Called when using /api/phenopackets

export function ProcessPhenopackets(response) {
  //console.log(response)
  const mainTable = [];
  const phenopacketsList = {};
  Object.values(response).forEach((entry) => {
    // console.log(entry)
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

export async function ProcessSymptoms(phenopackets) {
  const symptoms = new Set();
  Promise.all(Object.values(phenopackets).map(async (phenopacket) => {
    await Promise.all(phenopacket.phenotypic_features.map(async (feature) => {
      symptoms.add(feature.type.label)
    }))
  }))

  const symptomList = Array.from(symptoms).map((symptom) => {
      return {"name": symptom}
  })


  // Object.values(phenopackets).forEach((data) => {
  //   Object.values(data.phenotypic_features).forEach((feature) => {
  //     symptoms.add(feature.type.label)
  //   })
  // })

  return symptomList
  
}



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

export const featureSchema = (data) => {
  const entry = {
    ID: data.type.id,
    label: data.type.label,
    datatype: data.extra_properties.datatype,
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
    taxID: data.taxonomy.id,
    taxLabel: data.taxonomy.label,
    created: data.created,
    updated: data.updated,
  };
  return subject;
}
