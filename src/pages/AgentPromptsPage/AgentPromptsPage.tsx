/**
 * AgentPromptsPage Component
 * Prototype library of ready-to-use agent prompts for UX/UI prototyping workflows.
 *
 * Static page — no loading state needed (data is local mock).
 * Search filters across title, description, agent names, and keywords.
 * Each card has a per-item "Copy" button that resets after 2 seconds.
 */

import type React from 'react';
import { useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { Card } from '../../components/ui/Card/Card';
import { EmptyState } from '../../components/ui/EmptyState/EmptyState';
import { agentPromptUseCases } from '../../mock/agentPromptsMockData';
import type { AgentPromptUseCase } from '../../mock/agentPromptsMockData';
import './AgentPromptsPage.scss';

const TOTAL_USE_CASES = agentPromptUseCases.length;

export const AgentPromptsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIds, setCopiedIds] = useState<Set<string>>(new Set());

  const filteredUseCases = agentPromptUseCases.filter((useCase: AgentPromptUseCase) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    return (
      useCase.title.toLowerCase().includes(query) ||
      useCase.description.toLowerCase().includes(query) ||
      useCase.agents.some((agent) => agent.toLowerCase().includes(query)) ||
      useCase.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  });

  const handleCopy = (useCase: AgentPromptUseCase) => {
    navigator.clipboard.writeText(useCase.prompt).then(() => {
      setCopiedIds((prev) => new Set(prev).add(useCase.id));
      setTimeout(() => {
        setCopiedIds((prev) => {
          const next = new Set(prev);
          next.delete(useCase.id);
          return next;
        });
      }, 2000);
    });
  };

  return (
    <div className="agent-prompts-page">
      {/* Page Header */}
      <section className="agent-prompts-page__header">
        <h1 className="agent-prompts-page__title">Agent Prompts Library</h1>
        <p className="agent-prompts-page__subtitle">
          Ready-to-use prompts for running UX/UI prototyping agents by use case.
        </p>
      </section>

      {/* Search */}
      <section className="agent-prompts-page__search-wrapper">
        <input
          className="agent-prompts-page__search"
          type="text"
          placeholder="Search by use case, agent name, or keyword…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search agent prompts"
        />
        <p className="agent-prompts-page__results-count">
          Showing {filteredUseCases.length} of {TOTAL_USE_CASES} use cases
        </p>
      </section>

      {/* Content */}
      {filteredUseCases.length === 0 ? (
        <EmptyState
          title="No results found"
          description="Try a different search term."
        />
      ) : (
        <div className="agent-prompts-page__grid">
          {filteredUseCases.map((useCase: AgentPromptUseCase) => (
            <Card key={useCase.id} variant="elevated" className="agent-prompts-page__card">
              {/* Card Title */}
              <h2 className="agent-prompts-page__card-title">{useCase.title}</h2>

              {/* Card Description */}
              <p className="agent-prompts-page__card-description">{useCase.description}</p>

              {/* Agents */}
              <div className="agent-prompts-page__section-label">Agents</div>
              <div className="agent-prompts-page__agents-list">
                {useCase.agents.map((agent) => (
                  <span key={agent} className="agent-tag">
                    {agent}
                  </span>
                ))}
              </div>

              {/* When to Use */}
              <div className="agent-prompts-page__section-label">When to use</div>
              <p className="agent-prompts-page__when-to-use">{useCase.whenToUse}</p>

              {/* Prompt Block */}
              <div className="agent-prompts-page__section-label">Prompt</div>
              <pre className="agent-prompts-page__prompt-block">
                <code>{useCase.prompt}</code>
              </pre>

              {/* Card Footer */}
              <div className="agent-prompts-page__card-footer">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(useCase)}
                  className="agent-prompts-page__copy-btn"
                >
                  {copiedIds.has(useCase.id) ? 'Copied!' : 'Copy Prompt'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
