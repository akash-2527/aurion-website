// src/data/caseStudies.ts
// Single source of truth — imported by CaseStudies.tsx + CaseStudyDetail.tsx

export type Stat   = { value: string; label: string };
export type Study  = {
  id: string;
  index: string;
  label: string;
  sector: string;
  title: string;
  intro: string;
  stats: Stat[];
  challenge: string[];
  approach: { heading: string; points: string[] };
  outcomes: { headline: string[]; tags: string[] };
  whyMatters: string[];
  cta: { text: string; label: string };
};

export const studies: Study[] = [
  {
    id: "cultural-institution",
    index: "01",
    label: "Public Sector · Cultural Institution",
    sector: "Public Sector",
    title: "Creating Confidence Around AI in a Complex Cultural Institution",
    intro:
      "A large, publicly funded cultural institution with 1,200+ staff — spanning curatorial, security, education, visitor services, operations, and corporate teams. Work was deeply values-led, highly regulated, and publicly accountable. AI was already entering the organisation quietly.",
    stats: [
      { value: "1,200+", label: "Staff reached across departments" },
      { value: "70%+",   label: "Increase in manager confidence" },
      { value: "50%",    label: "Reduction in hidden AI use" },
      { value: "3×",     label: "Increase in shared AI use-cases" },
    ],
    challenge: [
      "AI use was happening in pockets, without shared language",
      "Training focused on awareness, not real decision-making",
      "Managers felt responsible for AI risk, but lacked frameworks",
      "Staff were unsure when AI use was acceptable, ethical, or valuable",
      "62% of staff were unsure what 'good AI use' looked like in their role",
      "58% of managers avoided AI conversations due to fear of getting it wrong",
    ],
    approach: {
      heading: "The intervention focused on normalising AI as a work practice, not a technical capability.",
      points: [
        "Scenario-based learning grounded in real organisational workflows",
        "Manager-led conversations to support psychological safety",
        "Clear framing around ethics, accountability, and judgement",
        "Embedding AI discussions into existing learning systems",
        "Live manager workshops using real internal scenarios",
        "Organisation-wide learning modules accessed by 80%+ of staff",
        "Practical decision frameworks rather than tool-specific training",
      ],
    },
    outcomes: {
      headline: [
        "1,200+ staff engaged across learning and communications within four months",
        "75% of managers reported increased confidence handling AI-related queries",
        "40% uplift in staff reporting clarity around acceptable AI use",
        "AI conversations shifted from informal to documented and shared",
      ],
      tags: [
        "Staff stopped hiding experimentation",
        "Managers stopped avoiding the topic",
        "AI became discussable, not divisive",
      ],
    },
    whyMatters: [
      "In highly accountable environments, AI adoption fails when it is framed as a technology rollout.",
      "It succeeds when people are given shared language, decision-making confidence, and permission to think critically.",
      "This project demonstrated that psychological readiness precedes technical maturity.",
    ],
    cta: {
      text: "If your organisation is seeing fragmented AI use, managerial hesitation, or unspoken anxiety around AI, this is the type of adoption work we specialise in.",
      label: "See how this approach can translate to your teams",
    },
  },
  {
    id: "hr-learning-workflows",
    index: "02",
    label: "Professional Services · HR & Learning",
    sector: "Professional Services",
    title: "Embedding AI Into Everyday HR & Learning Workflows",
    intro:
      "This organisation was already digitally capable, but AI use was inconsistent and uneven. HR and Learning teams were under pressure to move faster, produce more content, and support managers at scale. AI tools had started to appear organically — recruiters experimenting with prompts, L&D teams testing content generation.",
    stats: [
      { value: "30+",    label: "HR & L&D professionals supported" },
      { value: "35–40%", label: "Reduction in repeat content task time" },
      { value: "2×",     label: "Increase in day-to-day AI confidence" },
      { value: "20+",    label: "Documented use-cases shared across teams" },
    ],
    challenge: [
      "Teams struggled knowing where AI actually fit into their workflow",
      "Understanding what was acceptable vs risky was unclear",
      "Turning one-off experiments into repeatable practice was difficult",
      "60% were unsure if AI use would be supported by leadership",
      "55% avoided using AI on 'important' tasks",
      "AI was treated as an experiment, not a capability",
    ],
    approach: {
      heading: "The work focused on workflow-level adoption, not tool training.",
      points: [
        "Mapped existing HR and L&D workflows to identify pressure points",
        "Co-designed prompts and decision rules with the team",
        "Embedded AI use into existing processes, not on top of them",
        "Workflow mapping sessions covering recruitment, onboarding, learning design",
        "Prompt playbooks tailored to real, recurring tasks",
        "Decision guidelines for when not to use AI",
      ],
    },
    outcomes: {
      headline: [
        "Content development cycles shortened by 30–40% within eight weeks",
        "Teams reported higher confidence using AI without escalation",
        "Managers gained clarity on oversight and accountability",
        "AI use shifted from 'quiet' to openly discussed",
      ],
      tags: [
        "AI stopped feeling experimental",
        "It became a normal part of work",
        "Internal enablement beat external tooling",
      ],
    },
    whyMatters: [
      "HR and L&D teams sit at the centre of organisational change.",
      "When they adopt AI with clarity — managers follow, standards spread, adoption scales responsibly.",
      "This work demonstrated how internal enablement beats external tooling.",
    ],
    cta: {
      text: "If your people teams are experimenting with AI but lack structure or confidence, this approach helps turn curiosity into capability.",
      label: "Explore how this model works in practice",
    },
  },
  {
    id: "small-business-workflows",
    index: "03",
    label: "Small Business · Operations",
    sector: "Small Business",
    title: "Building AI-Enabled Workflows in a Small, Fast-Moving Organisation",
    intro:
      "This organisation was small, ambitious, and resource-constrained. Like many growing teams, they faced increasing operational load, limited headcount, and reliance on manual processes. AI interest was high, but clarity was low. Initial conversations revealed 70% of team members were using AI in some form.",
    stats: [
      { value: "10–12",  label: "Core workflows redesigned with AI" },
      { value: "25–30%", label: "Reduction in manual operational effort" },
      { value: "15+",    label: "Hours saved per week across the team" },
      { value: "100%",   label: "Team adoption of shared AI workflows" },
    ],
    challenge: [
      "Knowledge lived in individuals' heads, creating fragility",
      "Processes broke when people were unavailable",
      "AI use was unrepeatable and undocumented",
      "Leadership wanted speed, consistency, and internal ownership",
      "Not dependency on external consultants",
    ],
    approach: {
      heading: "The intervention centred on co-creation, not delivery.",
      points: [
        "The team mapped their own processes to identify friction points",
        "Designed AI-assisted steps together, not imposed from outside",
        "Documented workflows in plain language for ongoing use",
        "Live workflow design sessions with full team involvement",
        "Simple, tool-agnostic AI patterns that aren't vendor-dependent",
        "Clear ownership and handover rules for sustainability",
      ],
    },
    outcomes: {
      headline: [
        "Core processes became repeatable and resilient within one month",
        "Operational load reduced by 25–30% across the team",
        "New team members onboarded faster using shared workflows",
        "AI use became visible, discussable, and improvable",
      ],
      tags: [
        "The organisation gained leverage — not complexity",
        "AI became something the team owned, not outsourced",
        "Single-source documentation created for ongoing use",
      ],
    },
    whyMatters: [
      "Small teams do not need sophisticated AI systems.",
      "They need clarity, ownership, and workflows that scale with them.",
      "This approach ensures AI strengthens the organisation, not individuals only.",
    ],
    cta: {
      text: "If your team is moving fast but feeling stretched, AI-enabled workflows can create breathing room without adding risk.",
      label: "See how workflow-first adoption works",
    },
  },
];