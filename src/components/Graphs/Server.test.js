import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { beforeEach, afterEach } from "@jest/globals";
import { act } from "react-dom/test-utils";

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

it("renders server chart", async () => {
  const fakeServerData = {
    status: {
      "Known peers": 2,
      "Queried peers": 2,
      "Successful communications": 2,
      "Valid response": true,
    },
  };
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(fakeUser) })
    );

  await act(async () => {
    render(<Server datasetId="blah" />, container);
  });

  global.fetch.mockRestore();
});
