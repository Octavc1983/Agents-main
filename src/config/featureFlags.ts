/**
 * Feature flags — toggle product features on/off.
 *
 * Set a flag to `false` to hide the feature completely from the UI.
 * No code changes required; this file is the single control point.
 */
export const featureFlags = {
  /**
   * Review / Annotations panel.
   * Controls the "Review" button in the Header and the annotation overlay.
   * Set to false to hide the button and disable the annotation layer entirely.
   */
  reviewAnnotations: true,
} as const;

export type FeatureFlags = typeof featureFlags;
