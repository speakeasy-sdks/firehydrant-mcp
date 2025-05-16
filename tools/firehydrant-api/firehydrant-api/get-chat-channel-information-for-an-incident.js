/**
 * Function to get chat channel information for a specific incident from the Firehydrant API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident for which to retrieve chat channel information.
 * @returns {Promise<Object>} - The chat channel information for the specified incident.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/incidents/${incident_id}/channel`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error getting chat channel information:', error);
    return { error: 'An error occurred while retrieving chat channel information.' };
  }
};

/**
 * Tool configuration for getting chat channel information for an incident from the Firehydrant API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_chat_channel_info',
      description: 'Get chat channel information for a specific incident.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident for which to retrieve chat channel information.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };