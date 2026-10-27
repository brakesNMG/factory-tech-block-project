// Educational content. Each station is one technology of the First Industrial Revolution.
// `tile` is where the machine stands in the town (tile coordinates, 16px tiles).
// `art` names the drawing routine in src/art/machines.js.
// Dates and facts are kept to well-documented history; see README for sources to read next.

export const STATIONS = [
  {
    id: 'shuttle',
    name: 'Flying Shuttle',
    year: 1733,
    inventor: 'John Kay',
    tile: [5, 7],
    art: 'shuttle',
    summary: 'A spring-and-cord device that let one weaver throw the shuttle across a wide loom.',
    pages: [
      {
        title: 'Weaving before the shuttle',
        text:
          'Weaving means crossing a thread (the weft) over and under the long threads held tight on the loom (the warp).\n\n' +
          'On a wide loom a weaver could not reach across to pass the shuttle by hand, so wide cloth needed TWO people sitting side by side.',
      },
      {
        title: 'John Kay\'s idea (1733)',
        text:
          'Kay, from Lancashire, fitted a box at each end of the loom and linked the shuttle to a handle by cords.\n\n' +
          'A sharp tug of the handle "flicked" the shuttle across. One weaver could now weave broad cloth alone, and much faster.',
      },
      {
        title: 'A problem it created',
        text:
          'Faster weaving used up yarn faster than hand-spinners could make it. Spinners could not keep up.\n\n' +
          'This is a pattern you will see all game: fixing one bottleneck exposes the next one. Look for the Spinning Jenny next!',
      },
    ],
    quiz: {
      q: 'What problem did the Flying Shuttle solve?',
      options: [
        'Weavers needed a helper to pass the shuttle on wide looms',
        'Cotton could not be grown in Britain',
        'Looms could not be powered by water',
      ],
      answer: 0,
      explain: 'Kay\'s cords and spring let ONE weaver throw the shuttle across a wide loom. Weaving sped up, which then created a yarn shortage.',
    },
  },
  {
    id: 'jenny',
    name: 'Spinning Jenny',
    year: 1764,
    inventor: 'James Hargreaves',
    tile: [11, 7],
    art: 'jenny',
    summary: 'A hand-turned frame that spun many threads at once instead of one.',
    pages: [
      {
        title: 'One thread at a time',
        text:
          'Spinning twists loose fibres into strong thread. On a traditional spinning wheel, a spinner made just ONE thread at a time.\n\n' +
          'After the flying shuttle, weavers were waiting on spinners. Thread was the bottleneck.',
      },
      {
        title: 'Hargreaves\' jenny (about 1764)',
        text:
          'James Hargreaves, a weaver near Blackburn, built a frame where a single wheel turned SEVERAL spindles at once.\n\n' +
          'Early jennies had about eight spindles. Later ones had 80 or more. One worker could do the work of many.',
      },
      {
        title: 'Small, cheap, and in the home',
        text:
          'The jenny was hand-powered and small enough for a cottage. It did not need a factory.\n\n' +
          'But the thread was fairly weak, good for the soft weft but not the strong warp. Something stronger was needed...',
      },
    ],
    quiz: {
      q: 'What made the Spinning Jenny so productive?',
      options: [
        'It was powered by a steam engine',
        'One wheel turned many spindles at the same time',
        'It wove cloth instead of spinning thread',
      ],
      answer: 1,
      explain: 'Multiple spindles driven by one hand-turned wheel meant one spinner could produce many threads at once. It was hand-powered, not steam-powered.',
    },
  },
  {
    id: 'waterframe',
    name: 'Water Frame',
    year: 1769,
    inventor: 'Richard Arkwright',
    tile: [27, 7],
    art: 'waterframe',
    summary: 'A water-wheel-driven spinning machine that made strong thread and needed a factory.',
    pages: [
      {
        title: 'Strong thread by machine',
        text:
          'Richard Arkwright patented the water frame in 1769. It used sets of rollers turning at different speeds to stretch and twist cotton into thread strong enough for warp.',
      },
      {
        title: 'Power from the river',
        text:
          'The frame was too big and heavy to turn by hand, so it was driven by a WATER WHEEL.\n\n' +
          'That meant mills had to be built beside fast-flowing rivers, and the workers had to come to the machines.',
      },
      {
        title: 'The first factories',
        text:
          'Arkwright opened a water-powered mill at Cromford, Derbyshire, in 1771. Machines, power, and workers under one roof, working set hours: this is the FACTORY SYSTEM.\n\n' +
          'Before this, most textile work was done at home.',
      },
    ],
    quiz: {
      q: 'Why were early water-frame mills built beside rivers?',
      options: [
        'Cotton had to be washed in the river',
        'The river was used to ship workers to the mill',
        'A water wheel supplied the power to drive the machines',
      ],
      answer: 2,
      explain: 'Water wheels powered the frames. Location was limited by where fast water ran, until steam engines freed factories from rivers.',
    },
  },
  {
    id: 'steam',
    name: 'Steam Engine',
    year: 1776,
    inventor: 'James Watt (with Matthew Boulton)',
    tile: [24, 16],
    art: 'steam',
    activity: 'steam',
    summary: 'Watt\'s improved engine turned heat into rotary motion, powering mills anywhere.',
    pages: [
      {
        title: 'Heat into motion',
        text:
          'Burning coal boils water. Steam pushes a piston. A beam, crank, and flywheel turn that push into motion that can drive machinery.\n\n' +
          'Thomas Newcomen\'s engine (1712) already pumped water out of mines, but it wasted huge amounts of coal.',
      },
      {
        title: 'Watt\'s separate condenser',
        text:
          'James Watt realised Newcomen\'s engine wasted heat by cooling the cylinder every stroke. His fix, a SEPARATE CONDENSER (patented 1769), kept the cylinder hot.\n\n' +
          'Partnered with Matthew Boulton, Watt sold engines from 1776 that used far less coal.',
      },
      {
        title: 'Rotary power for factories',
        text:
          'In the early 1780s Watt\'s engines were adapted to turn a shaft round and round. Now a mill could be built ANYWHERE coal could be carried: in towns, near workers and markets.\n\n' +
          'Now it is your turn: keep the boiler pressure steady to run the engine!',
      },
    ],
    quiz: {
      q: 'What was the key improvement in Watt\'s engine?',
      options: [
        'A separate condenser, so the cylinder stayed hot and less coal was wasted',
        'It replaced coal with wood',
        'It was the first engine ever used to pump water',
      ],
      answer: 0,
      explain: 'Newcomen\'s engines already pumped water. Watt\'s separate condenser stopped the cylinder cooling every stroke, saving a lot of fuel.',
    },
  },
  {
    id: 'loom',
    name: 'Power Loom',
    year: 1785,
    inventor: 'Edmund Cartwright',
    tile: [13, 16],
    art: 'loom',
    summary: 'A loom driven by engine or water power, ending the weaver\'s hand-and-foot work.',
    pages: [
      {
        title: 'Now the weavers fall behind',
        text:
          'With the jenny and water frame, spinning had become cheap and plentiful. Now hand-loom weavers were the slow step.',
      },
      {
        title: 'Cartwright\'s loom (1785)',
        text:
          'Edmund Cartwright, a clergyman, patented a loom that threw the shuttle and beat the weft with power from an engine or wheel.\n\n' +
          'His first design was clumsy. Other inventors improved it over the next decades.',
      },
      {
        title: 'The decline of hand-loom weaving',
        text:
          'By the 1820s-30s power looms were common in Lancashire mills. One young worker could mind several looms.\n\n' +
          'Cloth got much cheaper, but hand-loom weavers\' wages collapsed. Some protested, and groups such as the Luddites even smashed machines.',
      },
    ],
    quiz: {
      q: 'What was the effect of the power loom on hand-loom weavers?',
      options: [
        'Their wages rose because cloth was cheaper',
        'Their wages fell as machine-woven cloth undercut them',
        'Nothing changed for them',
      ],
      answer: 1,
      explain: 'Power looms made cloth faster and cheaper, undercutting hand-loom weavers, whose pay fell sharply as mills took over.',
    },
  },
  {
    id: 'iron',
    name: 'Coke & Iron',
    year: 1709,
    inventor: 'Abraham Darby, later Henry Cort',
    tile: [6, 17],
    art: 'iron',
    summary: 'Coke-smelted iron and puddling made strong, cheap iron for machines, bridges and rails.',
    pages: [
      {
        title: 'Iron ran out of trees',
        text:
          'Iron was smelted with charcoal, made by burning wood. Forests were being used up, which limited how much iron could be made.',
      },
      {
        title: 'Coke at Coalbrookdale (1709)',
        text:
          'Abraham Darby smelted iron using COKE, which is coal baked to drive off impurities. Coal was plentiful in Britain, so iron became cheaper over time.\n\n' +
          'Darby\'s family later helped build the Iron Bridge (1779), the first major bridge made of cast iron.',
      },
      {
        title: 'Puddling and rolling (1783-84)',
        text:
          'Cast iron is hard but brittle. Henry Cort\'s PUDDLING process stirred molten iron to burn off carbon, making tougher wrought iron, and rolling mills shaped it quickly.\n\n' +
          'Strong iron meant better machine frames, steam-engine parts, and later rails.',
      },
    ],
    quiz: {
      q: 'Why was coke important for ironmaking?',
      options: [
        'It let ironmakers use plentiful coal instead of scarce wood charcoal',
        'It made iron lighter than wood',
        'It was used to colour iron black',
      ],
      answer: 0,
      explain: 'Coke, baked from coal, replaced charcoal. Britain had lots of coal, so iron production could grow with industry.',
    },
  },
  {
    id: 'railway',
    name: 'Locomotive',
    year: 1829,
    inventor: 'George & Robert Stephenson',
    tile: [35, 16],
    art: 'railway',
    summary: 'Rocket and the Liverpool & Manchester Railway made fast steam travel real.',
    pages: [
      {
        title: 'Moving goods and people',
        text:
          'Raw cotton arrived at Liverpool; finished cloth was sold worldwide. Canals and horse-drawn wagons were slow. Mill owners wanted a faster link.',
      },
      {
        title: 'Rocket (1829)',
        text:
          'At the Rainhill Trials in 1829, the Stephensons\' "Rocket" won the contest for the best locomotive. It used a multi-tube boiler to make steam quickly and reached around 30 mph.',
      },
      {
        title: 'Liverpool & Manchester Railway (1830)',
        text:
          'The world\'s first inter-city railway with timetabled steam trains opened in 1830, carrying both goods and passengers.\n\n' +
          'Soon rail lines spread across Britain and the world.',
      },
    ],
    quiz: {
      q: 'What did the Liverpool & Manchester Railway (1830) demonstrate?',
      options: [
        'That horses were faster than steam',
        'That steam locomotives could run a regular passenger and freight service',
        'That canals were no longer needed in the north of England',
      ],
      answer: 1,
      explain: 'It was the first inter-city line run by steam locomotives to a timetable, carrying goods and passengers, and a model for later railways.',
    },
  },
  {
    id: 'factoryact',
    name: 'Factory Notice',
    year: 1833,
    inventor: 'Parliament (Factory Act)',
    tile: [17, 5],
    art: 'notice',
    summary: 'The first effective law limiting children\'s hours in textile factories.',
    pages: [
      {
        title: 'Life on the factory floor',
        text:
          'Factory work was long, loud, hot, and dangerous. Day shifts of 12-14 hours were common, six days a week. Mill owners hired many children because they were cheap and small enough to reach under moving machinery.',
      },
      {
        title: 'Reformers speak out',
        text:
          'Parliamentary inquiries heard evidence about injuries, exhaustion, and harsh punishments. Reformers pushed for limits on working hours.',
      },
      {
        title: 'The Factory Act of 1833',
        text:
          'The Act applied to textile mills. It banned the employment of children under 9, limited those aged 9-13 to 9 hours a day, and required 2 hours of schooling daily.\n\n' +
          'It also created paid FACTORY INSPECTORS to check the rules were kept, an important step towards modern workplace safety.',
      },
    ],
    quiz: {
      q: 'Which was a feature of the Factory Act of 1833?',
      options: [
        'It banned all machines in textile mills',
        'It created factory inspectors and limited children\'s working hours',
        'It made schooling for adults compulsory',
      ],
      answer: 1,
      explain: 'The Act limited hours for children, barred those under 9 from textile mills, and introduced inspectors to enforce it.',
    },
  },
];

export const STATION_BY_ID = Object.fromEntries(STATIONS.map((s) => [s.id, s]));
