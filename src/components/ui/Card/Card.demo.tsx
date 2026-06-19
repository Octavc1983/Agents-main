import React from 'react';
import { Card } from './Card';
import './Card.demo.scss';

export const CardDemo: React.FC = () => (
  <div className="card-demo">
    <h1 className="card-demo__title">Cards &amp; Static Cards</h1>

    <section className="card-demo__section">
      <span className="card-demo__section-title">Basic card — Dark</span>
      <div className="card-demo__row">
        <div className="card-demo__col">
          <span className="card-demo__label">Default</span>
          <Card state="default" />
        </div>
        <div className="card-demo__col">
          <span className="card-demo__label">Hover</span>
          <Card state="hover" />
        </div>
        <div className="card-demo__col">
          <span className="card-demo__label">Selected</span>
          <Card state="selected" />
        </div>
      </div>
    </section>

    <section className="card-demo__section">
      <span className="card-demo__section-title">Basic card — Light</span>
      <div className="card-demo__row">
        <div className="card-demo__col">
          <span className="card-demo__label">Default</span>
          <Card state="default" className="icard--light" />
        </div>
        <div className="card-demo__col">
          <span className="card-demo__label">Hover</span>
          <Card state="hover" className="icard--light" />
        </div>
        <div className="card-demo__col">
          <span className="card-demo__label">Selected</span>
          <Card state="selected" className="icard--light" />
        </div>
      </div>
    </section>

    <section className="card-demo__section">
      <span className="card-demo__section-title">Backgrounds</span>
      <div className="card-demo__row">
        <div className="card-demo__col">
          <span className="card-demo__label">Gradient light-to-dark</span>
          <Card state="default" background="gradient-light-to-dark" size="auto"
            className="card-demo__bg-card" />
        </div>
        <div className="card-demo__col">
          <span className="card-demo__label">Gradient dark-to-light</span>
          <Card state="default" background="gradient-dark-to-light" size="auto"
            className="card-demo__bg-card" />
        </div>
      </div>
    </section>

    <section className="card-demo__section">
      <span className="card-demo__section-title">Interactive</span>
      <div className="card-demo__row">
        <Card state="default" onClick={() => {}} title="Clickable card"
          subtitle="Hover to see glow" />
        <Card state="default" onClick={() => {}} title="Clickable card"
          subtitle="With gradient" background="gradient-light-to-dark" />
      </div>
    </section>
  </div>
);
