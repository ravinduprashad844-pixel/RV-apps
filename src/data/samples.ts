import { CallAnalysis } from '../types';

export const sampleCalls: CallAnalysis[] = [
  {
    id: 'sample-1',
    title: 'Enterprise CRM Migration Consult',
    date: 'June 8, 2026',
    duration: '3:42',
    agentName: 'Alex Carter',
    customerName: 'Chloe Jenkins (Ops Director)',
    metrics: {
      talkListenRatio: 42,
      interruptionCount: 1,
      longestMonologueSec: 28,
      customerSentimentTrend: 'improving',
      overallScore: 88
    },
    transcript: [
      {
        speaker: 'agent',
        speakerName: 'Alex Carter',
        text: 'Hi Chloe, hope your week is off to a great start. Thanks for grabbing 15 minutes today to talk about your sales workflow updates.',
        timestamp: '00:02',
        sentiment: 2,
        topic: 'Greeting'
      },
      {
        speaker: 'customer',
        speakerName: 'Chloe Jenkins',
        text: 'Hey Alex, yes, absolutely. Things are a bit hectic here, but we definitely need to talk. Our legacy CRM is holding us back, especially with remote reps.',
        timestamp: '00:15',
        sentiment: 1,
        topic: 'Greeting'
      },
      {
        speaker: 'agent',
        speakerName: 'Alex Carter',
        text: "I hear that from a lot of ops directors. Before we jump into the platform, could you walk me through the single biggest point of friction your remote reps encounter daily?",
        timestamp: '00:27',
        sentiment: 3,
        topic: 'Discovery'
      },
      {
        speaker: 'customer',
        speakerName: 'Chloe Jenkins',
        text: "It's the mobile sync lag. Reps will input client feedback in the field, and it takes hours to reflect on our centralized dashboard. Leads get assigned twice, and client logs get scrambled, which is a massive headache.",
        timestamp: '00:44',
        sentiment: -2,
        topic: 'Discovery'
      },
      {
        speaker: 'agent',
        speakerName: 'Alex Carter',
        text: 'Oh wow, that sounds incredibly frustrating. Double assignment essentially ruins client trust. Our synchronization engine is real-time; updates are committed instantly across both mobile and desktop views.',
        timestamp: '01:08',
        sentiment: 4,
        topic: 'Discovery'
      },
      {
        speaker: 'customer',
        speakerName: 'Chloe Jenkins',
        text: "That sounds perfect, but I'm deeply worried about the migration process itself. If our systems go dark during the transition, our field operations would completely freeze. Can we afford that?",
        timestamp: '01:25',
        sentiment: -3,
        topic: 'Objection Handling'
      },
      {
        speaker: 'agent',
        speakerName: 'Alex Carter',
        text: "That is an incredibly valid concern, Chloe. Nobody wants system blackout. To avoid this, we set up a shadow staging environment. We pull your old records and construct a sandbox, allowing your team to test and get trained before we flip the production switch on a low-traffic Saturday night. Zero downtime.",
        timestamp: '01:46',
        sentiment: 5,
        topic: 'Objection Handling'
      },
      {
        speaker: 'customer',
        speakerName: 'Chloe Jenkins',
        text: "Okay, a sandbox and a Saturday transition makes absolute sense. That takes a huge load off my chest. What does the standard licensing package look like for 40 seat licenses?",
        timestamp: '02:18',
        sentiment: 3,
        topic: 'Pricing'
      },
      {
        speaker: 'agent',
        speakerName: 'Alex Carter',
        text: "For 40 Enterprise seats, standard pricing is $65 per seat, billed annually. This includes all API sandboxes, real-time sync, and dedicated priority support. Since you mentioned expanding to the regional team in Q3, we could lock in that rate for future expansions as well.",
        timestamp: '02:35',
        sentiment: 4,
        topic: 'Pricing'
      },
      {
        speaker: 'customer',
        speakerName: 'Chloe Jenkins',
        text: "That pricing is within our proposed budget. I will need to present this staging strategy to our VP of Security to get the sign-off, but mentally I'm completely on board.",
        timestamp: '03:02',
        sentiment: 4,
        topic: 'Closing'
      },
      {
        speaker: 'agent',
        speakerName: 'Alex Carter',
        text: "Fantastic. Let me send over a high-level PDF deck summarizing this Sunday shadow migration protocol so you have custom diagrams for the security review. How about we get back on the phone next Tuesday morning to address any security notes?",
        timestamp: '03:18',
        sentiment: 4,
        topic: 'Closing'
      },
      {
        speaker: 'customer',
        speakerName: 'Chloe Jenkins',
        text: "Sounds great, Alex. Send that document over, and talk next Tuesday morning. Have a good afternoon!",
        timestamp: '03:32',
        sentiment: 4,
        topic: 'Closing'
      }
    ],
    timeline: [
      { timestamp: '00:00', agentSentiment: 2, customerSentiment: 1, headline: 'Consultation starts with pleasantries.' },
      { timestamp: '00:30', agentSentiment: 3, customerSentiment: -1, headline: 'Active discovery on current database failures.' },
      { timestamp: '01:00', agentSentiment: 4, customerSentiment: -2, headline: 'Chloe reveals double lead-assignment friction.' },
      { timestamp: '01:30', agentSentiment: 3, customerSentiment: -3, headline: 'Objection raised regarding system migration downtime.' },
      { timestamp: '02:00', agentSentiment: 5, customerSentiment: 3, headline: 'Downtime issue resolved using shadow sandbox staging.' },
      { timestamp: '02:40', agentSentiment: 4, customerSentiment: 4, headline: 'Licensing proposal aligned with upcoming Q3 growth plans.' },
      { timestamp: '03:20', agentSentiment: 4, customerSentiment: 4, headline: 'Secured commitment for next-step security callback.' }
    ],
    coaching: {
      goods: [
        'Conducted strong upfront diagnostic discovery, asking Chloe about her team’s specific friction points before demonstrating platform features.',
        'Maintained an optimal talk-to-listen ratio (42%), allowing Chloe to voice her ops requirements without aggressive pitching.',
        'Expertly handled the migration down-time objection by validating her concern first, then detailing a shadow sandbox transition plan.'
      ],
      opportunities: [
        'Missed a chance to detail multi-seat discount tiers when Chloe mentioned expanding to the regional offices in Q3.',
        'Experienced an 8-second delay when looking up pricing sheets instead of bridge-talking the transition with workflow context.',
        'Could have secured a hard calendar invite on the spot instead of a tentative verbal callback for next Tuesday morning.'
      ],
      summary: 'An excellent consultative sales call. Alex demonstrated deep active listening, aligned features to Chloe’s specific mobile syncing pain point, and handled technical objections gracefully to clear the path forward.'
    }
  },
  {
    id: 'sample-2',
    title: 'POS Hardware Bundle Inquiry',
    date: 'May 24, 2026',
    duration: '2:55',
    agentName: 'Jordan Vance',
    customerName: 'Marcus Thorne (Franchise Owner)',
    metrics: {
      talkListenRatio: 68,
      interruptionCount: 5,
      longestMonologueSec: 55,
      customerSentimentTrend: 'declining',
      overallScore: 54
    },
    transcript: [
      {
        speaker: 'agent',
        speakerName: 'Jordan Vance',
        text: "Hello Marcus, this is Jordan from RetailOS. I saw you filled out a form requesting pricing on our flagship POS registers. We are the highest rated hardware of 2025!",
        timestamp: '00:02',
        sentiment: 2,
        topic: 'Greeting'
      },
      {
        speaker: 'customer',
        speakerName: 'Marcus Thorne',
        text: "Hi Jordan. Yes, we are planning to upgrade 3 of our busy quick-service diners. I need to make sure the cash drawer integrates with our existing local network and doesn't...",
        timestamp: '00:15',
        sentiment: 1,
        topic: 'Greeting'
      },
      {
        speaker: 'agent',
        speakerName: 'Jordan Vance',
        text: "Oh, host connection is completely handled! Our Registers run on extreme cloud security protocols, equipped with 12GB of RAM, biometrics, and active cooling. You will never have to worry about crashing during peak times.",
        timestamp: '00:26',
        sentiment: 3,
        topic: 'Pitching'
      },
      {
        speaker: 'customer',
        speakerName: 'Marcus Thorne',
        text: "Right, but our diners are inside historical brick buildings where local Wi-Fi drops out frequently. That is why I specifically need to confirm local ethernet loopability...",
        timestamp: '00:46',
        sentiment: -1,
        topic: 'Objection Raising'
      },
      {
        speaker: 'agent',
        speakerName: 'Jordan Vance',
        text: "Right, right, wifi drops are solved. Our RetailOS Cloud records transactions locally in localized SQL databases then pushes them back up when connectivity rises. Let me tell you about our automated cloud inventory ledger feature too...",
        timestamp: '00:58',
        sentiment: 1,
        topic: 'Pitching'
      },
      {
        speaker: 'customer',
        speakerName: 'Marcus Thorne',
        text: "Wait, the inventory system? We actually use a custom proprietary ledger system. I am not trying to replace our back-office software, just looking for stable cash-drawers and screens that link to our local hub.",
        timestamp: '01:21',
        sentiment: -3,
        topic: 'Objection Raising'
      },
      {
        speaker: 'agent',
        speakerName: 'Jordan Vance',
        text: "Actually, our inventory ledger is the backbone of the OS. It operates on real-time barcodes and is mandatory for the cloud checkout pipeline. Most merchants love it and switch entirely away from their legacy layouts.",
        timestamp: '01:38',
        sentiment: -1,
        topic: 'Pitching'
      },
      {
        speaker: 'customer',
        speakerName: 'Marcus Thorne',
        text: "Well... switching software isn't in scope for us right now. Our manager is trained on our database. What is the total flat cost for just three terminal packages anyway?",
        timestamp: '01:54',
        sentiment: -4,
        topic: 'Pricing'
      },
      {
        speaker: 'agent',
        speakerName: 'Jordan Vance',
        text: "The three-terminal standard system is $2,400 upfront, which is a massive discount from original, plus the monthly operation fee of $120. I can send you a checkout order link right now to lock this discount before Friday.",
        timestamp: '02:08',
        sentiment: 2,
        topic: 'Pricing'
      },
      {
        speaker: 'customer',
        speakerName: 'Marcus Thorne',
        text: "Understood. No, don't send a payment link. I still need to make sure the cash drawer connects to our physical terminal hub. Let me think on this and review other hardware providers first.",
        timestamp: '02:26',
        sentiment: -4,
        topic: 'Closing'
      },
      {
        speaker: 'agent',
        speakerName: 'Jordan Vance',
        text: "Are you sure? If you wait past Friday, the $2,400 promo expires and it goes back up to $2,900. I'll shoot the link over just in case you change your mind.",
        timestamp: '02:40',
        sentiment: 1,
        topic: 'Closing'
      },
      {
        speaker: 'customer',
        speakerName: 'Marcus Thorne',
        text: "Yeah, you can email descriptions. Thanks, bye.",
        timestamp: '02:51',
        sentiment: -5,
        topic: 'Closing'
      }
    ],
    timeline: [
      { timestamp: '00:00', agentSentiment: 2, customerSentiment: 1, headline: 'Jordan opens with strong feature focus.' },
      { timestamp: '00:20', agentSentiment: 3, customerSentiment: -1, headline: 'Jordan interrupts Marcus during custom hardware inquiry.' },
      { timestamp: '00:50', agentSentiment: 1, customerSentiment: -2, headline: 'Jordan feature-dumps Cloud ledger details.' },
      { timestamp: '01:20', agentSentiment: -1, customerSentiment: -3, headline: 'Marcus explicitly states that switching software is out of scope.' },
      { timestamp: '02:00', agentSentiment: 2, customerSentiment: -4, headline: 'Jordan pushes standard promo package and payment link.' },
      { timestamp: '02:40', agentSentiment: 1, customerSentiment: -5, headline: 'Marcus becomes defensive and terminates the call.' }
    ],
    coaching: {
      goods: [
        'Demonstrated quick and fluent hardware specification details, immediately answering processor type and hardware bundle costs.',
        'Stated standard pricing transparency up-front without evasive maneuvers or standard sales stalling.',
        'Identified the busy multi-diner store count immediately to map standard terminal hardware sizes.'
      ],
      opportunities: [
        'Engaged in severe "feature-dumping"—spent 55 seconds preaching inventory cloud APIs when Marcus explicitly asked about physical database compatibility.',
        'Interrupted Marcus 5 separate times when he attempted to explain historical building signal locks, building friction in the call.',
        'Pushed a standard urgency closing statement ("expires Friday") prematurely while the customer was still completely cold on technical assurance.'
      ],
      summary: 'Jordan Vance was overly aggressive and talking-heavy. He failed to conduct basic diagnostics, interrupted Marcus multiple times, and pushed software add-ons when Marcus repeatedly noted he only wanted a hardware terminal.'
    }
  }
];
