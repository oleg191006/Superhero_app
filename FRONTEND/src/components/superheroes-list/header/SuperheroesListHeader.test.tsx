import { render, screen, fireEvent } from "@testing-library/react";
import SuperheroesListHeader from "./SuperheroesListHeader";
import "@testing-library/jest-dom";

describe("SuperheroesListHeader", () => {
  it("should render the header with the correct text", () => {
    render(<SuperheroesListHeader onOpenCreate={jest.fn()} />);

    expect(
      screen.getByRole("heading", { name: /superheroes/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add superhero/i })
    ).toBeInTheDocument();
  });

  it("should call the onOpenCreate handler when the button is clicked", () => {
    const onOpenCreateMock = jest.fn();

    render(<SuperheroesListHeader onOpenCreate={onOpenCreateMock} />);

    const addButton = screen.getByRole("button", { name: /add superhero/i });
    fireEvent.click(addButton);

    expect(onOpenCreateMock).toHaveBeenCalledTimes(1);
  });
});
