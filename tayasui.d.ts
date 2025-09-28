import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type BlockAttrs = {
  gap?: 'xs' | 's' | 'm' | 'l'
  pad?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
  vpad?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl'
}

type StackAttrs = BlockAttrs & {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'center' | 'start' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

// biome-ignore lint/complexity/noBannedTypes: {} is intentional here
type CustomElementProps<T = {}> = DetailedHTMLProps<HTMLAttributes<HTMLElement> & T, HTMLElement>

// via https://til.jakelazaroff.com/typescript/add-custom-element-to-jsx-intrinsic-elements/
// TODO: find a framework-agnostic way to register these
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'container-i': CustomElementProps<
        BlockAttrs & {
          direction?: 'column' | 'row' | 'row-reverse' | 'responsive'
          variant?: 'narrow'
        }
      >
      'vstack-i': CustomElementProps<StackAttrs>
      'hstack-i': CustomElementProps<StackAttrs & { breakpoint?: 's' | 'm' }>
      'zstack-i': CustomElementProps<{
        arrange?: 'fan-up' | 'fan-right'
      }>

      'alert-i': CustomElementProps<{
        level?: 'success' | 'warn' | 'danger'
      }>
      'skeleton-i': CustomElementProps<{
        width?: 's' | 'm' | 'l' | 'xl'
        radius?: 's' | 'm' | 'full' | 'none'
      }>
      'badge-i': CustomElementProps<{
        type?: 'primary' | 'danger' | 'neutral'
        radius?: 's' | 'm' | 'full' | 'none'
      }>
      'card-i': CustomElementProps<BlockAttrs>

      'switch-i': CustomElementProps
      'labelledfield-i': CustomElementProps
    }
  }
}
