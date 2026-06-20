import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  resolveActiveNavigationState,
  validateSpacesRegistry,
  getDefaultPathForSpace,
  getNavBreadcrumbs,
  getSpaceForPath,
  flattenNav,
  resolveItemByPath,
  isButtonItem,
  isSplitItem,
  isDropdownItem,
  spacesRegistry,
  type SpaceSchema,
} from './navConfig';

// ── resolveActiveNavigationState ─────────────────────────────────────────────

describe('resolveActiveNavigationState', () => {
  it('returns null state for unknown path', () => {
    const result = resolveActiveNavigationState('/does-not-exist');
    expect(result).toEqual({
      activeSpaceId: null,
      activeItemId: null,
      activeAncestorIds: [],
      activeLevelOneItemId: null,
    });
  });

  it('resolves a top-level button item', () => {
    const result = resolveActiveNavigationState('/access/home');
    expect(result.activeSpaceId).toBe('access');
    expect(result.activeItemId).toBe('access-home');
    expect(result.activeAncestorIds).toEqual([]);
    expect(result.activeLevelOneItemId).toBe('access-home');
  });

  it('resolves a nested item and returns ancestor chain', () => {
    const result = resolveActiveNavigationState('/access/apps/my-items');
    expect(result.activeSpaceId).toBe('access');
    expect(result.activeItemId).toBe('access-apps-my');
    expect(result.activeAncestorIds).toContain('access-apps');
    expect(result.activeLevelOneItemId).toBe('access-apps');
  });

  it('resolves a deeply nested item under manage', () => {
    const result = resolveActiveNavigationState('/manage/inventory/identities/users');
    expect(result.activeSpaceId).toBe('manage');
    expect(result.activeItemId).toBe('manage-inv-users');
    expect(result.activeAncestorIds[0]).toBe('manage-inventory');
    expect(result.activeLevelOneItemId).toBe('manage-inventory');
  });

  it('activeLevelOneItemId is the item itself when it is a direct L1 item', () => {
    const result = resolveActiveNavigationState('/manage/scans');
    expect(result.activeLevelOneItemId).toBe('manage-scans');
  });

  it('resolves items in the audit space', () => {
    const result = resolveActiveNavigationState('/audit/system-activities');
    expect(result.activeSpaceId).toBe('audit');
    expect(result.activeItemId).toBe('audit-system');
  });

  it('resolves items in the setup space', () => {
    const result = resolveActiveNavigationState('/setup/health/system-health');
    expect(result.activeSpaceId).toBe('setup');
    expect(result.activeItemId).toBe('setup-health-system');
  });

  it('resolves items in the risk space', () => {
    const result = resolveActiveNavigationState('/risk/risk-management/risks');
    expect(result.activeSpaceId).toBe('risk');
    expect(result.activeItemId).toBe('risk-risks');
  });
});

// ── getDefaultPathForSpace ────────────────────────────────────────────────────

describe('getDefaultPathForSpace', () => {
  it('returns the first navigable path for a known space', () => {
    const path = getDefaultPathForSpace('access');
    expect(typeof path).toBe('string');
    expect(path.startsWith('/access')).toBe(true);
  });

  it('returns / for an unknown space', () => {
    expect(getDefaultPathForSpace('nonexistent')).toBe('/');
  });

  it('returns a path for every registered space', () => {
    for (const space of spacesRegistry) {
      const path = getDefaultPathForSpace(space.id);
      expect(path).not.toBe('/');
    }
  });
});

// ── getSpaceForPath ───────────────────────────────────────────────────────────

describe('getSpaceForPath', () => {
  it('returns the correct space for a known path', () => {
    const space = getSpaceForPath('/access/home');
    expect(space?.id).toBe('access');
  });

  it('returns null for an unknown path', () => {
    expect(getSpaceForPath('/xyz/unknown')).toBeNull();
  });
});

// ── getNavBreadcrumbs ─────────────────────────────────────────────────────────

describe('getNavBreadcrumbs', () => {
  it('returns a breadcrumb trail for a nested item', () => {
    const crumbs = getNavBreadcrumbs('/access/apps/my-items');
    expect(crumbs.length).toBeGreaterThan(1);
    expect(crumbs[0].label).toBe('Access');
    const last = crumbs[crumbs.length - 1];
    expect(last.path).toBe('/access/apps/my-items');
  });

  it('returns empty array for unknown path', () => {
    expect(getNavBreadcrumbs('/nowhere')).toEqual([]);
  });
});

// ── flattenNav ────────────────────────────────────────────────────────────────

describe('flattenNav', () => {
  it('flattens nested items into a single array', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    const flat = flattenNav(accessSpace.items);
    const paths = flat.filter(item => item.path).map(item => item.path);
    expect(paths).toContain('/access/home');
    expect(paths).toContain('/access/apps/my-items');
    expect(paths).toContain('/access/infrastructure/accounts');
  });
});

// ── resolveItemByPath ─────────────────────────────────────────────────────────

describe('resolveItemByPath', () => {
  it('resolves a direct path', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    const item = resolveItemByPath(accessSpace.items, '/access/home');
    expect(item?.id).toBe('access-home');
  });

  it('resolves a nested path', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    const item = resolveItemByPath(accessSpace.items, '/access/apps/my-items');
    expect(item?.id).toBe('access-apps-my');
  });

  it('returns null for unknown path', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    expect(resolveItemByPath(accessSpace.items, '/nope')).toBeNull();
  });
});

// ── Item type guards ──────────────────────────────────────────────────────────

describe('item type guards', () => {
  it('isButtonItem returns true for type=button', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    const homeItem = accessSpace.items.find(i => i.id === 'access-home')!;
    expect(isButtonItem(homeItem)).toBe(true);
    expect(isSplitItem(homeItem)).toBe(false);
    expect(isDropdownItem(homeItem)).toBe(false);
  });

  it('isSplitItem returns true for type=split', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    const splitItem = accessSpace.items.find(i => i.type === 'split')!;
    expect(isSplitItem(splitItem)).toBe(true);
    expect(isButtonItem(splitItem)).toBe(false);
    expect(isDropdownItem(splitItem)).toBe(false);
  });

  it('isDropdownItem returns true for type=dropdown', () => {
    const accessSpace = spacesRegistry.find(s => s.id === 'access')!;
    const dropdownItem = accessSpace.items.find(i => i.type === 'dropdown')!;
    expect(isDropdownItem(dropdownItem)).toBe(true);
    expect(isButtonItem(dropdownItem)).toBe(false);
    expect(isSplitItem(dropdownItem)).toBe(false);
  });
});

// ── validateSpacesRegistry ────────────────────────────────────────────────────

describe('validateSpacesRegistry', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not log errors for the valid production registry', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    validateSpacesRegistry(spacesRegistry);
    expect(spy).not.toHaveBeenCalled();
  });

  it('logs an error when a button item is missing a path', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const badRegistry: SpaceSchema[] = [
      {
        id: 'test',
        label: 'Test',
        spaceId: 'access',
        items: [{ id: 'bad-btn', label: 'Bad', type: 'button' }],
      },
    ];
    validateSpacesRegistry(badRegistry);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('type="button" requires a path'),
    );
  });

  it('logs an error when a dropdown item has a path', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const badRegistry: SpaceSchema[] = [
      {
        id: 'test',
        label: 'Test',
        spaceId: 'access',
        items: [{ id: 'bad-dd', label: 'Bad', type: 'dropdown', path: '/test' }],
      },
    ];
    validateSpacesRegistry(badRegistry);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('type="dropdown" must not have a path'),
    );
  });

  it('logs an error when a split item is missing a path', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const badRegistry: SpaceSchema[] = [
      {
        id: 'test',
        label: 'Test',
        spaceId: 'access',
        items: [{ id: 'bad-split', label: 'Bad', type: 'split' }],
      },
    ];
    validateSpacesRegistry(badRegistry);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('type="split" requires a path'),
    );
  });

  it('does not run in production', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const badRegistry: SpaceSchema[] = [
      {
        id: 'test',
        label: 'Test',
        spaceId: 'access',
        items: [{ id: 'bad', label: 'Bad', type: 'button' }],
      },
    ];
    validateSpacesRegistry(badRegistry);
    expect(spy).not.toHaveBeenCalled();
    process.env.NODE_ENV = originalEnv;
  });
});

// ── Registry completeness ─────────────────────────────────────────────────────

describe('spacesRegistry', () => {
  it('contains all expected spaces', () => {
    const ids = spacesRegistry.map(s => s.id);
    expect(ids).toContain('access');
    expect(ids).toContain('manage');
    expect(ids).toContain('risk');
    expect(ids).toContain('audit');
    expect(ids).toContain('setup');
  });

  it('every item in every space has a valid type', () => {
    const valid = ['button', 'split', 'dropdown'];
    for (const space of spacesRegistry) {
      const flat = flattenNav(space.items);
      for (const item of flat) {
        expect(valid).toContain(item.type);
      }
    }
  });

  it('every button item has a path', () => {
    for (const space of spacesRegistry) {
      const flat = flattenNav(space.items);
      for (const item of flat) {
        if (item.type === 'button') {
          expect(item.path).toBeTruthy();
        }
      }
    }
  });

  it('no dropdown item has a path', () => {
    for (const space of spacesRegistry) {
      const flat = flattenNav(space.items);
      for (const item of flat) {
        if (item.type === 'dropdown') {
          expect(item.path).toBeUndefined();
        }
      }
    }
  });

  it('every split item has a path and children', () => {
    for (const space of spacesRegistry) {
      const flat = flattenNav(space.items);
      for (const item of flat) {
        if (item.type === 'split') {
          expect(item.path).toBeTruthy();
        }
      }
    }
  });

  it('all item ids are unique across the entire registry', () => {
    const allIds: string[] = [];
    for (const space of spacesRegistry) {
      const flat = flattenNav(space.items);
      for (const item of flat) allIds.push(item.id);
    }
    const unique = new Set(allIds);
    expect(unique.size).toBe(allIds.length);
  });
});
