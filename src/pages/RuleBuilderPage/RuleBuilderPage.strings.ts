/**
 * RuleBuilderPage.strings.ts
 *
 * All user-facing copy for the Rule Builder canvas.
 * No business logic. No hardcoded values. Only text.
 */

export const RULE_BUILDER_STRINGS = {
  // Page / header
  defaultTitle:              'New Rule Set',
  wipBadge:                  'WIP',
  editTitleLabel:            'Edit rule title',
  titleInputLabel:           'Rule title',

  // Search
  searchPlaceholder:         'Search rule graph',
  searchLabel:               'Search rule graph',
  searchClearLabel:          'Clear search',
  searchMatchSingular:       'match',
  searchMatchPlural:         'matches',
  searchNoResults:           'No matching nodes found',
  searchResultLabel:         'Search results',
  searchResultItemLabel:     (type: string, summary: string) => `${type}: ${summary}`,

  // Rule summary
  summaryNodes:              'nodes',
  summaryRules:              'rules',
  summaryDot:                '·',

  // Validation trigger
  validationStatusLabel:     'Rule validation status',
  statusDraft:               'Draft',
  statusReady:               'Ready to activate',
  statusSaving:              'Saving…',
  statusSaved:               'Saved',
  statusSaveFailed:          'Save failed',
  statusActivating:          'Activating…',
  statusActive:              'Active',
  statusActivationFailed:    'Activation failed',
  statusReadOnly:            'Read-only',
  statusIssue:               'issue',
  statusIssues:              'issues',
  statusWarning:             'warning',
  statusWarnings:            'warnings',

  // Toolbar buttons
  undoLabel:                 'Undo last change',
  redoLabel:                 'Redo last change',
  cancelLabel:               'Cancel',
  saveDraftLabel:            'Save as draft',
  savingLabel:               'Saving…',
  savedLabel:                'Saved',
  saveFailedLabel:           'Save failed — Retry',
  activateLabel:             'Activate',
  activatingLabel:           'Activating…',
  activeLabel:               'Active',
  activationFailedLabel:     'Retry activation',

  // Canvas controls
  zoomOutLabel:              'Zoom out',
  zoomInLabel:               'Zoom in',
  fitLabel:                  'Fit rule graph to view',
  addRuleLabel:              'Add rule',
  addRuleShort:              'Add rule',

  // Start Point
  startNodeLabel:            'Start point',
  entityFieldLabel:          'Entity',
  startNodeMenuLabel:        'Start node actions',

  // Add Rule blocked guidance (shown before first save/activate attempt)
  addRuleBlockedGuidance:    'Complete the current rule before adding another rule.',

  // Discard confirmation
  discardTitle:              'Discard changes?',
  discardDesc:               'You have unsaved changes. If you leave now, your rule configuration will be lost.',
  discardConfirm:            'Discard changes',
  discardCancel:             'Keep editing',

  // Validation popover
  popoverTitleIssues:        (n: number) => n === 1 ? '1 issue' : `${n} issues`,
  popoverTitleWarnings:      (n: number) => n === 1 ? '1 warning' : `${n} warnings`,
  popoverTitleMixed:         (e: number, w: number) =>
    `${e === 1 ? '1 issue' : `${e} issues`} · ${w === 1 ? '1 warning' : `${w} warnings`}`,
  popoverTitleValid:         'No issues',
  popoverBodyValid:          'All rules are valid and ready to activate.',
  popoverClose:              'Close validation panel',

  popoverNodeTypeCondition:  'Condition',
  popoverNodeTypeAction:     'Action',
  popoverNodeTypeSummary:    (prop: string) => prop || 'Unnamed condition',

  // Issue copy — errors
  popoverProblemNoProperty:  'No property selected.',
  popoverNextNoProperty:     'Select a property to define what this condition checks.',
  popoverProblemNoOperator:  'No operator selected.',
  popoverNextNoOperator:     'Select an operator to define how the property is evaluated.',
  popoverProblemNoValue:     (op: string) => op ? `Enter a value for "${op}".` : 'A value is required for this operator.',
  popoverNextNoValue:        'Choose a value to complete this condition.',
  popoverProblemNoAction:    'No action selected.',
  popoverNextNoAction:       'Select an action to define what happens when this rule matches.',
  popoverProblemMissingStartConn:  'No connection from Start Point.',
  popoverNextMissingStartConn:     'Connect the Start Point output to this condition.',
  popoverProblemMissingActionConn: 'No connection to Action.',
  popoverNextMissingActionConn:    'Connect this condition to its paired Action.',

  // Warning copy
  popoverProblemBroadScope:  'This Rule Set applies to every entity in the selected scope.',
  popoverNextBroadScope:     'Add Start Point filters to narrow the entity scope if needed.',

  // Graph-level errors
  validationNoRules:         'Add at least one rule to activate this Rule Set.',
  validationNoStartEntity:   'Start Point must have a valid entity type.',
  validationDuplicateIds:    'Duplicate node IDs detected. Please reset the canvas.',
  validationCycle:           'Unsupported cycle detected in the rule graph.',
  validationBrokenConnector: 'Rule graph has a broken connector reference. Please reset the canvas.',

  // Activate with warnings
  activateWithWarningsTitle:   'Activate with warnings?',
  activateWithWarningsDesc:    'This Rule Set applies to every entity in the selected scope with no Start Point filters. All matched entities will be affected by the rule actions.',
  activateWithWarningsConfirm: 'Activate anyway',
  activateWithWarningsCancel:  'Keep editing',
} as const;
