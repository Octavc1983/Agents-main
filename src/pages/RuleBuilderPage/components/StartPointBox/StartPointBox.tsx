import React from 'react';
import { DotsMenuIcon } from '@idira/design-system/icons';
import { AddRuleCanvasIcon } from '../../../../features/rule-builder/icons/RuleBuilderCanvasIcons';
import { RULE_BUILDER_STRINGS as S } from '../../RuleBuilderPage.strings';
import './StartPointBox.scss';

interface StartPointBoxProps {
  entityLabel:       string;
  onAddRule:         () => void;
  isAddRuleBlocked:  boolean;
  addRuleBlockedMsg: string;
}

export const StartPointBox: React.FC<StartPointBoxProps> = ({
  entityLabel,
  onAddRule,
  isAddRuleBlocked,
  addRuleBlockedMsg,
}) => (
  <div className="rb-start-node">
    <div className="rb-start-node__header">
      <span className="rb-start-node__label">{S.startNodeLabel}</span>
      <button type="button" className="rb-start-node__menu" aria-label={S.startNodeMenuLabel}>
        <DotsMenuIcon size={14} />
      </button>
    </div>
    <div className="rb-start-node__body">
      <span className="rb-start-node__field-label">{S.entityFieldLabel}</span>
      <span className="rb-start-node__field-value">{entityLabel}</span>
    </div>
    <div className="rb-start-node__port-row">
      <div className="rb-start-node__connector-line" aria-hidden="true" />
      <button
        type="button"
        className={[
          'rb-start-node__add-btn',
          isAddRuleBlocked ? 'rb-start-node__add-btn--blocked' : '',
        ].filter(Boolean).join(' ')}
        onClick={onAddRule}
        aria-label={isAddRuleBlocked ? addRuleBlockedMsg : S.addRuleLabel}
        title={isAddRuleBlocked ? addRuleBlockedMsg : undefined}
        aria-disabled={isAddRuleBlocked}
      >
        <AddRuleCanvasIcon />
      </button>
    </div>
  </div>
);
