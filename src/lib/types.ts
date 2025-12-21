/** SVG path attributes */
export interface SvgPathAttributes {
  d: string;
  fill?: string;
  opacity?: string;
  fillRule?: 'nonzero' | 'evenodd';
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  [key: string]: unknown;
}

/** Icon SVG object type - tuple of [element name, attributes] */
export type IconSvgObject = readonly (readonly [string, SvgPathAttributes])[];

export type IconName = string;

/** Icon style variants */
export type IconStyle = 
  | 'stroke-rounded'
  | 'stroke-sharp'
  | 'stroke-standard'
  | 'solid-rounded'
  | 'solid-sharp'
  | 'solid-standard'
  | 'bulk-rounded'
  | 'duotone-rounded'
  | 'duotone-standard'
  | 'twotone-rounded';

export interface IconMetadata {
  name: IconName;
  category: string;
  tags: string[];
  pack: string;
  style?: IconStyle;
}

export interface IconData {
  icon: IconSvgObject;
  metadata: IconMetadata;
}

export interface HugeiconsProps {
  size?: string | number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  icon: IconSvgObject;
  altIcon?: IconSvgObject;
  color?: string;
  class?: string;
  showAlt?: boolean;
} 