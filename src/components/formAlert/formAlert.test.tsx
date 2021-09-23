import React from "react";
import { render, screen } from "@testing-library/react";
import { FormAlert } from "./formAlert";

describe("FormAlert", () => {
  it("renders the FormAlert with error", async () => {
    render(<FormAlert message={"Something went wrong"} type="error" />);
    expect(await screen.findByText("Something went wrong")).toBeTruthy();
  });
  it("renders the FormAlert with success", async () => {
    render(<FormAlert message={"Submitted successfully"} type="success" />);
    expect(await screen.findByText("Submitted successfully")).toBeTruthy();
  });

  it("doesn't renders the component when message is null", async () => {
    const { container } = render(<FormAlert message={null} type="error" />);
    expect(container.childNodes.length).toBe(0);
  });
});
