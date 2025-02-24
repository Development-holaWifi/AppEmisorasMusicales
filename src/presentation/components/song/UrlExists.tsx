const urlExists = async (url: string) => {
  try {
    const res = await fetch(url, {method: 'HEAD'});
    return res.status >= 200 && res.status < 300;
  } catch (error) {
    return false;
  }
};

export const getImg = async (data?: string) => {
  if (!data) return null;

  const baseUrls = [
    `https://play.emisorasmusicales.net/tmp/cache/`,
    `https://play.emisorasmusicales.net/tmp/images/`,
  ];

  const extensions = ['jpg', 'jpeg'];

  const artistName = data
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '.')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9.]/g, '');

  for (const baseUrl of baseUrls) {
    for (const ext of extensions) {
      const imageUrl = `${baseUrl}${artistName}.${ext}`;
      if (await urlExists(imageUrl)) {
        return imageUrl;
      }
    }
  }
  return null;
};
