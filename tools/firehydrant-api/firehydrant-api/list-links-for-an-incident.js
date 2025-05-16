/**
 * Function to list links for a specific incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident for which to list links.
 * @returns {Promise<Object>} - The result of the links retrieval for the incident.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    // Construct the URL for the incident links
    const url = `${baseUrl}/incidents/${incident_id}/links`;

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
    console.error('Error listing links for incident:', error);
    return { error: 'An error occurred while listing links for the incident.' };
  }
};

/**
 * Tool configuration for listing links for an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_incident_links',
      description: 'List links for a specific incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident for which to list links.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };