import type { MetadataRoute } from "next";

// Powers "Add to Home Screen" on Android/Chrome. iOS Safari ignores this file
// entirely — its home-screen behavior is driven by the apple-* <meta> tags
// in layout.tsx instead. Real icon files (192x192 / 512x512 PNGs) are a
// deliberate TODO — add them under public/ and reference here before this
// goes further than a scaffold.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Farmadent",
    short_name: "Farmadent",
    description: "Farmadent — porodična stomatološka ordinacija u Prijepolju.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f3f7",
    theme_color: "#39609e",
  };
}
