/**
 * Function to delete a chat message from an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.incident_id - The ID of the incident from which to delete the chat message.
 * @param {string} args.message_id - The ID of the chat message to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ incident_id, message_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the deletion request
    const url = `${baseUrl}/incidents/${incident_id}/generic_chat_messages/${message_id}`;

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

    // Return a success message or the response data
    return { message: 'Chat message deleted successfully.' };
  } catch (error) {
    console.error('Error deleting chat message:', error);
    return { error: 'An error occurred while deleting the chat message.' };
  }
};

/**
 * Tool configuration for deleting a chat message from an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_chat_message',
      description: 'Delete a chat message from an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident from which to delete the chat message.'
          },
          message_id: {
            type: 'string',
            description: 'The ID of the chat message to delete.'
          }
        },
        required: ['incident_id', 'message_id']
      }
    }
  }
};

export { apiTool };