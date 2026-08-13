export const romHelper = {
  getCoverUrl(gameId: string) {
    return `app-cover://${gameId}.png`;
  },
  getRegionInfo(region: string) {
    const infos: { name: string; class: string; label: string }[] = [
      { name: "France", class: "fr", label: "France" }
    ];

    return infos.find(i => i.name === region);
  }
};
