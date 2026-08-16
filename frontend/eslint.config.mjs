// eslint-config-next ships a native flat config as of v15+, so it's used
// directly here rather than through @eslint/eslintrc's FlatCompat bridge
// (that combination throws a circular-JSON crash — FlatCompat is meant for
// bridging *legacy* .eslintrc-style shareable configs into flat config, not
// for configs that are already flat-config-native, like this one).
import nextConfig from "eslint-config-next/core-web-vitals";

export default [...nextConfig];
