const size = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
};

export const devices = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width: 769px) and (max-width: ${size.tablet})`,
  desktop: `(min-width: 1025px)`,
};

// Alternative approach - Mobile First (Recommended):
export const devicesMinFirst = {
  mobile: `(max-width: 768px)`, // 0px to 768px
  tablet: `(min-width: 769px)`, // 769px and up
  desktop: `(min-width: 1025px)`, // 1025px and up
};

// Or you can use this more explicit approach:
export const devicesExplicit = {
  mobile: `(max-width: 768px)`, // Mobile only
  tablet: `(min-width: 769px) and (max-width: 1024px)`, // Tablet only
  desktop: `(min-width: 1025px)`, // Desktop and up
};
