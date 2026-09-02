import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Testimonials from "../pages/Testimonials";
import { Navigation } from "../components/Navigation";

describe("Testimonials page", () => {
  it("renders the testimonials page hero heading", () => {
    render(
      <MemoryRouter>
        <Testimonials />
      </MemoryRouter>
    );

    expect(screen.getByText(/Testimonials & Results/i)).toBeInTheDocument();
  });

  it("routes the Results nav item to the Results route", () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /Results/i })).toHaveAttribute("href", "/results");
  });
});
