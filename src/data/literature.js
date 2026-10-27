// LITERATURE GALLERY. Two literary sources, each with a close reading and a technique quiz.
// This file is written to be edited: change the words between quotes. See CONTENT_GUIDE.md.
//
// Every exhibit follows the same plan so the analysis is easy to follow and to rewrite:
//   1. the author    2-3. the passage    4-6. one technique per page, with a quoted example    7. link to the machines
//
// Technique words are written in CAPITALS inside the text so they stand out when read.
// Passages are quoted exactly from public-domain texts. Check any change against your copy of the work.

export const LITERATURE = [
  {
    id: 'blake',
    name: 'Blake: Jerusalem',
    year: 1808,
    inventor: 'William Blake (poet)',
    tile: [23, 8],
    art: 'lectern',
    summary: 'A short poem that asks what the "dark Satanic Mills" did to a green England.',
    pages: [
      {
        title: 'Literature: the poet',
        text:
          'William Blake (1757-1827) was a London poet and engraver. Around 1804-1808 he wrote a short poem that opens his book "Milton". It is now famous as "Jerusalem".\n\n' +
          'Blake lived as the first mills and crowded towns appeared. He wrote about them as a threat to ordinary people\'s lives and minds.',
      },
      {
        title: 'The passage',
        text:
          'And did those feet in ancient time,\nWalk upon England\'s mountains green:\nAnd was the holy Lamb of God,\nOn England\'s pleasant pastures seen!\n\n' +
          'And did the Countenance Divine,\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here,\nAmong these dark Satanic Mills?\n\n' +
          '- William Blake, "Milton" (1808)',
      },
      {
        title: 'Technique: contrast and imagery',
        text:
          'Blake sets two pictures side by side. The first lines use soft, open images: "mountains green", "pleasant pastures", a shining "Countenance Divine". The last line jumps to "dark Satanic Mills".\n\n' +
          'This CONTRAST makes the mills look like a stain on a once-holy landscape. Colour words (green against dark) and "clouded hills" turn the factory age into a loss.',
      },
      {
        title: 'Technique: allusion and metaphor',
        text:
          'Blake uses ALLUSION, a reference to something the reader already knows. The "Lamb of God" and "Jerusalem" come from the Bible, and an old legend says Jesus visited England as a boy. "Jerusalem" stands for a perfect, holy city.\n\n' +
          '"Satanic Mills" is a METAPHOR. The mills are not literally devils, but the word makes machine work feel evil. Critics still argue whether Blake meant real factories, or churches and schools that he thought crushed people\'s minds.',
      },
      {
        title: 'Technique: rhetorical questions',
        text:
          'Every sentence is a QUESTION. Blake does not state his opinion. He asks whether heaven could really be built among the mills, and the reader feels the answer is no.\n\n' +
          'The questions make the reader judge for themselves. The last word, "Mills", also rhymes with "hills", so the ugly word lands hard against the pretty one.',
      },
      {
        title: 'Link to the machines',
        text:
          'Arkwright\'s mill at Cromford (1771) was already running in Blake\'s lifetime, and the steam-powered Albion Flour Mills in London (1786) were famous. Some readers think mills like these were on Blake\'s mind.\n\n' +
          'The poem shows what the machines meant to people who lived beside them, not only how they worked.',
      },
    ],
    quiz: [
      {
        q: 'Which technique is Blake using in "dark Satanic Mills"?',
        options: [
          'A literal description of one particular mill',
          'A metaphor that makes the mills seem evil',
          'A simile using the word "like"',
        ],
        answer: 1,
        explain: 'The mills are not literally satanic. Calling them that is a metaphor that makes the reader feel they are evil.',
      },
      {
        q: 'Why does Blake end with a question instead of a statement?',
        options: [
          'It makes the reader decide for themselves that heaven cannot be among the mills',
          'He did not know the answer',
          'Every poem must end with a question',
        ],
        answer: 0,
        explain: 'A rhetorical question does not need an answer. It leads the reader to the answer Blake wants them to feel.',
      },
    ],
  },
  {
    id: 'dickens',
    name: 'Dickens: Coketown',
    year: 1854,
    inventor: 'Charles Dickens (novelist)',
    tile: [9, 14],
    art: 'lectern',
    summary: 'A novel passage that shows a mill town through smoke, colour and a steam engine "like an elephant".',
    pages: [
      {
        title: 'Literature: the novelist',
        text:
          'Charles Dickens (1812-1870) wrote "Hard Times" in 1854. It is set in Coketown, a made-up factory town. He visited Preston during a mill strike to research it.\n\n' +
          'It was written twenty years after this game\'s 1834 setting, but it looks at the kind of town the inventions had built. The passage is from Book 1, chapter 5, "The Keynote".',
      },
      {
        title: 'The passage (part 1)',
        text:
          '"It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled."',
      },
      {
        title: 'The passage (part 2)',
        text:
          '"It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness."\n\n' +
          '- Charles Dickens, "Hard Times" (1854)',
      },
      {
        title: 'Technique: simile and metaphor',
        text:
          'A SIMILE compares two things using "like" or "as". Dickens says the piston moves "like the head of an elephant in a state of melancholy madness". The engine seems alive, huge and trapped, and its endless up-and-down motion feels sad.\n\n' +
          '"Serpents of smoke" is a METAPHOR. The smoke is not a snake, but the image makes it threatening.',
      },
      {
        title: 'Technique: diction and colour',
        text:
          'DICTION means word choice. Dickens picks negative words: "unnatural", "interminable", "monotonously", "melancholy madness".\n\n' +
          'His COLOUR IMAGERY shows nature stained by industry: red brick turned black, a black canal, a river running purple with dye. The "painted face" comparison makes the town seem ugly and false, though the word "savage" also shows the attitudes of Dickens\'s own time.',
      },
      {
        title: 'Technique: repetition and tone',
        text:
          'Many sentences start "It was a town of..." or "It had...". This REPETITION copies the sameness of the town and its machines. Nothing changes, "for ever and ever".\n\n' +
          'The TONE is gloomy and satirical. Dickens exaggerates on purpose to criticise a society that treated people like parts of a machine.',
      },
      {
        title: 'Link to the machines',
        text:
          'At the Steam Engine exhibit the engine is clever and useful. In Dickens it becomes a symbol: a monotonous force that sets the rhythm of the whole town.\n\n' +
          'Put it beside the Factory Act of 1833. Both show people starting to ask what the machines cost the workers.',
      },
    ],
    quiz: [
      {
        q: 'What technique is "like the head of an elephant in a state of melancholy madness"?',
        options: [
          'Dialogue between two characters',
          'A simile comparing the piston to an elephant',
          'A literal description of an engine part',
        ],
        answer: 1,
        explain: 'The word "like" compares the piston to an elephant. That makes it a simile, and it gives the engine a sad, trapped feeling.',
      },
      {
        q: 'What does the repetition of "It was a town of..." help show?',
        options: [
          'That the town was exciting and always changing',
          'That Dickens ran out of ideas',
          'That the town felt dull and unchanging',
        ],
        answer: 2,
        explain: 'The repeated sentence pattern copies the sameness of the town, matching the monotonous machines.',
      },
    ],
  },
];
