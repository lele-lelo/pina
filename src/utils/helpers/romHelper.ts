  export const romHelper = {
  getCoverUrl(igdbId: string) {
    return `app-cover://${igdbId}.png`;
  },
  getRegionInfo(region: string) {
    const infos: { name: string; class: string }[] = [
      { name: "France", class: "fr" },
      { name: "Europe", class: "eu" },
      { name: "USA", class: "us" },
      { name: "Japan", class: "jp" },
      { name: "Australia", class: "au" },
      { name: "Germany", class: "de" },
      { name: "Italy", class: "it" },
      { name: "Spain", class: "es" },
      { name: "Netherlands", class: "nl" },
      { name: "China", class: "cn" },
      { name: "Taiwan", class: "tw" },
      { name: "Korea", class: "kr" },
      { name: "Denmark", class: "dk" },
      { name: "Russia", class: "ru" }
    ];

    return (
      infos.find(i => i.name === region) || { name: "unknown", class: "xx" }
    );
  },
  getGenreInfo(genreId: number) {
    const infos: { id: number; icon: string; color: string }[] = [
      { id: 2, icon: 'mdi-cursor-default-click', color: 'cyan'}, // Point and Click
      { id: 4, icon: 'mdi-mixed-martial-arts', color: 'red'}, // Fighting
      { id: 5, icon: 'mdi-pistol', color: 'orange'}, // Shooter
      { id: 7, icon: 'mdi-music', color: 'purple'}, // Music
      { id: 8, icon: 'mdi-run', color: 'yellow'}, // Platformer
      { id: 9, icon: 'mdi-puzzle', color: 'light-blue'}, // Puzzle
      { id: 10, icon: 'mdi-car-sports', color: 'deep-orange'}, // Racing
      { id: 11, icon: 'mdi-map-clock', color: 'teal'}, // RTS
      { id: 12, icon: 'mdi-sword', color: 'lime'}, // RPG
      { id: 13, icon: 'mdi-sprout', color: 'light-green'}, // Simulation
      { id: 14, icon: 'mdi-basketball', color: 'orange'}, // Sport
      { id: 15, icon: 'mdi-strategy', color: 'blue'}, // Stategie
      { id: 16, icon: 'mdi-checkerboard', color: 'teal'}, // TBS
      { id: 24, icon: 'mdi-strategy', color: 'red'}, // Tactical
      { id: 25, icon: 'mdi-ammunition', color: 'purple'}, // Hack and slash/Beat 'em up
      { id: 26, icon: 'mdi-tooltip-question', color: 'pink'}, // Quiz
      { id: 30, icon: 'mdi-crystal-ball', color: 'deep-purple'}, // Pinball
      { id: 31, icon: 'mdi-script-text', color: 'yellow'}, // Adventure
      { id: 32, icon: 'mdi-heart-half-full', color: 'pink'}, // Indie
      { id: 33, icon: 'mdi-space-invaders', color: 'deep-purple'}, // Arcade
      { id: 34, icon: 'mdi-book-open-variant-outline', color: 'cyan'}, // Visual Novel
      { id: 35, icon: 'mdi-cards-playing', color: 'red'}, // Card & Board Game
      { id: 36, icon: 'mdi-stadium', color: 'lime'} // MOBA
    ]

    return (
      infos.find(i => i.id === genreId) || {
        name: "unknown",
        icon: "help",
        color: "grey"
      }
    );
  }
};
