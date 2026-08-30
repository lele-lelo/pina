export const romHelper = {
  getCoverUrl(gameId: string) {
    return `app-cover://${gameId}.png`;
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
  getGenreInfo(genre: string) {
    const infos: { name: string; icon: string; color: string }[] = [
      { name: "Role-playing (RPG)", icon: "mdi-sword", color: "green" },
      { name: "Shooter", icon: "mdi-crosshairs-gps", color: "green" },
      { name: "Sports", icon: "mdi-basketball", color: "green" },
      {
        name: "Compilation",
        icon: "mdi-bookmark-box-multiple",
        color: "green"
      },
      { name: "Racing", icon: "mdi-car-sports", color: "green" },
      { name: "Action", icon: "mdi-movie-open", color: "green" },
      { name: "Various", icon: "mdi-diversify", color: "green" },
      { name: "Adventure", icon: "mdi-map", color: "green" },
      { name: "Platform", icon: "mdi-shoe-sneaker", color: "green" },
      { name: "Beat'em Up", icon: "mdi-boxing-glove", color: "green" },
      { name: "Strategy", icon: "mdi-strategy", color: "green" },
      { name: "Fighting", icon: "mdi-karate", color: "green" },
      { name: "Simulation", icon: "mdi-sprout", color: "green" },
      { name: "Hunting and Fishing", icon: "mdi-fish", color: "green" },
      { name: "Music / Dancing", icon: "mdi-music", color: "green" },
      { name: "Board", icon: "mdi-checkerboard", color: "green" },
      { name: "Puzzle", icon: "mdi-puzzle", color: "green" },
      { name: "Shoot'em Up", icon: "mdi-pistol", color: "green" },
      { name: "Casual Game", icon: "mdi-crowd", color: "green" },
      { name: "Gambling", icon: "mdi-cards-playing-spade", color: "green" },
      { name: "Card", icon: "mdi-cards", color: "green" },
      { name: "Quiz", icon: "mdi-tooltip-question", color: "green" },
      {
        name: "Sports with Animals",
        icon: "mdi-horse-variant",
        color: "green"
      },
      { name: "Educational", icon: "mdi-school", color: "green" },
      { name: "Pinball", icon: "mdi-arcade", color: 'green' }
    ];

    // 'Pinball',
    // 'Thinking'

    return (
      infos.find(i => i.name === genre) || {
        name: "unknown",
        icon: "help",
        color: "grey"
      }
    );
  }
};
