/**
 * Function to update impacts for an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.incident_id - The ID of the incident to update.
 * @param {Object} args.impactData - The impact data to update for the incident.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ incident_id, impactData }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    // Construct the URL for the incident impact update
    const url = `${baseUrl}/incidents/${incident_id}/impact`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(impactData)
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
    console.error('Error updating incident impacts:', error);
    return { error: 'An error occurred while updating incident impacts.' };
  }
};

/**
 * Tool configuration for updating impacts for an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_incident_impacts',
      description: 'Update impacts for an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to update.'
          },
          impactData: {
            type: 'object',
            description: 'The impact data to update for the incident.'
          }
        },
        required: ['incident_id', 'impactData']
      }
    }
  }
};

export { apiTool };