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
  }
};
