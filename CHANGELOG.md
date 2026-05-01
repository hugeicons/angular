# @hugeicons/angular


## Unreleased

### Patch Changes

- Fixed icons that use non-`path` SVG primitives (`circle`, `ellipse`, `rect`, `line`, `polyline`, `polygon`) rendering as empty paths. Affects e.g. `CompassIcon`, `AlertCircleIcon`, `MapsLocation01Icon`. Closes #5.
- Fixed near-zero-length paths (icon dots) being invisible by preserving `strokeLinecap` / `strokeLinejoin` (defaulting to `round`) when extracting attributes.


## 1.0.7

### Patch Changes

- Updated documentation icon counts to 5,100+ free / 51,000+ pro


## 1.0.6

### Patch Changes

- Fixed TypeScript type compatibility issue with icon data packages
- `IconSvgObject` now accepts both strict (`SvgPathAttributes`) and loose path attribute formats
- Resolves "Property 'd' is missing" type error when using icons from `@hugeicons/core-*` packages


## 1.0.5

### Patch Changes

- Added "How It Works" section explaining the rendering library concept
- Standardized documentation structure across all framework packages
- Updated icon counts to 4,600+ free / 46,000+ pro
- Updated docs URL to hugeicons.com/docs
- Updated to use single image source from React repository


## 1.0.0

### Major Changes

- Initial release
- Standalone component support
- Signal-based inputs for Angular 17.1+
- Full TypeScript support
