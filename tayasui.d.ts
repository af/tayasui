import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type StackAttrs = {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'start' | 'space-between'
  gap?: 's' | 'm' | 'l'
}

type HStackAttrs = StackAttrs & {
  breakpoint?: 's' | 'm'
}

type ZStackAttrs = {
  arrange?: 'fan-up' | 'fan-right'
}

type BadgeAttrs = {
  type?: 'primary' | 'secondary' | 'danger' | 'inactive'
}

type CardAttrs = {
  padding?: 's' | 'm'
}

type CustomElementProps<T = {}> = DetailedHTMLProps<HTMLAttributes<HTMLElement> & T, HTMLElement>

// via https://til.jakelazaroff.com/typescript/add-custom-element-to-jsx-intrinsic-elements/
// TODO: find a framework-agnostic way to register these
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'vstack-i': CustomElementProps<StackAttrs>
      'hstack-i': CustomElementProps<HStackAttrs>
      'zstack-i': CustomElementProps<ZStackAttrs>

      'badge-i': CustomElementProps<BadgeAttrs>
      'card-i': CustomElementProps<CardAttrs>

      'switch-i': CustomElementProps
      'labelledfield-i': CustomElementProps
    }
  }
}
