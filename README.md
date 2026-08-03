# engine-bindings

Generated typed bindings for the engine capability layer (commands + events),
written directly by the engine's tauri-specta export.

## Usage

```ts
import { commands } from "engine-bindings";
const res = await commands.clipboardRead();
```

## Regenerating

Run the engine's debug binary once (`npm run tauri dev` in the engine repo) —
the specta export rewrites `src/bindings.ts`. Then rebuild this package and
bump the version + git tag whenever the engine's commands/events change.
