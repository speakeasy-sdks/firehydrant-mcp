/**
 * Function to get the vote status for an AI-generated incident summary.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident.
 * @param {string} args.generated_summary_id - The ID of the generated summary.
 * @returns {Promise<Object>} - The vote status response.
 */
const executeFunction = async ({ incident_id, generated_summary_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/ai/summarize_incident/${incident_id}/${generated_summary_id}/voted`;

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
    console.error('Error getting vote status:', error);
    return { error: 'An error occurred while getting the vote status.' };
  }
};

/**
 * Tool configuration for getting the vote status of an AI-generated incident summary.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_vote_status',
      description: 'Get the vote status for an AI-generated incident summary.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident.'
          },
          generated_summary_id: {
            type: 'string',
            description: 'The ID of the generated summary.'
          }
        },
        required: ['incident_id', 'generated_summary_id']
      }
    }
  }
};

export { apiTool };