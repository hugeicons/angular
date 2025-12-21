![31c9262e-aeea-4403-9086-3c8b88885cab](https://github.com/hugeicons/hugeicons-react/assets/130147052/ff91f2f0-095a-4c6d-8942-3af4759f9021)

# @hugeicons/angular

> Hugeicons Pro Angular Component Library - Beautiful and customizable icons for your Angular applications

## What is Hugeicons?

Hugeicons is a comprehensive icon library designed for modern web and mobile applications. The free package includes 4,000+ carefully crafted icons in the Stroke Rounded style, while the pro version offers over 45,000 icons across 10 unique styles.

### Key Highlights
- **4,000+ Free Icons**: Extensive collection of Stroke Rounded icons covering essential UI elements, actions, and concepts
- **Pixel Perfect**: Every icon is crafted on a 24x24 pixel grid ensuring crisp, clear display at any size
- **Customizable**: Easily adjust colors, sizes, and styles to match your design needs
- **Regular Updates**: New icons added regularly to keep up with evolving design trends

> 📚 **Looking for Pro Icons?** Check out our comprehensive documentation at [docs.hugeicons.com](https://docs.hugeicons.com) for detailed information about pro icons, styles, and advanced usage.

![a40aa766-1b04-4a2a-a2e6-0ec3c492b96a](https://github.com/hugeicons/hugeicons-react/assets/130147052/f82c0e0e-60ae-4617-802f-812cdc7a58da)

## Table of Contents
- [What is Hugeicons?](#what-is-hugeicons)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Inputs](#inputs)
- [Examples](#examples)
  - [Basic Usage](#basic-usage)
  - [Custom Size and Color](#custom-size-and-color)
  - [Interactive Examples](#interactive-examples)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Browser Support](#browser-support)
- [Related Packages](#related-packages)
- [Pro Version](#pro-version)
- [License](#license)
- [Related](#related)

## Features

- 🎨 Customizable colors and sizes
- 💪 TypeScript support with full type definitions
- 🎯 Tree-shakeable for optimal bundle size
- 📦 Multiple bundle formats (ESM, CJS, UMD)
- ⚡ Lightweight and optimized
- 🔄 Alternate icon support for dynamic interactions

## Installation

```bash
# Using npm
npm install @hugeicons/angular @hugeicons/core-free-icons

# Using yarn
yarn add @hugeicons/angular @hugeicons/core-free-icons

# Using pnpm
pnpm add @hugeicons/angular @hugeicons/core-free-icons

# Using bun
bun add @hugeicons/angular @hugeicons/core-free-icons
```

## Usage

The `HugeiconsIconComponent` is a standalone component. Import it directly in your component:

```typescript
// your.component.ts
import { Component } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';
import { SearchIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [HugeiconsIconComponent],
  template: `
    <hugeicons-icon
      [icon]="icon"
      [size]="24"
      color="currentColor"
      [strokeWidth]="1.5"
    />
  `
})
export class YourComponent {
  icon = SearchIcon;
}
```

### NgModule Usage (Legacy)

If you're using NgModules, import the component in your module:

```typescript
import { NgModule } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular';

@NgModule({
  imports: [HugeiconsIconComponent],
  // ...
})
export class AppModule { }
```

## Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `icon` | `[string, Record<string, any>][]` | Required | The main icon to display (array of SVG elements and their attributes) |
| `size` | `number \| string` | `24` | Icon size in pixels. Must be a positive number. String values will be parsed to numbers |
| `strokeWidth` | `number \| undefined` | `undefined` | Width of the icon strokes (works with stroke-style icons) |
| `altIcon` | `[string, Record<string, any>][]` | `undefined` | Alternative icon that can be used for states, interactions, or animations |
| `showAlt` | `boolean` | `false` | When true, displays the altIcon instead of the main icon |
| `color` | `string` | `currentColor` | Icon color (CSS color value) |

Note: 
- The component accepts all standard SVG attributes which will be passed to the root SVG element.
- The `size` input accepts both numbers and strings, but strings will be parsed to numbers and must result in a positive number.
- Icon arrays are tuples of `[elementName: string, attributes: Record<string, any>][]` representing SVG elements.

## Examples

### Basic Usage
```typescript
// basic.component.ts
import { Component } from '@angular/core';
import { SearchIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-basic',
  template: `
    <hugeicons-icon [icon]="icon"></hugeicons-icon>
  `
})
export class BasicComponent {
  icon = SearchIcon;
}
```

### Custom Size and Color
```typescript
// custom.component.ts
import { Component } from '@angular/core';
import { NotificationIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-custom',
  template: `
    <hugeicons-icon
      [icon]="icon"
      [size]="32"
      color="#FF5733"
    ></hugeicons-icon>
  `
})
export class CustomComponent {
  icon = NotificationIcon;
}
```

### Interactive Examples

#### Search Bar with Clear Button
```typescript
// search.component.ts
import { Component } from '@angular/core';
import { SearchIcon, CloseCircleIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-search',
  template: `
    <div>
      <input
        [(ngModel)]="searchValue"
        type="text"
        placeholder="Search..."
      />
      <hugeicons-icon
        [icon]="SearchIcon"
        [altIcon]="CloseCircleIcon"
        [showAlt]="searchValue.length > 0"
        (click)="clearSearch()"
      ></hugeicons-icon>
    </div>
  `
})
export class SearchComponent {
  searchValue = '';
  SearchIcon = SearchIcon;
  CloseCircleIcon = CloseCircleIcon;

  clearSearch(): void {
    if (this.searchValue.length > 0) {
      this.searchValue = '';
    }
  }
}
```

#### Theme Toggle
```typescript
// theme-toggle.component.ts
import { Component } from '@angular/core';
import { SunIcon, MoonIcon } from '@hugeicons/core-free-icons';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button (click)="toggleTheme()">
      <hugeicons-icon
        [icon]="SunIcon"
        [altIcon]="MoonIcon"
        [showAlt]="isDark"
      ></hugeicons-icon>
    </button>
  `
})
export class ThemeToggleComponent {
  isDark = false;
  SunIcon = SunIcon;
  MoonIcon = MoonIcon;

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }
}
```

## Performance

- **Tree-shaking**: The package is fully tree-shakeable, ensuring only the icons you use are included in your final bundle
- **Optimized SVGs**: All icons are optimized for size and performance
- **Code Splitting**: Icons can be easily code-split when using dynamic imports

## Troubleshooting

### Common Issues

1. **Icons not showing up?**
   - Make sure you've installed both `@hugeicons/angular` and `@hugeicons/core-free-icons`
   - Check that the HugeiconsModule is properly imported in your module
   - Verify that icon names are correctly imported

2. **TypeScript errors?**
   - Ensure your `tsconfig.json` includes the necessary type definitions
   - Check that you're using the latest version of the package

3. **Bundle size concerns?**
   - Use named imports instead of importing the entire icon set
   - Implement code splitting for different sections of your app

## Browser Support

The library supports all modern browsers.

## Related Packages

- [@hugeicons/react](https://www.npmjs.com/package/@hugeicons/react) - React component
- [@hugeicons/vue](https://www.npmjs.com/package/@hugeicons/vue) - Vue component
- [@hugeicons/svelte](https://www.npmjs.com/package/@hugeicons/svelte) - Svelte component
- [@hugeicons/react-native](https://www.npmjs.com/package/@hugeicons/react-native) - React Native component

## Pro Version

> 🌟 **Want access to 45,000+ icons and 10 unique styles?** 
> Check out our [Pro Version](https://hugeicons.com/pricing) and visit [docs.hugeicons.com](https://docs.hugeicons.com) for comprehensive documentation.

### Available Pro Styles
- **Stroke Styles**
  - Stroke Rounded (`@hugeicons-pro/core-stroke-rounded`)
  - Stroke Sharp (`@hugeicons-pro/core-stroke-sharp`)
  - Stroke Standard (`@hugeicons-pro/core-stroke-standard`)
- **Solid Styles**
  - Solid Rounded (`@hugeicons-pro/core-solid-rounded`)
  - Solid Sharp (`@hugeicons-pro/core-solid-sharp`)
  - Solid Standard (`@hugeicons-pro/core-solid-standard`)
- **Special Styles**
  - Bulk Rounded (`@hugeicons-pro/core-bulk-rounded`)
  - Duotone Rounded (`@hugeicons-pro/core-duotone-rounded`)
  - Duotone Standard (`@hugeicons-pro/core-duotone-standard`)
  - Twotone Rounded (`@hugeicons-pro/core-twotone-rounded`)

## License

This project is licensed under the [MIT License](LICENSE.md).

## Related

- [@hugeicons/core-free-icons](https://www.npmjs.com/package/@hugeicons/core-free-icons) - Free icon package
- [Hugeicons Website](https://hugeicons.com) - Browse all available icons 
