# Tayasui

Experiments with custom elements

## Setup

1. Install the package
2. Add to your tsconfig.json:

```json
  {
    ...
    "compilerOptions": {
      "types": ["tayasui"]
    }
  }
```
3. Include the main css file, eg `import 'tayasui/src/all.css'` (assuming Vite)
4. Add your theme variables in a `:root { }` block somewhere in your css
