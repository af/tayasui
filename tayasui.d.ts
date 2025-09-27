import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type StackAttrs = {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'center' | 'start' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: 'xs' | 's' | 'm' | 'l'
}

type HStackAttrs = StackAttrs & {
  breakpoint?: 's' | 'm'
}

// biome-ignore lint/complexity/noBannedTypes: {} is intentional here
type CustomElementProps<T = {}> = DetailedHTMLProps<HTMLAttributes<HTMLElement> & T, HTMLElement>

// via https://til.jakelazaroff.com/typescript/add-custom-element-to-jsx-intrinsic-elements/
// TODO: find a framework-agnostic way to register these
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'container-i': CustomElementProps<{
        direction?: 'column' | 'row' | 'row-reverse' | 'responsive'
        variant?: 'narrow'
        gap?: 's' | 'm' | 'l'
        vpad?: 's' | 'm' | 'l' | 'xl'
      }>
      'vstack-i': CustomElementProps<StackAttrs>
      'hstack-i': CustomElementProps<HStackAttrs>
      'zstack-i': CustomElementProps<{
        arrange?: 'fan-up' | 'fan-right'
      }>

      'alert-i': CustomElementProps<{
        variant?: 'callout'
        level?: 'success' | 'danger'
      }>
      'skeleton-i': CustomElementProps<{
        width?: 's' | 'm' | 'l' | 'xl'
        radius?: 's' | 'm' | 'full' | 'none'
      }>
      'badge-i': CustomElementProps<{
        type?: 'primary' | 'danger' | 'neutral'
        radius?: 's' | 'm' | 'full'
      }>
      'card-i': CustomElementProps<{
        padding?: 's' | 'm'
      }>

      'switch-i': CustomElementProps
      'labelledfield-i': CustomElementProps
    }
  }
}
