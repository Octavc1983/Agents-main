## DS Gap: DS-GAP-004

**Status:** Open
**Blocking:** No — neutral tone mapped to existing "info" treatment as closest approved semantic treatment
**Missing capability:** No semantic token for "neutral notice" accent color (#7a80ff)
**Affected page/component/template:** ModalProvider.tsx — SystemNoticeRenderer (neutral tone variant)
**Workaround attempted:** Mapped `neutral` → `info` tone class (closest DS semantic treatment). Raw hex NOT introduced.
**Requested from DS team:** New token `$color-notice-accent-neutral` for a purple-blue neutral notice accent.
**Evidence of reuse:** SystemNotice `neutral` tone used for non-critical, non-status-specific informational notices across the product.
**Created:** 2026-06-23
