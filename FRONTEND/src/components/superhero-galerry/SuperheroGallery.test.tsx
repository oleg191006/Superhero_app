import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import SuperheroGallery from "./SuperheroGallery";

const mockSuperhero: Superhero = {
  id: "1",
  nickname: "Batman",
  real_name: "Bruce Wayne",
  origin_description: "Vigilante of Gotham City.",
  superpowers: "Genius-level intellect, master martial artist",
  catch_phrase: "I am vengeance. I am the night. I am Batman.",
  images: [
    {
      id: "img-1",
      url: "https://example.com/batman-main.jpg",
      superheroId: "1",
    },
    {
      id: "img-2",
      url: "https://example.com/batman-alt1.jpg",
      superheroId: "2",
    },
    {
      id: "img-3",
      url: "https://example.com/batman-alt2.jpg",
      superheroId: "3",
    },
  ],
};

describe("SuperheroGallery", () => {
  it("should render all images from the gallery", () => {
    render(
      <SuperheroGallery hero={mockSuperhero} onSetMainImage={jest.fn()} />
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    expect(screen.getByAltText("Batman-img-1")).toBeInTheDocument();
    expect(screen.getByAltText("Batman-img-2")).toBeInTheDocument();
    expect(screen.getByAltText("Batman-img-3")).toBeInTheDocument();
  });

  it("should show 'Set as Main' button for secondary images only", () => {
    render(
      <SuperheroGallery hero={mockSuperhero} onSetMainImage={jest.fn()} />
    );

    const setAsMainButtons = screen.getAllByRole("button", {
      name: "Set as Main",
    });
    expect(setAsMainButtons).toHaveLength(2);
  });

  it("should call onSetMainImage with the correct image ID when clicked", async () => {
    const mockOnSetMainImage = jest.fn();
    render(
      <SuperheroGallery
        hero={mockSuperhero}
        onSetMainImage={mockOnSetMainImage}
      />
    );

    const setAsMainButtons = screen.getAllByRole("button", {
      name: "Set as Main",
    });
    fireEvent.click(setAsMainButtons[0]);

    await waitFor(() => {
      expect(mockOnSetMainImage).toHaveBeenCalledTimes(1);
      expect(mockOnSetMainImage).toHaveBeenCalledWith("img-2");
    });
  });

  it("should show a loading spinner when the button is clicked", async () => {
    const mockOnSetMainImage = jest.fn().mockResolvedValue(null);
    render(
      <SuperheroGallery
        hero={mockSuperhero}
        onSetMainImage={mockOnSetMainImage}
      />
    );

    const setAsMainButton = screen.getAllByRole("button", {
      name: "Set as Main",
    })[0];
    fireEvent.click(setAsMainButton);

    expect(setAsMainButton).toBeDisabled();

    await waitFor(() => {
      expect(setAsMainButton).not.toBeDisabled();
    });
  });
});
