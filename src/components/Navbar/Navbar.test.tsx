import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the logo link", () => {
    render(<Navbar />);
    const logo = screen.getByTestId("logo-link");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("renders desktop nav items", () => {
    render(<Navbar />);
    const desktopNav = screen.getByTestId("desktop-nav");
    expect(desktopNav).toBeInTheDocument();
    expect(desktopNav).toHaveTextContent("Home");
    expect(desktopNav).toHaveTextContent("About");
  });

  it("toggles mobile menu visibility", () => {
    render(<Navbar />);
    const toggleButton = screen.getByTestId("menu-toggle");
    const mobileMenu = screen.getByTestId("mobile-menu");

    // Initially hidden
    expect(mobileMenu).toHaveClass("hidden");

    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass("block");

    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass("hidden");
  });

  it("sets correct aria attributes on toggle", () => {
    render(<Navbar />);
    const toggleButton = screen.getByTestId("menu-toggle");

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
  });
});
