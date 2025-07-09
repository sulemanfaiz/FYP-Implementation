import { useState, useEffect } from "react";

// Responsive breakpoints
const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
};

// Hook to get current screen size and responsive utilities
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [breakpoint, setBreakpoint] = useState("xl");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({ width, height });

      // Determine breakpoint
      if (width < BREAKPOINTS.xs) {
        setBreakpoint("xs");
      } else if (width < BREAKPOINTS.sm) {
        setBreakpoint("sm");
      } else if (width < BREAKPOINTS.md) {
        setBreakpoint("md");
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint("lg");
      } else if (width < BREAKPOINTS.xl) {
        setBreakpoint("xl");
      } else {
        setBreakpoint("xxl");
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive utilities
  const isMobile = breakpoint === "xs" || breakpoint === "sm";
  const isTablet = breakpoint === "md";
  const isDesktop =
    breakpoint === "lg" || breakpoint === "xl" || breakpoint === "xxl";
  const isSmallScreen = breakpoint === "xs";
  const isMediumScreen = breakpoint === "sm" || breakpoint === "md";
  const isLargeScreen =
    breakpoint === "lg" || breakpoint === "xl" || breakpoint === "xxl";

  // Responsive values based on breakpoint
  const getResponsiveValue = (values) => {
    if (breakpoint === "xs" && values.xs !== undefined) return values.xs;
    if (breakpoint === "sm" && values.sm !== undefined) return values.sm;
    if (breakpoint === "md" && values.md !== undefined) return values.md;
    if (breakpoint === "lg" && values.lg !== undefined) return values.lg;
    if (breakpoint === "xl" && values.xl !== undefined) return values.xl;
    if (breakpoint === "xxl" && values.xxl !== undefined) return values.xxl;

    // Fallback to the closest available value
    if (values.xs !== undefined) return values.xs;
    if (values.sm !== undefined) return values.sm;
    if (values.md !== undefined) return values.md;
    if (values.lg !== undefined) return values.lg;
    if (values.xl !== undefined) return values.xl;
    if (values.xxl !== undefined) return values.xxl;

    return null;
  };

  // Grid columns based on screen size
  const getGridColumns = () => {
    switch (breakpoint) {
      case "xs":
        return 1;
      case "sm":
        return 2;
      case "md":
        return 3;
      case "lg":
        return 4;
      case "xl":
        return 5;
      case "xxl":
        return 6;
      default:
        return 4;
    }
  };

  // Spacing based on screen size
  const getSpacing = () => {
    switch (breakpoint) {
      case "xs":
        return 8;
      case "sm":
        return 12;
      case "md":
        return 16;
      case "lg":
        return 20;
      case "xl":
        return 24;
      case "xxl":
        return 28;
      default:
        return 16;
    }
  };

  // Font sizes based on screen size
  const getFontSize = (baseSize = 16) => {
    const multipliers = {
      xs: 0.875,
      sm: 0.9,
      md: 1,
      lg: 1.1,
      xl: 1.2,
      xxl: 1.3,
    };
    return Math.round(baseSize * multipliers[breakpoint] || 1);
  };

  return {
    screenSize,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    getResponsiveValue,
    getGridColumns,
    getSpacing,
    getFontSize,
    breakpoints: BREAKPOINTS,
  };
};

// Hook for responsive visibility
export const useResponsiveVisibility = () => {
  const { breakpoint } = useResponsive();

  const isVisible = (visibility) => {
    if (typeof visibility === "string") {
      return visibility === breakpoint;
    }
    if (Array.isArray(visibility)) {
      return visibility.includes(breakpoint);
    }
    if (typeof visibility === "object") {
      return visibility[breakpoint] || false;
    }
    return true;
  };

  const isHidden = (visibility) => !isVisible(visibility);

  return { isVisible, isHidden };
};

// Hook for responsive layout
export const useResponsiveLayout = () => {
  const { breakpoint, isMobile, isTablet, isDesktop } = useResponsive();

  const layout = {
    // Sidebar behavior
    sidebar: {
      width: isMobile ? "100%" : isTablet ? "250px" : "280px",
      position: isMobile ? "fixed" : "relative",
      transform: isMobile ? "translateX(-100%)" : "none",
    },

    // Main content
    mainContent: {
      marginLeft: isMobile ? "0" : isTablet ? "250px" : "280px",
      padding: isMobile ? "10px" : "20px",
    },

    // Header
    header: {
      height: isMobile ? "60px" : "70px",
      padding: isMobile ? "8px 10px" : "12px 20px",
    },

    // Footer
    footer: {
      padding: isMobile ? "20px 10px" : "30px 20px",
    },

    // Grid
    grid: {
      columns: isMobile ? 1 : isTablet ? 2 : 3,
      gap: isMobile ? "10px" : isTablet ? "15px" : "20px",
    },

    // Cards
    card: {
      padding: isMobile ? "12px" : "16px",
      marginBottom: isMobile ? "12px" : "16px",
    },

    // Forms
    form: {
      labelCol: isMobile ? { span: 24 } : { span: 6 },
      wrapperCol: isMobile ? { span: 24 } : { span: 18 },
    },
  };

  return layout;
};

// Hook for responsive navigation
export const useResponsiveNavigation = () => {
  const { isMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    isMobile,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
};
