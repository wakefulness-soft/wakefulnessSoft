# Hooks folder — how to create React hooks for this project

This document explains the conventions used when adding custom React hooks to the src/hooks folder.

Principles
- Keep hooks focused: one responsibility per hook.
- Use consistent naming: use the useXxx prefix (e.g. useAuth, useFetch).
- Export hooks as default exports from their file and re-export from index for easy imports.

File structure
- src/hooks/
	- index.ts (or index.js) — re-exports all hooks
	- useExample.ts (or .js) — hook implementation

Creating a hook
1. Create a new file named useYourThing.ts (or .js) in src/hooks.
2. Implement the hook. Keep side effects in useEffect and memoize values with useMemo or useCallback when needed.

Example (TypeScript):
```ts
import { useState, useEffect } from 'react'

export default function useExample(initial = 0) {
	const [count, setCount] = useState(initial)

	useEffect(() => {
		// side effect or subscription
		return () => {
			// cleanup
		}
	}, [])

	return { count, setCount }
}
```

Index re-export
```ts
export { default as useExample } from './useExample'
// add other hooks here
```

Testing and linting
- Write unit tests for logic inside hooks (use react-hooks-testing-library).
- Follow project's ESLint/Prettier rules.

Usage
```ts
import { useExample } from 'src/hooks'

function Component() {
	const { count, setCount } = useExample(1)
}
```

Notes
- Prefer simple, well-typed signatures.
- Avoid coupling hooks to UI components; return plain values/functions so hooks remain reusable.
