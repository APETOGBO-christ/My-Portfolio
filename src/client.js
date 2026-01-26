import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'jkzvjtx2',
  dataset: 'production',
  apiVersion: '2025-12-29',
  useCdn: true,
  // Token is optional for public read access
  // If you need to write from the frontend, uncomment and add token to .env
  // token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
