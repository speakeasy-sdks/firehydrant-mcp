/**
 * Function to update an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the incident update.
 * @param {string} args.incident_id - The ID of the incident to update.
 * @param {Object} args.body - The data to update the incident with.
 * @returns {Promise<Object>} - The result of the incident update.
 */
const executeFunction = async ({ incident_id, body }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the incident update
    const url = `${baseUrl}/incidents/${incident_id}`;

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
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
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
    console.error('Error updating the incident:', error);
    return { error: 'An error occurred while updating the incident.' };
  }
};

/**
 * Tool configuration for updating an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_incident',
      description: 'Update an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to update.'
          },
          body: {
            type: 'object',
            description: 'The data to update the incident with.'
          }
        },
        required: ['incident_id', 'body']
      }
    }
  }
};

export { apiTool };