import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Testimonials from "../pages/Testimonials";

describe("Testimonials page", () => {
  it("renders the testimonials page hero heading", () => {
    render(
      <MemoryRouter>
        <Testimonials />
      </MemoryRouter>
    );

    expect(screen.getByText(/Testimonials & Results/i)).toBeInTheDocument();
  });
});
