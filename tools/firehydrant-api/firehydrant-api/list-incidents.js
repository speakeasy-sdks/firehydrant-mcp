/**
 * Function to list incidents from the Firehydrant API.
 *
 * @returns {Promise<Object>} - The list of incidents.
 */
const executeFunction = async () => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Set up the URL for the request
    const url = `${baseUrl}/incidents`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing incidents:', error);
    return { error: 'An error occurred while listing incidents.' };
  }
};

/**
 * Tool configuration for listing incidents from the Firehydrant API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_incidents',
      description: 'List incidents from the Firehydrant API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };