import axios from 'axios';

const API_URL = 'https://images-api.nasa.gov';

/**
 * Searches the NASA Image and Video Library for images.
 * @param {string} query The search query (e.g., 'cupola', 'NBL').
 * @returns {Promise<Array>} A promise that resolves to an array of image items.
 */
export const searchNasaImages = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        q: query,
        media_type: 'image',
      },
    });

    if (response.data?.collection?.items) {
      // Filter out items that don't have an image link
      const validItems = response.data.collection.items.filter(item => item.links && item.links[0].href);
      return validItems;
    }
    return [];
  } catch (error) {
    console.error('Error fetching from NASA Image API:', error);
    return [];
  }
};
