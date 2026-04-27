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
4. In your main css entrypoint:
* add css layer declarations, eg:
```
/* `app` can be replaced with whichever higher-precedence layers you'd like */
@layer taya-reset, taya-base, taya-components, app;` 
```
* add your theme variables in a `:root { }` block
