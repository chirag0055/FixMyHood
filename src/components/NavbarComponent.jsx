import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import toast from "react-hot-toast";
import { div } from "framer-motion/client";

const NavbarComponent = ({ scrollToAbout }) => {
  const location = useLocation(); // Get current page
  const navigate = useNavigate(); // For navigation
  const { user, logout } = useAuth();

  const handleAboutClick = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // Prevents default behavior if event exists
    }
    if (location.pathname === "/") {
      // Already on Home page, just scroll
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
          {/* Desktop Buttons (Visible on Large Screens) */}

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
                {user ? (
                  <></>
                ) : (
                  <DropdownItem showDivider as={Link} to="/trackcomplaint">
                    Track Complaint
                  </DropdownItem>
                )}

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
