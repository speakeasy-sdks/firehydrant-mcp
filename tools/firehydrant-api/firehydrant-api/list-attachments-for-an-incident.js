/**
 * Function to list attachments for a specific incident in Firehydrant.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident for which to list attachments.
 * @returns {Promise<Object>} - The list of attachments for the specified incident.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/incidents/${incident_id}/attachments`;

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
    console.error('Error listing attachments for incident:', error);
    return { error: 'An error occurred while listing attachments for the incident.' };
  }
};

/**
 * Tool configuration for listing attachments for an incident in Firehydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_attachments_for_incident',
      description: 'List attachments for a specific incident in Firehydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident for which to list attachments.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };