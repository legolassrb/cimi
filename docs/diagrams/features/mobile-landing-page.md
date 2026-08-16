# Feature: mobile landing page

The mobile app's home page (`frontend-mobile/src/app/page.tsx`) composed under the shared layout shell (`layout.tsx` → `TopBar` + `BottomNav`), built around real illustration/icon assets copied from `frontend/photos/` into `frontend-mobile/public/`. Icon sizing is enforced structurally via two shared constants (`CONTENT_ICON_SIZE`, `NAV_ICON_SIZE` in `components/icons.tsx`) rather than per-instance classes, so real PNG icons and the hand-drawn SVG fallbacks (kept only where no matching asset exists — bell, calendar, home, gallery, profile, shield, heart) render at one consistent size each. The page's only runtime dependency is a single server-side fetch to the backend's hello-world endpoint, rendered as a dev-only status box unrelated to the visual design.

```mermaid
flowchart TD
    subgraph shell["Layout shell — layout.tsx"]
        topbar["TopBar\nlogo: tooth-icon.png\nbell: BellIcon (no asset)"]
        bottomnav["BottomNav\n5 tabs, NAV_ICON_SIZE uniform\nУслуге: tooth-icon.png\nrest: SVG fallback"]
    end

    subgraph home["HomePage sections — page.tsx"]
        hero["Hero\nlanding-hero.png\nCTA button → /book"]
        services["Services grid, 3 cols\n6x public/icons/*.png\nCONTENT_ICON_SIZE uniform\nlinks → /services"]
        features["Feature row\ninstruments-icon.png +\nShieldCheckIcon/HeartIcon fallback"]
        trust["Trust band\nlanding-care.png"]
        cta["CTA banner\nsmile.png on bg-brand"]
        devstatus["Dev status box\n(not part of the design)"]
    end

    backend[["FastAPI\nGET /api/v1/hello"]]

    shell -. wraps .-> home
    hero --> services --> features --> trust --> cta --> devstatus
    devstatus -- "server-side fetch, try/catch fallback" --> backend
```

---
Last updated: 2026-08-16, reflects commit 7d5577dfa0d002b1bd5a52e441c82981d23e6557
