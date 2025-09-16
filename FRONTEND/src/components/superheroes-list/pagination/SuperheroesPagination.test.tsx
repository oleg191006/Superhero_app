import { render, screen, fireEvent } from "@testing-library/react";
import SuperheroesPagination from "./SuperheroesPagination";
import "@testing-library/jest-dom";

describe("SuperheroesPagination", () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    onPageChangeMock.mockClear();
  });

  it("should render the correct number of pages", () => {
    const totalPages = 5;
    const currentPage = 1;
    render(
      <SuperheroesPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChangeMock}
      />
    );

    const pageButtons = screen.getAllByRole("button");

    expect(pageButtons).toHaveLength(totalPages + 2);
  });

  it("should call onPageChange with the correct page number when a non-current page button is clicked", () => {
    const totalPages = 5;
    const currentPage = 1;
    render(
      <SuperheroesPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChangeMock}
      />
    );

    const page3Button = screen.getByRole("button", { name: "Go to page 3" });
    fireEvent.click(page3Button);

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("should call onPageChange when the 'next' button is clicked", () => {
    const totalPages = 5;
    const currentPage = 2;
    render(
      <SuperheroesPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(currentPage + 1);
  });
});
