import React from "react";
import CustomVisualization from "./CustomVisualization.js";
import renderer from "react-test-renderer";

test("teste", () => {
  const component = renderer.create(
    <CustomVisualization datasetId="" datasetName=""></CustomVisualization>
  );
  let tree = component.toJSON();
});
