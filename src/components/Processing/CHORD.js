//Assume data is present at this state

//Need to turn each metadata object into four objects easily mapped to tables
//Flatten and assign higher order ID to smaller objects

import INDIVIDUALS from "constants/individuals_local"

export function ProcessMetadata(metadata) {
    const mainTable = []
    Object.values(metadata).forEach((entry) => {
        const mainTableEntry = {
            ID: entry.id,
            DOB: entry.date_of_birth,
            Sex: entry.sex,
            KSex: entry.karyotypic_sex,
            taxID: entry.taxonomy.id,
            taxLabel: entry.taxonomy.taxLabel,
            created: entry.created,
            updated: entry.updated
        }
        mainTable.push(mainTableEntry)
    })

    return mainTable;

}



const tableEntry = {
    id: "",
    dob: "",
    sex: "",
    k_sex: "",
    tax_id: "",
    tax_lab: "",
    created: "",
    updated: "",
    pMetadata: [],
    phenopackets: [],
    pDiseases: []
}

const phenopacketsTable = {
    id: "",
    created: "",
    updated: "",
    biosamples: [],
    genes: [],
    variants: [],
    hts_files: []
}

const pMetadata = {
    tId: "",
    id: "",
    name: "",
    namespace_prefix: "",
    url: "",
    iri_prefix: "",
    created: "",
    updated: ""
}

const disease = {

}