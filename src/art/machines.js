import { R, disc, ring, line } from './palette.js';

// Each routine draws one machine. They return nothing; size is declared in MACHINE_SIZE.
// Drawn with rectangles so the pixels are exactly what we intend.

export const MACHINE_SIZE = {
  shuttle: [24, 24],
  jenny: [24, 24],
  waterframe: [40, 28],
  steam: [32, 28],
  loom: [26, 24],
  iron: [28, 30],
  railway: [40, 24],
  notice: [24, 26],
  lectern: [24, 26],
};

function shadow(ctx, w, h) {
  R(ctx, 'f', 1, h - 2, w - 2, 2);
}

export const MACHINES = {
  // A wooden loom frame, taut warp threads, a woven strip, and the shuttle in its box.
  shuttle(ctx) {
    shadow(ctx, 24, 24);
    R(ctx, 'n', 2, 3, 3, 19); R(ctx, 'n', 19, 3, 3, 19);      // posts
    R(ctx, 'w', 2, 3, 20, 3);                                   // top beam
    R(ctx, 'w', 2, 19, 20, 3);                                  // bottom beam
    for (let x = 6; x < 19; x += 2) R(ctx, 'c', x, 6, 1, 8);    // warp threads
    for (let x = 6; x < 19; x += 2) R(ctx, 'd', x + 1, 6, 1, 8);
    for (let y = 14; y < 19; y++) R(ctx, y % 2 ? '2' : '3', 6, y, 13, 1); // woven cloth
    R(ctx, '0', 6, 9, 13, 3); R(ctx, 'w', 7, 9, 11, 2);        // shuttle race
    R(ctx, '4', 11, 9, 5, 2); R(ctx, '2', 15, 9, 1, 2);         // the shuttle
    R(ctx, 'e', 1, 8, 4, 4); R(ctx, 'd', 1, 8, 4, 1);          // shuttle boxes
    R(ctx, 'e', 19, 8, 4, 4); R(ctx, 'd', 19, 8, 4, 1);
    R(ctx, 'n', 11, 1, 2, 4); R(ctx, '2', 10, 0, 4, 2);         // picking-stick handle
  },

  // A small hand-turned frame: a big wheel and a row of spindles.
  jenny(ctx) {
    shadow(ctx, 24, 24);
    R(ctx, 'n', 3, 15, 2, 7); R(ctx, 'n', 19, 15, 2, 7);        // legs
    R(ctx, 'w', 2, 13, 21, 3);                                   // frame bed
    R(ctx, 'n', 2, 15, 21, 1);
    ring(ctx, 'n', 6, 8, 6, 2); disc(ctx, 'w', 6, 8, 1);        // drive wheel
    for (let a = 0; a < 4; a++) {
      const dx = [0, 5, 0, -5][a], dy = [-5, 0, 5, 0][a];
      line(ctx, 'w', 6, 8, 6 + dx, 8 + dy);
    }
    for (let i = 0; i < 6; i++) {                                // spindles + bobbins
      const x = 12 + i * 2;
      R(ctx, 'd', x, 5, 1, 8);
      R(ctx, 'c', x - (i % 2 ? 0 : 1), 9, 2, 3);
    }
    R(ctx, 'w', 12, 4, 11, 2);                                   // clasp bar
    R(ctx, '2', 22, 3, 2, 3);                                    // raw cotton roving
  },

  // Big water wheel feeding a small mill machine with rollers and bobbins.
  waterframe(ctx) {
    shadow(ctx, 40, 28);
    R(ctx, 'a', 0, 20, 18, 6); R(ctx, 'b', 1, 22, 4, 1); R(ctx, 'b', 9, 24, 5, 1); // stream
    ring(ctx, 'n', 9, 14, 9, 2); disc(ctx, 'w', 9, 14, 2);       // water wheel
    for (let a = 0; a < 8; a++) {
      const ang = (a * Math.PI) / 4;
      const x = Math.round(9 + Math.cos(ang) * 8), y = Math.round(14 + Math.sin(ang) * 8);
      line(ctx, 'w', 9, 14, x, y);
      R(ctx, 'w', x - 1, y - 1, 3, 2);                           // paddles
    }
    R(ctx, 'e', 19, 12, 3, 2);                                   // axle shaft to machine
    R(ctx, 'f', 22, 6, 17, 18);                                  // machine housing
    R(ctx, 'e', 23, 7, 15, 16);
    R(ctx, 'f', 22, 6, 17, 2);
    for (let i = 0; i < 4; i++) {                                // roller pairs
      R(ctx, 'd', 25 + i * 4, 9, 3, 3); R(ctx, 'c', 25 + i * 4, 9, 3, 1);
      R(ctx, 'c', 25 + i * 4, 16, 3, 5); R(ctx, '4', 26 + i * 4, 17, 1, 3); // bobbins
    }
    R(ctx, 'c', 24, 13, 13, 1);                                  // cotton being drawn out
    R(ctx, '2', 22, 24, 17, 2);
  },

  // Boiler with chimney, walking beam, crank and flywheel.
  steam(ctx) {
    shadow(ctx, 32, 28);
    R(ctx, 'f', 1, 21, 20, 5);                                   // brick firebox base
    R(ctx, 'r', 2, 22, 18, 3); for (let x = 3; x < 19; x += 4) R(ctx, 's', x, 22, 1, 3);
    R(ctx, '3', 4, 23, 4, 2); R(ctx, '4', 5, 24, 2, 1);          // glowing fire door
    R(ctx, 'e', 1, 12, 21, 9); R(ctx, 'd', 2, 12, 19, 2);        // boiler drum
    R(ctx, 'f', 1, 20, 21, 1);
    for (let x = 4; x < 21; x += 5) { R(ctx, 'f', x, 14, 1, 1); R(ctx, 'f', x, 18, 1, 1); } // rivets
    R(ctx, 'e', 15, 1, 4, 11); R(ctx, 'd', 15, 1, 1, 11); R(ctx, '0', 14, 0, 6, 2); // chimney
    R(ctx, 'e', 8, 7, 4, 5); R(ctx, '2', 8, 6, 4, 1);            // steam dome + valve
    R(ctx, 'e', 22, 15, 4, 6); R(ctx, 'd', 22, 15, 4, 1);        // cylinder
    R(ctx, 'e', 23, 8, 2, 7);                                    // piston rod
    ring(ctx, 'f', 26, 15, 5, 2); disc(ctx, 'e', 26, 15, 1);     // flywheel
    line(ctx, 'e', 26, 10, 26, 20); line(ctx, 'e', 21, 15, 31, 15);
    R(ctx, '4', 26, 15, 1, 1);
  },

  // A power loom: overhead drive belt turning the loom below.
  loom(ctx) {
    shadow(ctx, 26, 24);
    R(ctx, 'e', 0, 1, 26, 2); R(ctx, 'd', 0, 1, 26, 1);          // overhead line shaft
    disc(ctx, 'f', 6, 2, 2); disc(ctx, 'd', 6, 2, 1);
    R(ctx, '0', 5, 4, 1, 9); R(ctx, '0', 8, 4, 1, 9);            // drive belt
    R(ctx, 'n', 2, 10, 3, 12); R(ctx, 'n', 21, 10, 3, 12);       // frame
    R(ctx, 'w', 2, 8, 22, 3);                                    // upper beam
    R(ctx, 'f', 2, 19, 22, 3);                                   // lower beam
    disc(ctx, 'f', 6, 14, 3); disc(ctx, 'd', 6, 14, 1);          // drive wheel
    for (let x = 11; x < 21; x += 2) R(ctx, 'c', x, 11, 1, 8);   // warp
    for (let x = 11; x < 21; x += 2) R(ctx, 'd', x + 1, 11, 1, 8);
    R(ctx, '9', 11, 16, 10, 3); R(ctx, 'a', 11, 17, 10, 1);      // finished cloth
    R(ctx, 'e', 10, 13, 12, 2); R(ctx, '4', 14, 13, 4, 1);       // reed + shuttle
  },

  // Blast furnace with molten iron running into a mould.
  iron(ctx) {
    shadow(ctx, 28, 30);
    // stone furnace tapering upward
    for (let y = 0; y < 22; y++) {
      const half = 6 + Math.floor(y * 0.28);
      const x0 = 11 - half, w = half * 2 + 2;
      R(ctx, y % 4 < 2 ? 'e' : 'd', x0, 2 + y, w, 1);
      R(ctx, 'f', x0, 2 + y, 1, 1); R(ctx, 'f', x0 + w - 1, 2 + y, 1, 1);
    }
    for (let y = 2; y < 24; y += 4) R(ctx, 'f', 3, y, 16, 1);    // mortar lines
    R(ctx, 'f', 7, 0, 8, 3);                                     // top throat
    R(ctx, '3', 8, 0, 6, 1);                                     // flame at top
    R(ctx, '0', 7, 16, 8, 8); R(ctx, '3', 8, 17, 6, 7); R(ctx, '4', 9, 19, 4, 5); // tap hole glow
    R(ctx, '3', 15, 22, 5, 1); R(ctx, '4', 15, 23, 6, 1);        // molten stream
    R(ctx, 'f', 17, 24, 10, 4); R(ctx, '3', 18, 24, 8, 1);       // mould trough
    R(ctx, '4', 19, 24, 5, 1);
    R(ctx, '0', 3, 24, 4, 3);                                    // anvil
  },

  // Stephenson's Rocket (side view), on a rail.
  railway(ctx) {
    R(ctx, 'f', 0, 22, 40, 2);                                   // sleepers/rail
    R(ctx, 'n', 1, 23, 4, 1); R(ctx, 'n', 12, 23, 4, 1); R(ctx, 'n', 24, 23, 4, 1); R(ctx, 'n', 35, 23, 4, 1);
    R(ctx, 'e', 3, 22, 34, 1);                                   // rail top
    R(ctx, '0', 29, 3, 5, 9); R(ctx, '0', 28, 1, 7, 3);          // tall black chimney (right)
    R(ctx, 'e', 29, 3, 1, 9);
    R(ctx, '4', 10, 9, 21, 8); R(ctx, 'c', 10, 9, 21, 2);        // yellow-white boiler barrel
    R(ctx, '0', 10, 16, 21, 1);
    for (let x = 14; x < 30; x += 5) R(ctx, '0', x, 9, 1, 8);    // boiler bands
    R(ctx, 'w', 3, 6, 9, 11); R(ctx, 'n', 3, 6, 9, 1);           // firebox (left)
    R(ctx, '3', 5, 12, 4, 3);                                    // fire glow
    R(ctx, 'f', 26, 15, 9, 3);                                   // cylinder (angled)
    line(ctx, 'e', 31, 16, 34, 20);                              // drive rod
    ring(ctx, 'f', 33, 18, 4, 1); disc(ctx, 'c', 33, 18, 1);     // big drive wheel
    ring(ctx, '0', 7, 19, 3, 1); disc(ctx, 'd', 7, 19, 1);       // small trailing wheel
    R(ctx, '2', 1, 18, 3, 3);                                    // buffer
  },

  // A wooden notice board with the Act posted on it.
  notice(ctx) {
    shadow(ctx, 24, 26);
    R(ctx, 'n', 4, 12, 3, 12); R(ctx, 'n', 17, 12, 3, 12);       // posts
    R(ctx, 'n', 1, 2, 22, 16); R(ctx, 't', 2, 3, 20, 14);        // board
    R(ctx, 'c', 4, 4, 16, 12);                                   // paper
    for (let y = 6; y < 15; y += 2) R(ctx, 'e', 6, y, y === 6 ? 12 : 9 + (y % 3), 1);
    R(ctx, '2', 15, 12, 4, 3); R(ctx, '3', 16, 13, 2, 1);        // wax seal
    R(ctx, '0', 9, 4, 6, 1);                                     // heading
    R(ctx, 'w', 0, 1, 24, 2);                                    // little roof
  },

  // A reading stand with an open book and a candle, for the literature exhibits.
  lectern(ctx) {
    shadow(ctx, 24, 26);
    R(ctx, 'n', 10, 14, 4, 10); R(ctx, 'w', 10, 14, 1, 10);      // post
    R(ctx, 'n', 6, 22, 12, 3); R(ctx, 'w', 6, 22, 12, 1);        // foot
    R(ctx, 'n', 3, 10, 18, 4); R(ctx, 'w', 3, 10, 18, 1);        // slanted top
    R(ctx, 'c', 4, 3, 8, 8); R(ctx, 'c', 12, 3, 8, 8);           // open pages
    R(ctx, 'd', 11, 3, 2, 8);                                    // spine
    for (let y = 5; y < 10; y += 2) { R(ctx, 'e', 5, y, 5, 1); R(ctx, 'e', 14, y, 5, 1); }
    R(ctx, '2', 3, 2, 1, 9); R(ctx, '2', 20, 2, 1, 9);           // red cover edges
    R(ctx, 't', 20, 6, 2, 4); R(ctx, '4', 20, 3, 2, 3);          // candle and flame
    R(ctx, '3', 20, 2, 2, 1);
  },
};
