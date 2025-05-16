/**
 * Function to close an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for closing the incident.
 * @param {string} args.incident_id - The ID of the incident to close.
 * @returns {Promise<Object>} - The result of the incident closure.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for closing the incident
    const url = `${baseUrl}/incidents/${incident_id}/close`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error closing the incident:', error);
    return { error: 'An error occurred while closing the incident.' };
  }
};

/**
 * Tool configuration for closing an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'close_incident',
      description: 'Close an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to close.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };