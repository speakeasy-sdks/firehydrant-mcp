/**
 * Function to list impacted infrastructure for a specific incident in Firehydrant.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident for which to list impacted infrastructure.
 * @returns {Promise<Object>} - The result of the impacted infrastructure request.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/incidents/${incident_id}/impact/environments`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
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
    console.error('Error listing impacted infrastructure:', error);
    return { error: 'An error occurred while listing impacted infrastructure.' };
  }
};

/**
 * Tool configuration for listing impacted infrastructure for an incident in Firehydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_impacted_infrastructure',
      description: 'List impacted infrastructure for a specific incident in Firehydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident for which to list impacted infrastructure.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };