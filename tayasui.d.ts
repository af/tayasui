import type { DetailedHTMLProps, HTMLAttributes } from 'react'

interface StackAttrs {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  justify?: 'start' | 'space-between'
  gap?: 's' | 'm' | 'l'
}

interface BadgeAttrs {
  type?: 'primary' | 'secondary' | 'danger' | 'inactive'
}

// via https://til.jakelazaroff.com/typescript/add-custom-element-to-jsx-intrinsic-elements/
declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'vstack-i': DetailedHTMLProps<HTMLAttributes<HTMLElement> & StackAttrs, HTMLElement>
      'hstack-i': DetailedHTMLProps<HTMLAttributes<HTMLElement> & StackAttrs, HTMLElement>

      'badge-i': DetailedHTMLProps<HTMLAttributes<HTMLElement> & BadgeAttrs, HTMLElement>
      'card-i': DetailedHTMLProps<HTMLAttributes<HTMLElement> & BadgeAttrs, HTMLElement>

      'switch-i': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      'labelledfield-i': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
