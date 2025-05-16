/**
 * Function to replace all impacts for an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident for which to replace impacts.
 * @param {Array} args.impacts - An array of impacts to set for the incident.
 * @returns {Promise<Object>} - The result of the API request.
 */
const executeFunction = async ({ incident_id, impacts }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/incidents/${incident_id}/impact`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ impacts }),
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
    console.error('Error replacing impacts for incident:', error);
    return { error: 'An error occurred while replacing impacts for the incident.' };
  }
};

/**
 * Tool configuration for replacing impacts for an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'replace_incident_impacts',
      description: 'Replace all impacts for an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident for which to replace impacts.'
          },
          impacts: {
            type: 'array',
            description: 'An array of impacts to set for the incident.'
          }
        },
        required: ['incident_id', 'impacts']
      }
    }
  }
};

export { apiTool };