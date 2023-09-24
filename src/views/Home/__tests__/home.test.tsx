import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { Home } from "../index";
import { tapes } from "@/__mocks__/tapesData";

describe("Home Component", () => {
  it("renders cassettes data when data is provided", async () => {
    const {
      getAllByText,
      getByText,
      queryByText,
      getByPlaceholderText,
      getAllByTestId,
    } = render(<Home data={tapes} />);

    // Checking if the title is rendered
    expect(getByText("Cassette Tapes")).toBeInTheDocument();

    // We show 10 items per page
    expect(getAllByTestId("tableRow")).toHaveLength(10);
    // Checking if the tapes are rendered
    expect(getByText("Laser")).toBeInTheDocument();
    expect(getByText("TDK")).toBeInTheDocument();

    // Check filtering
    const filterInput = getByPlaceholderText(
      /Search for type, time, color or brand/i
    );
    act(() => {
      fireEvent.change(filterInput, { target: { value: "Laser" } });
    });

    await waitFor(() => {
      // after filtering, only the 'Laser' brand should be visible
      expect(queryByText("TDK")).not.toBeInTheDocument();
    });
  });

  it("shows empty state when the filter returns no results and resets after clicking the reset button", async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <Home data={tapes} />
    );

    const filterInput = getByPlaceholderText(
      /Search for type, time, color or brand/i
    );

    // filter with a value that doesn't exist
    act(() => {
      fireEvent.change(filterInput, { target: { value: "nonexistentvalue" } });
    });

    // Check for empty state
    await waitFor(() => {
      expect(getByText(/no results/i)).toBeInTheDocument();
    });

    //  Simulate a click on the "RESET" button
    const resetButton = getByText("RESET");

    act(() => {
      fireEvent.click(resetButton);
    });

    // Check for tapes to be present again
    await waitFor(() => {
      expect(getByText("TDK")).toBeInTheDocument();
    });
  });

  it("shows an error when data is not provided", () => {
    const { getByText } = render(<Home />);

    // Check if the error message is displayed
    expect(
      getByText(/something went wrong when we were getting all casettes/i)
    ).toBeInTheDocument();
  });
});
