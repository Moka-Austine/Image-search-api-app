import { load_more_images } from '../src/script.js';

// Mock the global fetch function
global.fetch = jest.fn();

describe('load_more_images function', () => {
  test('should fetch and return images data from Unsplash', async () => {
    // Mock response data
    const mockImages = [
      { id: 1, urls: { regular: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sbyUyMGxldmVsaW5nJTIwbW92aWV8ZW58MHx8MHx8fDA%3D' } },
      { id: 2, urls: { regular: 'https://images.unsplash.com/file-1715714098234-25b8b4e9d8faimage?w=416&dpr=2&auto=format&fit=crop&q=60' } }
    ];

    // Mock fetch to return a resolved promise with mock images data
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockImages),
    });

    // Call the function
    const result = await load_more_images();

    // Check that fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(`https://api.unsplash.com/search/photos?page=${page}&query=${search_data}&client_id=${access_key}`);
    
    // Check that the result is the mock data
    expect(result).toEqual(mockImages);
  });

  test('should handle fetch error gracefully', async () => {
    // Mock fetch to simulate an error
    fetch.mockRejectedValueOnce(new Error('API request failed'));

    // Call the function and check for error handling (e.g., an empty array or a specific message)
    await expect(load_more_images()).rejects.toThrow('API request failed');
  });
});
