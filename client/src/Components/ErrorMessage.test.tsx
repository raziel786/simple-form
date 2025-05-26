import { render, screen } from "@testing-library/react";
import ErrorMessage from "../Components/ErrorMessage";

describe("When message prop is provided", () => {
  it("Then it renders the error message with warning icon", () => {
    const testMessage = "This is an error";
    render(<ErrorMessage message={testMessage} />);
    const errorElement = screen.getByTestId("error-message");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(`⚠ ${testMessage}`);
  });
});

describe("When message prop is empty", () => {
  it("Then it renders nothing", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
