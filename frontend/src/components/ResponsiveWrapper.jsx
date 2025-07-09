import React from "react";
import { useResponsive } from "../hooks/useResponsive";

// Responsive wrapper component
const ResponsiveWrapper = ({
  children,
  className = "",
  style = {},
  mobileProps = {},
  tabletProps = {},
  desktopProps = {},
  breakpointProps = {},
  ...props
}) => {
  const { breakpoint, isMobile, isTablet, isDesktop } = useResponsive();

  // Get responsive props based on current breakpoint
  const getResponsiveProps = () => {
    if (isMobile && mobileProps) return mobileProps;
    if (isTablet && tabletProps) return tabletProps;
    if (isDesktop && desktopProps) return desktopProps;
    return {};
  };

  // Get breakpoint-specific props
  const getBreakpointProps = () => {
    return breakpointProps[breakpoint] || {};
  };

  // Merge all props
  const responsiveProps = {
    ...getResponsiveProps(),
    ...getBreakpointProps(),
  };

  // Merge styles
  const mergedStyle = {
    ...style,
    ...responsiveProps.style,
  };

  // Merge className
  const mergedClassName = [
    className,
    responsiveProps.className,
    `responsive-${breakpoint}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      {...props}
      {...responsiveProps}
      className={mergedClassName}
      style={mergedStyle}
    >
      {children}
    </div>
  );
};

// Responsive grid component
export const ResponsiveGrid = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  gap = { xs: 10, sm: 12, md: 15, lg: 18, xl: 20 },
  className = "",
  style = {},
  ...props
}) => {
  const { breakpoint, getResponsiveValue } = useResponsive();

  const currentColumns = getResponsiveValue(columns) || 1;
  const currentGap = getResponsiveValue(gap) || 15;

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${currentColumns}, 1fr)`,
    gap: `${currentGap}px`,
    ...style,
  };

  return (
    <div
      className={`responsive-grid ${className}`}
      style={gridStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive container component
export const ResponsiveContainer = ({
  children,
  maxWidth = {
    xs: "100%",
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
  },
  padding = { xs: 10, sm: 15, md: 20, lg: 25, xl: 30 },
  className = "",
  style = {},
  ...props
}) => {
  const { getResponsiveValue } = useResponsive();

  const currentMaxWidth = getResponsiveValue(maxWidth) || "100%";
  const currentPadding = getResponsiveValue(padding) || 20;

  const containerStyle = {
    maxWidth: currentMaxWidth,
    padding: `0 ${currentPadding}px`,
    margin: "0 auto",
    ...style,
  };

  return (
    <div
      className={`responsive-container ${className}`}
      style={containerStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive text component
export const ResponsiveText = ({
  children,
  size = { xs: 14, sm: 16, md: 18, lg: 20, xl: 22 },
  weight = "normal",
  className = "",
  style = {},
  as = "p",
  ...props
}) => {
  const { getResponsiveValue } = useResponsive();

  const currentSize = getResponsiveValue(size) || 16;

  const textStyle = {
    fontSize: `${currentSize}px`,
    fontWeight: weight,
    ...style,
  };

  const Component = as;

  return (
    <Component
      className={`responsive-text ${className}`}
      style={textStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

// Responsive spacing component
export const ResponsiveSpacing = ({
  children,
  margin = { xs: 10, sm: 15, md: 20, lg: 25, xl: 30 },
  padding = { xs: 10, sm: 15, md: 20, lg: 25, xl: 30 },
  className = "",
  style = {},
  ...props
}) => {
  const { getResponsiveValue } = useResponsive();

  const currentMargin = getResponsiveValue(margin) || 20;
  const currentPadding = getResponsiveValue(padding) || 20;

  const spacingStyle = {
    margin: `${currentMargin}px 0`,
    padding: `${currentPadding}px`,
    ...style,
  };

  return (
    <div
      className={`responsive-spacing ${className}`}
      style={spacingStyle}
      {...props}
    >
      {children}
    </div>
  );
};

// Responsive visibility component
export const ResponsiveVisibility = ({
  children,
  visible = true,
  breakpoints = {},
  className = "",
  ...props
}) => {
  const { breakpoint, isVisible } = useResponsive();

  // Check if component should be visible
  const shouldShow =
    typeof visible === "boolean" ? visible : isVisible(breakpoints);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className={`responsive-visibility ${className}`} {...props}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
