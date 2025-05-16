/**
 * Function to archive an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the incident archiving.
 * @param {string} args.incident_id - The ID of the incident to be archived.
 * @returns {Promise<Object>} - The result of the incident archiving operation.
 */
const executeFunction = async ({ incident_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the incident archiving
    const url = `${baseUrl}/incidents/${incident_id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Return an empty response on successful deletion
    return {};
  } catch (error) {
    console.error('Error archiving the incident:', error);
    return { error: 'An error occurred while archiving the incident.' };
  }
};

/**
 * Tool configuration for archiving an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'archive_incident',
      description: 'Archive an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to be archived.'
          }
        },
        required: ['incident_id']
      }
    }
  }
};

export { apiTool };