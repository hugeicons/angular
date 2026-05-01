import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import { IconSvgObject } from '../lib/types';

interface PathData {
  d?: string;
  fill: string;
  opacity?: string;
  fillRule?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
}

type SvgAttrs = Record<string, string | number | undefined>;

/**
 * Convert a non-`path` SVG primitive into an equivalent path `d` string so the
 * single `<path>` template can render every shape Hugeicons emits.
 *
 * Without this, icons that contain `circle`, `ellipse`, `rect`, `line`,
 * `polyline`, or `polygon` lose those elements (they have no `d` attribute and
 * collapse to an empty path). Affects e.g. `CompassIcon`, `AlertCircleIcon`,
 * `MapsLocation01Icon`. See https://github.com/hugeicons/angular/issues/5
 */
function elementToPathD(tag: string, attrs: SvgAttrs): string | undefined {
  if (tag === 'path') return attrs['d'] as string | undefined;

  if (tag === 'circle') {
    const cx = Number(attrs['cx']);
    const cy = Number(attrs['cy']);
    const r = Number(attrs['r']);
    return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
  }

  if (tag === 'ellipse') {
    const cx = Number(attrs['cx']);
    const cy = Number(attrs['cy']);
    const rx = Number(attrs['rx']);
    const ry = Number(attrs['ry']);
    return `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${2 * rx} 0 a ${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
  }

  if (tag === 'rect') {
    const x = Number(attrs['x'] ?? 0);
    const y = Number(attrs['y'] ?? 0);
    const w = Number(attrs['width']);
    const h = Number(attrs['height']);
    return `M ${x} ${y} h ${w} v ${h} h ${-w} Z`;
  }

  if (tag === 'line') {
    return `M ${attrs['x1']} ${attrs['y1']} L ${attrs['x2']} ${attrs['y2']}`;
  }

  if (tag === 'polyline' || tag === 'polygon') {
    const points = String(attrs['points'] ?? '').trim();
    if (!points) return attrs['d'] as string | undefined;
    return 'M ' + points.replace(/\s+/g, ' ').replace(/,/g, ' ') + (tag === 'polygon' ? ' Z' : '');
  }

  return attrs['d'] as string | undefined;
}

@Component({
  selector: 'hugeicons-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      [attr.color]="color()"
      [class]="iconClass()"
      xmlns="http://www.w3.org/2000/svg"
    >
      @for (path of paths(); track $index) {
        <path
          [attr.d]="path.d"
          [attr.fill]="path.fill"
          [attr.opacity]="path.opacity"
          [attr.fill-rule]="path.fillRule"
          [attr.stroke]="path.stroke"
          [attr.stroke-width]="path.strokeWidth"
          [attr.stroke-linecap]="path.strokeLinecap"
          [attr.stroke-linejoin]="path.strokeLinejoin"
        />
      }
    </svg>
  `,
  host: {
    style: 'display: inline-flex; align-items: center; justify-content: center;'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HugeiconsIconComponent {
  // Signal inputs - modern Angular 17.1+ approach
  readonly size = input<string | number>(24);
  readonly strokeWidth = input<number | undefined>(undefined);
  readonly absoluteStrokeWidth = input<boolean>(false);
  readonly icon = input.required<IconSvgObject>();
  readonly altIcon = input<IconSvgObject | undefined>(undefined);
  readonly color = input<string>('currentColor');
  readonly iconClass = input<string>('', { alias: 'class' });
  readonly showAlt = input<boolean>(false);

  // Computed signal for reactive path updates
  readonly paths = computed<PathData[]>(() => {
    const currentIcon = this.showAlt() && this.altIcon() ? this.altIcon()! : this.icon();

    if (!currentIcon || !Array.isArray(currentIcon)) {
      return [];
    }

    const strokeWidthValue = this.strokeWidth();
    const calculatedStrokeWidth = strokeWidthValue !== undefined
      ? (this.absoluteStrokeWidth()
          ? (Number(strokeWidthValue) * 24) / Number(this.size())
          : strokeWidthValue)
      : undefined;

    const strokeProps = calculatedStrokeWidth !== undefined
      ? { strokeWidth: calculatedStrokeWidth, stroke: 'currentColor' }
      : {};

    return currentIcon.map(([tag, attrs]) => {
      const a = attrs as SvgAttrs;
      return {
        d: elementToPathD(tag, a),
        fill: (a['fill'] as string | undefined) || 'none',
        opacity: a['opacity'] as string | undefined,
        fillRule: a['fillRule'] as string | undefined,
        // Round caps/joins are required for near-zero-length paths (dots)
        // to render. The default `butt` linecap collapses them to nothing.
        strokeLinecap: (a['strokeLinecap'] as string | undefined) ?? 'round',
        strokeLinejoin: (a['strokeLinejoin'] as string | undefined) ?? 'round',
        ...strokeProps,
      };
    });
  });
}
