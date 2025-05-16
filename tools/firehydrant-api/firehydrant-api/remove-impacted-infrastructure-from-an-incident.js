/**
 * Function to remove impacted infrastructure from an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the removal.
 * @param {string} args.incidentId - The ID of the incident from which to remove the impacted infrastructure.
 * @param {string} args.environmentId - The ID of the impacted environment to be removed.
 * @returns {Promise<Object>} - The result of the removal operation.
 */
const executeFunction = async ({ incidentId, environmentId }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/incidents/${incidentId}/impact/environments/${environmentId}`;

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

    // Parse and return the response data
    return await response.json();
  } catch (error) {
    console.error('Error removing impacted infrastructure:', error);
    return { error: 'An error occurred while removing impacted infrastructure.' };
  }
};

/**
 * Tool configuration for removing impacted infrastructure from an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'remove_impacted_infrastructure',
      description: 'Remove impacted infrastructure from an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incidentId: {
            type: 'string',
            description: 'The ID of the incident from which to remove the impacted infrastructure.'
          },
          environmentId: {
            type: 'string',
            description: 'The ID of the impacted environment to be removed.'
          }
        },
        required: ['incidentId', 'environmentId']
      }
    }
  }
};

export { apiTool };