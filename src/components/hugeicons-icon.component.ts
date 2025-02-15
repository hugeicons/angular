import { Component, Input, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSvgObject } from '../lib/types';

@Component({
  selector: 'hugeicons-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      [attr.color]="color"
      [class]="class"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        *ngFor="let path of paths; trackBy: trackByFn"
        [attr.d]="path.d"
        [attr.fill]="path.fill"
        [attr.opacity]="path.opacity"
        [attr.fill-rule]="path.fillRule"
        [attr.stroke-width]="strokeWidth"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HugeiconsIconComponent implements OnInit, OnChanges {
  @Input() size: string | number = 24;
  @Input() strokeWidth = 1.5;
  @Input() icon!: IconSvgObject;
  @Input() altIcon?: IconSvgObject;
  @Input() color = 'currentColor';
  @Input() class = '';
  @Input() showAlt = false;

  paths: Array<{
    d: string;
    fill: string;
    opacity?: string;
    fillRule?: string;
  }> = [];

  ngOnInit() {
    this.updatePaths();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updatePaths();
  }

  private updatePaths() {
    const currentIcon = this.showAlt && this.altIcon ? this.altIcon : this.icon;

    if (!currentIcon || !Array.isArray(currentIcon)) {
      this.paths = [];
      return;
    }

    this.paths = currentIcon.map(([_, attrs]) => ({
      d: attrs['d'],
      fill: attrs['fill'] || 'none',
      opacity: attrs['opacity'],
      fillRule: attrs['fillRule'],
      strokeWidth: attrs['strokeWidth'] || this.strokeWidth
    }));
  }

  trackByFn(index: number) {
    return index;
  }
}