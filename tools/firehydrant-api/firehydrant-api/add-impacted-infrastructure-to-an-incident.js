/**
 * Function to add impacted infrastructure to an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for adding impacted infrastructure.
 * @param {string} args.incidentId - The ID of the incident to which the infrastructure will be added.
 * @param {Object} args.environmentData - The data for the environment to be added.
 * @returns {Promise<Object>} - The result of the API request to add impacted infrastructure.
 */
const executeFunction = async ({ incidentId, environmentData }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/incidents/${incidentId}/impact/environments`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(environmentData)
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
    console.error('Error adding impacted infrastructure:', error);
    return { error: 'An error occurred while adding impacted infrastructure.' };
  }
};

/**
 * Tool configuration for adding impacted infrastructure to an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_impacted_infrastructure',
      description: 'Add impacted infrastructure to an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incidentId: {
            type: 'string',
            description: 'The ID of the incident to which the infrastructure will be added.'
          },
          environmentData: {
            type: 'object',
            description: 'The data for the environment to be added.'
          }
        },
        required: ['incidentId', 'environmentData']
      }
    }
  }
};

export { apiTool };