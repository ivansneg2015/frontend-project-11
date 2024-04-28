import { parseString } from 'xml2js';

export default async (rss, response) => {
  const xmlString = response.data.contents;

  return new Promise((resolve, reject) => {
    parseString(xmlString, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      const { channel } = result.rss;
      const channelTitle = channel[0].title[0];
      const channelDescription = channel[0].description[0];
      const feed = {
        rss,
        title: channelTitle,
        description: channelDescription,
      };
      const posts = channel[0].item.map((item) => ({
        title: item.title[0],
        link: item.link[0],
        postPubDate: new Date(item.pubDate[0]),
        description: item.description[0],
      }));

      resolve({ feed, posts });
    });
  });
};
