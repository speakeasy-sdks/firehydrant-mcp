/**
 * Function to update votes for an incident event in FireHydrant.
 *
 * @param {Object} args - Arguments for updating votes.
 * @param {string} args.incidentId - The ID of the incident.
 * @param {string} args.eventId - The ID of the event.
 * @param {string} args.direction - The direction of the vote (e.g., "up" or "down").
 * @returns {Promise<Object>} - The result of the vote update.
 */
const executeFunction = async ({ incidentId, eventId, direction }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/incidents/${incidentId}/events/${eventId}/votes`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({ direction });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body
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
    console.error('Error updating votes for incident event:', error);
    return { error: 'An error occurred while updating votes for the incident event.' };
  }
};

/**
 * Tool configuration for updating votes for an incident event in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_incident_event_votes',
      description: 'Update votes for an incident event in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incidentId: {
            type: 'string',
            description: 'The ID of the incident.'
          },
          eventId: {
            type: 'string',
            description: 'The ID of the event.'
          },
          direction: {
            type: 'string',
            enum: ['up', 'down'],
            description: 'The direction of the vote.'
          }
        },
        required: ['incidentId', 'eventId', 'direction']
      }
    }
  }
};

export { apiTool };