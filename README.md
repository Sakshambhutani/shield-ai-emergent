# Shield AI

The React/Vite app lives in `shield-ai-india-source/frontend`.

## Vercel deployment

Import this repository with **Root Directory** set to the repository root
(`.`). The root `vercel.json` installs the frontend's locked dependencies,
runs its type check and production build, and serves the generated `dist`
directory. The rewrite supports direct links and refreshes on app routes.

After pushing these changes, deploy the new commit in Vercel. Redeploying
an older commit will not include the configuration fix.

## Local verification

```sh
cd shield-ai-india-source/frontend
npx --yes yarn@1.22.22 install --frozen-lockfile --non-interactive
npm run build
npm run preview
```
