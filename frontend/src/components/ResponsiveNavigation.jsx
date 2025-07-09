import React, { useState, useEffect } from "react";
import { useResponsiveNavigation } from "../hooks/useResponsive";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const ResponsiveNavigation = ({
  children,
  className = "",
  style = {},
  mobileMenuButton = null,
  mobileMenuContent = null,
  desktopContent = null,
  breakpoint = "md",
  ...props
}) => {
  const { isMobile, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useResponsiveNavigation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen, closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navigationStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    transition: "all 0.3s ease",
    ...style,
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1001,
    transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease",
  };

  const mobileMenuContentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "80%",
    maxWidth: "300px",
    height: "100%",
    backgroundColor: "white",
    padding: "20px",
    overflowY: "auto",
    transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease",
  };

  const mobileMenuButtonStyle = {
    position: "fixed",
    top: "15px",
    right: "15px",
    zIndex: 1002,
    backgroundColor: "white",
    border: "none",
    borderRadius: "50%",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    transition: "all 0.3s ease",
  };

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <nav
          className={`responsive-navigation desktop ${className}`}
          style={navigationStyle}
          {...props}
        >
          {desktopContent || children}
        </nav>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            style={mobileMenuButtonStyle}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>

          {/* Mobile Menu Overlay */}
          <div
            className="mobile-menu-container"
            style={mobileMenuStyle}
            onClick={closeMobileMenu}
          >
            <div
              className="mobile-menu-content"
              style={mobileMenuContentStyle}
              onClick={(e) => e.stopPropagation()}
            >
              {mobileMenuContent || children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Responsive header component
export const ResponsiveHeader = ({
  children,
  className = "",
  style = {},
  logo = null,
  navigation = null,
  actions = null,
  ...props
}) => {
  const { isMobile } = useResponsiveNavigation();

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "10px 15px" : "15px 30px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  const logoStyle = {
    fontSize: isMobile ? "1.2rem" : "1.5rem",
    fontWeight: "bold",
    color: "#1890ff",
  };

  const navigationStyle = {
    display: isMobile ? "none" : "flex",
    alignItems: "center",
    gap: "20px",
  };

  const actionsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <header
      className={`responsive-header ${className}`}
      style={headerStyle}
      {...props}
    >
      {/* Logo */}
      {logo && (
        <div className="header-logo" style={logoStyle}>
          {logo}
        </div>
      )}

      {/* Desktop Navigation */}
      {navigation && (
        <nav className="header-navigation" style={navigationStyle}>
          {navigation}
        </nav>
      )}

      {/* Actions */}
      {actions && (
        <div className="header-actions" style={actionsStyle}>
          {actions}
        </div>
      )}
    </header>
  );
};

// Responsive sidebar component
export const ResponsiveSidebar = ({
  children,
  className = "",
  style = {},
  width = { xs: "100%", sm: "250px", md: "280px" },
  position = "left",
  collapsible = false,
  collapsed = false,
  onCollapse = null,
  ...props
}) => {
  const { isMobile, getResponsiveValue } = useResponsiveNavigation();

  const currentWidth = getResponsiveValue(width) || "280px";
  const isCollapsed = collapsed && collapsible;

  const sidebarStyle = {
    width: isCollapsed ? "60px" : currentWidth,
    height: "100vh",
    position: isMobile ? "fixed" : "relative",
    top: 0,
    left: position === "left" ? 0 : "auto",
    right: position === "right" ? 0 : "auto",
    backgroundColor: "white",
    borderRight: position === "left" ? "1px solid #f0f0f0" : "none",
    borderLeft: position === "right" ? "1px solid #f0f0f0" : "none",
    overflowY: "auto",
    transition: "width 0.3s ease",
    zIndex: isMobile ? 1000 : "auto",
    transform: isMobile ? "translateX(-100%)" : "none",
    ...style,
  };

  return (
    <aside
      className={`responsive-sidebar ${className}`}
      style={sidebarStyle}
      {...props}
    >
      {children}
    </aside>
  );
};

export default ResponsiveNavigation;
