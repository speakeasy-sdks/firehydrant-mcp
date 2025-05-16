/**
 * Function to get an incident event from the Firehydrant API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.incident_id - The ID of the incident.
 * @param {string} args.event_id - The ID of the event.
 * @returns {Promise<Object>} - The result of the incident event retrieval.
 */
const executeFunction = async ({ incident_id, event_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    // Construct the URL for the incident event
    const url = `${baseUrl}/incidents/${incident_id}/events/${event_id}`;

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
    console.error('Error retrieving incident event:', error);
    return { error: 'An error occurred while retrieving the incident event.' };
  }
};

/**
 * Tool configuration for getting an incident event from the Firehydrant API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_incident_event',
      description: 'Get an incident event from the Firehydrant API.',
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