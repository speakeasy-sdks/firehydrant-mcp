/**
 * Function to update a chat message in an incident on Firehydrant.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.incident_id - The ID of the incident.
 * @param {string} args.message_id - The ID of the chat message to update.
 * @param {Object} args.body - The body of the request containing the updated message data.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ incident_id, message_id, body }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/incidents/${incident_id}/generic_chat_messages/${message_id}`;

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
      body: JSON.stringify(body)
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
    console.error('Error updating chat message:', error);
    return { error: 'An error occurred while updating the chat message.' };
  }
};

/**
 * Tool configuration for updating a chat message in an incident on Firehydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_chat_message',
      description: 'Update a chat message in an incident on Firehydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the chat message to update.'
          },
          body: {
            type: 'object',
            description: 'The body of the request containing the updated message data.'
          }
        },
        required: ['incident_id', 'message_id', 'body']
      }
    }
  }
};

export { apiTool };