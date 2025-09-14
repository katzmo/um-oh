# UM-OH: The Ultimate Museum of Humanity

## Overview

UM-OH is a prototype serious game that explores ideas of cultural memory.

Players find themselves in the archive of a fictitious museum. By opening boxes, they uncover artifacts, match them with past interpretations, and add their own descriptions. Players then decide which objects should enter the exhibition. The resulting exhibition and ending narrative reflect their choices, showing that history is not fixed but constructed.

The project was developed as part of a university course on serious games in the arts and humanities.


## Features

- Archive exploration: Navigate through storerooms and open boxes to discover artifacts.
- Interpretation matching: Learn how objects were understood differently over time.
- Player agency: Add your own descriptions and decide what enters the exhibition.
- Share your exhibition: generate a unique link to show others your curated collection.
- Dynamic endings: The game tracks your behavior and generates different overarching narratives.
- Procedural rhetoric: The rules themselves illustrate the contested and constructed nature of cultural memory.


## How to play

Go to https://katzmo.github.io/um-oh/.

Or download the source code and open `index.html` on your own webserver.

### Privacy

The game uses local storage to store your current progress and custom descriptions, no data leaves your browser.

When you decide to share your current exhibition, all required data is encoded in the shared URL.


## How to extend the game

### Add your own artifacts

Artifact data is stored in `items.json`. Simply copy one of the items and fill it with your own data. Make sure to give it a unique ID!

Then go to `scripts/archive.js` and add the new artifact ID to the room where it should be stored. You can also add a new room.

### Add your own endings

The endings are configured in `scripts/exhibition.js`. You can edit the existing endings or add your own conditions for a new one.


## Credits

Developed by Katharina Zwinger at the University of Vienna, 2025. Licensed under CC BY-NC 4.0.
