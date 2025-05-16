/**
 * Function to update an incident event in FireHydrant.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.incident_id - The ID of the incident to update.
 * @param {string} args.event_id - The ID of the event to update.
 * @param {Object} [args.data] - The data to update the event with.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ incident_id, event_id, data }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/incidents/${incident_id}/events/${event_id}`;

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
      body: JSON.stringify(data)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating incident event:', error);
    return { error: 'An error occurred while updating the incident event.' };
  }
};

/**
 * Tool configuration for updating an incident event in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_incident_event',
      description: 'Update an incident event in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to update.'
          },
          event_id: {
            type: 'string',
            description: 'The ID of the event to update.'
          },
          data: {
            type: 'object',
            description: 'The data to update the event with.'
          }
        },
        required: ['incident_id', 'event_id']
      }
    }
  }
};

export { apiTool };