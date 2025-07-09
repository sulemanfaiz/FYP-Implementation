# Responsive Design System Guide

This guide explains how to use the responsive design system that has been implemented for your website. The system is designed to work alongside your existing CSS without affecting your current code logic.

## 🚀 Quick Start

The responsive system is already imported globally in your `App.js`. You can start using it immediately without any additional setup.

## 📱 Breakpoints

The system uses the following breakpoints:

- **XS (Extra Small)**: < 576px (Mobile phones)
- **SM (Small)**: 576px - 767px (Large phones)
- **MD (Medium)**: 768px - 991px (Tablets)
- **LG (Large)**: 992px - 1199px (Small desktops)
- **XL (Extra Large)**: 1200px - 1599px (Large desktops)
- **XXL (Extra Extra Large)**: ≥ 1600px (Extra large screens)

## 🛠️ Available Tools

### 1. Global CSS Classes

You can use these utility classes directly in your JSX:

```jsx
// Responsive grid
<div className="responsive-grid">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Responsive spacing
<div className="responsive-padding">
  Content with responsive padding
</div>

// Hide/show elements
<div className="hidden-xs">Hidden on mobile</div>
<div className="visible-xs">Only visible on mobile</div>
```

### 2. Custom Hooks

#### useResponsive Hook

```jsx
import { useResponsive } from "../hooks/useResponsive";

function MyComponent() {
  const {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    screenSize,
    getResponsiveValue,
    getGridColumns,
    getSpacing,
    getFontSize,
  } = useResponsive();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      <p>Is mobile: {isMobile ? "Yes" : "No"}</p>

      {/* Responsive values */}
      <div style={{ fontSize: getFontSize(16) }}>Responsive text</div>
    </div>
  );
}
```

#### useResponsiveLayout Hook

```jsx
import { useResponsiveLayout } from "../hooks/useResponsive";

function MyComponent() {
  const layout = useResponsiveLayout();

  return (
    <div style={layout.mainContent}>
      <div style={layout.card}>Card content</div>
    </div>
  );
}
```

#### useResponsiveNavigation Hook

```jsx
import { useResponsiveNavigation } from "../hooks/useResponsive";

function MyComponent() {
  const { isMobile, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useResponsiveNavigation();

  return (
    <div>{isMobile && <button onClick={toggleMobileMenu}>Menu</button>}</div>
  );
}
```

### 3. Responsive Components

#### ResponsiveWrapper

```jsx
import ResponsiveWrapper from "../components/ResponsiveWrapper";

function MyComponent() {
  return (
    <ResponsiveWrapper
      mobileProps={{
        style: { padding: "10px" },
        className: "mobile-only",
      }}
      tabletProps={{
        style: { padding: "20px" },
        className: "tablet-only",
      }}
      desktopProps={{
        style: { padding: "30px" },
        className: "desktop-only",
      }}
    >
      <div>Responsive content</div>
    </ResponsiveWrapper>
  );
}
```

#### ResponsiveGrid

```jsx
import { ResponsiveGrid } from "../components/ResponsiveWrapper";

function MyComponent() {
  return (
    <ResponsiveGrid
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gap={{ xs: 10, sm: 12, md: 15, lg: 18, xl: 20 }}
    >
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </ResponsiveGrid>
  );
}
```

#### ResponsiveContainer

```jsx
import { ResponsiveContainer } from "../components/ResponsiveWrapper";

function MyComponent() {
  return (
    <ResponsiveContainer
      maxWidth={{
        xs: "100%",
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
      }}
      padding={{ xs: 10, sm: 15, md: 20, lg: 25, xl: 30 }}
    >
      <div>Centered content with responsive max-width</div>
    </ResponsiveContainer>
  );
}
```

#### ResponsiveText

```jsx
import { ResponsiveText } from "../components/ResponsiveWrapper";

function MyComponent() {
  return (
    <ResponsiveText
      size={{ xs: 14, sm: 16, md: 18, lg: 20, xl: 22 }}
      weight="bold"
      as="h1"
    >
      Responsive heading
    </ResponsiveText>
  );
}
```

#### ResponsiveNavigation

```jsx
import ResponsiveNavigation from "../components/ResponsiveNavigation";

function MyComponent() {
  return (
    <ResponsiveNavigation
      desktopContent={<div>Desktop navigation content</div>}
      mobileMenuContent={<div>Mobile menu content</div>}
    />
  );
}
```

## 📋 Common Use Cases

### 1. Making Existing Components Responsive

If you have an existing component that needs responsive behavior:

```jsx
// Before
function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <h3>{property.title}</h3>
      <p>{property.description}</p>
    </div>
  );
}

// After - Using ResponsiveWrapper
import ResponsiveWrapper from "../components/ResponsiveWrapper";

function PropertyCard({ property }) {
  return (
    <ResponsiveWrapper
      mobileProps={{
        style: { marginBottom: "10px", padding: "10px" },
      }}
      desktopProps={{
        style: { marginBottom: "20px", padding: "20px" },
      }}
    >
      <div className="property-card">
        <h3>{property.title}</h3>
        <p>{property.description}</p>
      </div>
    </ResponsiveWrapper>
  );
}
```

### 2. Responsive Grid Layout

```jsx
import { ResponsiveGrid } from "../components/ResponsiveWrapper";

function PropertyList({ properties }) {
  return (
    <ResponsiveGrid
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gap={{ xs: 10, sm: 12, md: 15, lg: 18, xl: 20 }}
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </ResponsiveGrid>
  );
}
```

### 3. Responsive Navigation

```jsx
import ResponsiveNavigation, {
  ResponsiveHeader,
} from "../components/ResponsiveNavigation";

function Header() {
  return (
    <ResponsiveHeader
      logo="KirayaPe"
      navigation={
        <nav>
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/about">About</a>
        </nav>
      }
      actions={
        <div>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
      }
    />
  );
}
```

### 4. Responsive Forms

```jsx
import { useResponsiveLayout } from "../hooks/useResponsive";

function PropertyForm() {
  const layout = useResponsiveLayout();

  return (
    <Form labelCol={layout.form.labelCol} wrapperCol={layout.form.wrapperCol}>
      <Form.Item label="Title">
        <Input />
      </Form.Item>
      <Form.Item label="Description">
        <TextArea />
      </Form.Item>
    </Form>
  );
}
```

## 🎨 CSS Classes Reference

### Utility Classes

| Class                 | Description                         |
| --------------------- | ----------------------------------- |
| `.responsive-grid`    | Responsive grid layout              |
| `.responsive-padding` | Responsive padding                  |
| `.responsive-margin`  | Responsive margin                   |
| `.hidden-xs`          | Hidden on extra small screens       |
| `.hidden-sm`          | Hidden on small screens             |
| `.hidden-md`          | Hidden on medium screens            |
| `.hidden-lg`          | Hidden on large screens             |
| `.hidden-xl`          | Hidden on extra large screens       |
| `.visible-xs`         | Only visible on extra small screens |
| `.visible-sm`         | Only visible on small screens       |
| `.visible-md`         | Only visible on medium screens      |
| `.visible-lg`         | Only visible on large screens       |
| `.visible-xl`         | Only visible on extra large screens |

### Component Classes

| Class                    | Description           |
| ------------------------ | --------------------- |
| `.responsive-container`  | Responsive container  |
| `.responsive-text`       | Responsive text       |
| `.responsive-spacing`    | Responsive spacing    |
| `.responsive-visibility` | Responsive visibility |
| `.responsive-navigation` | Responsive navigation |
| `.responsive-header`     | Responsive header     |
| `.responsive-sidebar`    | Responsive sidebar    |

## 🔧 Customization

### Adding Custom Breakpoints

You can modify the breakpoints in `src/hooks/useResponsive.js`:

```javascript
const BREAKPOINTS = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
};
```

### Adding Custom Responsive Styles

You can add custom responsive styles to `src/responsive.css`:

```css
/* Custom responsive styles */
@media (max-width: 575.98px) {
  .my-custom-class {
    font-size: 14px !important;
    padding: 10px !important;
  }
}
```

## 🚨 Important Notes

1. **No Breaking Changes**: The responsive system is designed to work alongside your existing CSS without breaking anything.

2. **Mobile-First Approach**: The system uses a mobile-first approach, meaning styles are written for mobile devices first, then enhanced for larger screens.

3. **Performance**: The responsive hooks are optimized for performance and only re-render when the screen size actually changes.

4. **Accessibility**: The system includes accessibility features like proper touch targets and reduced motion support.

5. **Browser Support**: The system works with all modern browsers and includes fallbacks for older browsers.

## 🎯 Best Practices

1. **Use the hooks**: Prefer using the responsive hooks over CSS media queries when possible for better maintainability.

2. **Test on real devices**: Always test your responsive design on actual devices, not just browser dev tools.

3. **Progressive enhancement**: Start with mobile styles and enhance for larger screens.

4. **Performance**: Use the responsive components sparingly to avoid performance issues.

5. **Consistency**: Use the same breakpoints and spacing throughout your application.

## 🆘 Troubleshooting

### Common Issues

1. **Styles not applying**: Make sure you're using `!important` in the responsive CSS or use the responsive components.

2. **Hooks not working**: Ensure the hooks are imported correctly and used within React components.

3. **Mobile menu not working**: Check that the ResponsiveNavigation component is properly configured.

### Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Verify that the responsive CSS is loaded
3. Test on different screen sizes
4. Use the browser dev tools to inspect responsive behavior

---

This responsive system provides a comprehensive solution for making your website responsive without affecting your existing code logic. Use it as needed and customize it to fit your specific requirements.
