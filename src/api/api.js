import BASE_URL, { CHORD_METADATA_URL } from '../constants/constants';

function fetchIndividuals() {
  return fetch(
    `${CHORD_METADATA_URL}/api/individuals?page_size=10000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

function fetchPatients(datasetId) {
  return fetch(`${BASE_URL}/patients/search`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      datasetId,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

function fetchDatasets() {
  return fetch(`${BASE_URL}/datasets/search`, {
    method: 'post',
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

function fetchServers() {
  return fetchDatasets();
}

function getCounts(datasetId, table, field) {
  let temp;
  if (!Array.isArray(field)) {
    temp = [field];
  } else {
    temp = field;
  }

  return fetch(`${BASE_URL}/count`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dataset_id: datasetId,
      logic: {
        id: 'A',
      },
      components: [
        {
          id: 'A',
          patients: {},
        },
      ],
      results: [
        {
          table,
          fields: temp,
        },
      ],
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return {};
    });
}

function searchVariant(datasetId, start, end, referenceName) {
  return fetch(`${BASE_URL}/variants/search`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start,
      end,
      referenceName,
      datasetId,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return {};
  });
}

export {
  fetchPatients, fetchIndividuals, fetchDatasets, getCounts, fetchServers, searchVariant,
};
