/**
 * Function to get vote counts for an incident event from the Firehydrant API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident.
 * @param {string} args.event_id - The ID of the event.
 * @returns {Promise<Object>} - The response from the Firehydrant API containing vote counts.
 */
const executeFunction = async ({ incident_id, event_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/incidents/${incident_id}/events/${event_id}/votes/status`;

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
    console.error('Error getting vote counts for incident event:', error);
    return { error: 'An error occurred while getting vote counts for the incident event.' };
  }
};

/**
 * Tool configuration for getting vote counts for an incident event from the Firehydrant API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_vote_counts',
      description: 'Get vote counts for an incident event from the Firehydrant API.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident.'
          },
          event_id: {
            type: 'string',
            description: 'The ID of the event.'
          }
        },
        required: ['incident_id', 'event_id']
      }
    }
  }
};

export { apiTool };