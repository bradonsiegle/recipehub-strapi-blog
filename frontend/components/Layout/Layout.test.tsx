import { render, screen, act } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import { Layout } from "./Layout";

describe("Layout test cases", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const child = (
    <>
      <h1>Main Article</h1>
      <p>Some text</p>
    </>
  );

  it("should render the layout", () => {
    const { container } = render(<Layout>{child}</Layout>);
    expect(container).toMatchSnapshot();
  });
  it("should toggle theme", async () => {
    localStorage.setItem("theme", "light");
    (window.matchMedia as jest.Mock).mockReturnValue({ matches: true });

    render(<Layout>{child}</Layout>);

    const themeToggler = screen.getByRole("button", { name: "Moon" });
    expect(themeToggler).toBeInTheDocument();

    await act(async () => {
      userEvent.click(themeToggler);
    });

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Sun" })).toBeInTheDocument();
  });
});
