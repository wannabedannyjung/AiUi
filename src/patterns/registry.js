// Original 100 (10 cats × 10)
import c01  from './01-conversation.js'
import c02  from './02-status.js'
import c03  from './03-tools.js'
import c04  from './04-multiagent.js'
import c05  from './05-streaming.js'
import c06  from './06-multimodal.js'
import c07  from './07-reasoning.js'
import c08  from './08-memory.js'
import c09  from './09-trust.js'
import c10  from './10-output.js'

// +400 extras (10 cats × 40)
import c01b from './01b-conversation-extra.js'
import c02b from './02b-status-extra.js'
import c03b from './03b-tools-extra.js'
import c04b from './04b-multiagent-extra.js'
import c05b from './05b-streaming-extra.js'
import c06b from './06b-multimodal-extra.js'
import c07b from './07b-reasoning-extra.js'
import c08b from './08b-memory-extra.js'
import c09b from './09b-trust-extra.js'
import c10b from './10b-output-extra.js'

// +5 new categories × 50 (250)
import c11  from './11-coding.js'
import c12  from './12-onboarding.js'
import c13  from './13-reliability.js'
import c14  from './14-mobile.js'
import c15  from './15-collab.js'

// +100 composite / avatar / explainer
import c16  from './16-composites.js'

// +50 visual wow
import c17  from './17-wow.js'

// +20 Ai Ui — imagined / next-dimension agent UX
import c18  from './18-ai-imagined.js'

// +10 Flow — node-based AI flow editor (reactflow-style)
import c19  from './19-flow.js'

export const patterns = [
  ...c01, ...c01b,
  ...c02, ...c02b,
  ...c03, ...c03b,
  ...c04, ...c04b,
  ...c05, ...c05b,
  ...c06, ...c06b,
  ...c07, ...c07b,
  ...c08, ...c08b,
  ...c09, ...c09b,
  ...c10, ...c10b,
  ...c11, ...c12, ...c13, ...c14, ...c15,
  ...c16,
  ...c17,
  ...c18,
  ...c19,
]

export const categories = [
  'Conversation',
  'Status',
  'Tools',
  'Multi-Agent',
  'Streaming',
  'Voice & Multimodal',
  'Reasoning',
  'Memory',
  'Trust & Control',
  'Output',
  'Coding',
  'Onboarding',
  'Reliability',
  'Mobile',
  'Collab & Safety',
  'Composites & Guides',
  'Visual Wow',
  'Ai Ui',
  'Flow',
]

if (typeof console !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log('[AiUx] patterns loaded:', patterns.length, 'across', categories.length, 'categories')
}
