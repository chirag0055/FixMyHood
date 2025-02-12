import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import logo from "../assets/logo.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const NavbarComponent = ({ scrollToAbout }) => {
  const location = useLocation(); // Get the current page location
  const navigate = useNavigate(); // Hook for navigation
  const { user, logout } = useAuth(); // Get user authentication state and logout function

  // Handle "About" link click behavior
  const handleAboutClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Prevent default anchor behavior
    }
    if (location.pathname === "/") {
      // If already on the homepage, simply scroll to the About section
      scrollToAbout();
    } else {
      // Navigate to Home and scroll after the page loads
      navigate("/");
      setTimeout(() => {
        scrollToAbout();
      }, 100); // Small delay to allow page transition
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <Navbar
        disableAnimation
        className="bg-[#e9ecef] fixed top-0 left-0 w-full h-[60px]"
      >
        {/* Left Section: Logo */}
        <NavbarContent>
          <NavbarBrand onClick={() => navigate("/")}>
            <img src={logo} alt="" className="h-7" />
          </NavbarBrand>
        </NavbarContent>

        {/* Center Navigation Links (Hidden on Small Screens) */}
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="cursor-pointer" onClick={handleAboutClick}>
              About
            </Link>
          </NavbarItem>

          {/* Show "Track Complaint" only if user is not logged in */}
          {user ? (
            <div></div>
          ) : (
            <NavbarItem>
              <Link className="cursor-pointer" to="/trackcomplaint">
                Track Complaint
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* Right Section: Buttons & Menu Toggle */}
        <NavbarContent justify="end">
          {/* If user is logged in, show Dashboard & Logout buttons */}
          {user ? (
            <div className="hidden sm:flex gap-2">
              <Button
                color="primary"
                variant="ghost"
                className="w-auto text-base sm:text-sm"
                onPress={() => navigate("/Dashboard")}
              >
                Dashboard
              </Button>
              <Button
                color="danger"
                variant="ghost"
                className="w-auto text-base sm:text-sm"
                onPress={async () => {
                  await logout();
                  navigate("/Login");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            // If user is not logged in, show "Raise Complaint" & "Admin Login" buttons
            <div className="hidden sm:flex gap-2">
              <Button
                color="primary"
                variant="ghost"
                className="w-auto text-base sm:text-sm"
                onPress={() => navigate("/RaiseComplaint")}
              >
                Raise Complaint
              </Button>
              <Button
                color="danger"
                variant="ghost"
                className="w-auto text-base sm:text-sm"
                onPress={() => navigate("/Login")}
              >
                Admin Login
              </Button>
            </div>
          )}
        </NavbarContent>

        {/* Mobile Menu (Visible on Small Screens) */}
        <div className="sm:hidden">
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button variant="bordered" color="primary">
                Menu
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Link Actions" variant="faded">
              <DropdownSection>
                <DropdownItem as={Link} to="/" showDivider>
                  Home
                </DropdownItem>
                <DropdownItem
                  showDivider
                  as={Link}
                  to="/"
                  onPress={handleAboutClick}
                >
                  About
                </DropdownItem>

                {/* Show "Track Complaint" only for unauthenticated users */}
                {user ? (
                  <></>
                ) : (
                  <DropdownItem showDivider as={Link} to="/trackcomplaint">
                    Track Complaint
                  </DropdownItem>
                )}

                {/* If user is logged in, show Dashboard & Logout options */}
                {user ? (
                  <>
                    <DropdownItem
                      showDivider
                      className="text-primary"
                      color="primary"
                      onPress={() => {
                        navigate("/Dashboard");
                      }}
                    >
                      Dashboard
                    </DropdownItem>

                    <DropdownItem
                      showDivider
                      className="text-danger"
                      color="primary"
                      onPress={async () => {
                        await logout();
                        navigate("/Login");
                      }}
                    >
                      Logout
                    </DropdownItem>
                  </>
                ) : (
                  // If user is not logged in, show Raise Complaint & Admin Login options
                  <>
                    <DropdownItem
                      showDivider
                      as={Link}
                      to="/RaiseComplaint"
                      className="text-primary"
                      color="primary"
                    >
                      Raise Complaint
                    </DropdownItem>

                    <DropdownItem
                      as={Link}
                      to="/Login"
                      className="text-danger"
                      color="danger"
                    >
                      Admin Login
                    </DropdownItem>
                  </>
                )}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
