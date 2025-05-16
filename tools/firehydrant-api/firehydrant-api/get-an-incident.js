/**
 * Function to get an incident from the Firehydrant API.
 *
 * @param {Object} args - Arguments for the incident retrieval.
 * @param {string} args.incident_id - The ID of the incident to retrieve.
 * @returns {Promise<Object>} - The result of the incident retrieval.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the incident
    const url = `${baseUrl}/incidents/${incident_id}`;

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
    console.error('Error retrieving incident:', error);
    return { error: 'An error occurred while retrieving the incident.' };
  }
};

/**
 * Tool configuration for retrieving an incident from the Firehydrant API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_incident',
      description: 'Retrieve an incident from the Firehydrant API.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to retrieve.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };