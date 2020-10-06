import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
import TestRenderer from 'react-test-renderer';
const {act} = TestRenderer;
import renderer from "react-test-renderer";

import "regenerator-runtime/runtime.js";

import Server from "./Server";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders server data", async () => {
  const fakeServerData = {
    response: { ok: true },
    status: {
      "Known peers": 99999,
      "Queried peers": 99998,
      "Successful communications": 99997,
      "Valid response": true,
    },
  };

  const mockJsonPromise = Promise.resolve(fakeServerData);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    ok: true,
  });

  global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

  await act(async () => {
    // render(<Server datasetId="blah" />, container);
    const component = renderer.create(
      <Server datasetId="blah" />,
    );
  });
  
  // console.log("container", container.innerHTML);

  // global.fetch.mockRestore();
  global.fetch.mockClear();
  delete global.fetch;
});
