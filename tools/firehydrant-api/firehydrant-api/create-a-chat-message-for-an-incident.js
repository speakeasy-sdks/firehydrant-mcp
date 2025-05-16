/**
 * Function to create a chat message for an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for creating a chat message.
 * @param {string} args.incident_id - The ID of the incident to which the chat message belongs.
 * @param {Object} args.message - The message object containing the chat message details.
 * @param {string} args.message.text - The text of the chat message.
 * @returns {Promise<Object>} - The result of the chat message creation.
 */
const executeFunction = async ({ incident_id, message }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    // Construct the URL for creating a chat message
    const url = `${baseUrl}/incidents/${incident_id}/generic_chat_messages`;

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
      body: JSON.stringify(message)
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
    console.error('Error creating chat message:', error);
    return { error: 'An error occurred while creating the chat message.' };
  }
};

/**
 * Tool configuration for creating a chat message for an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_chat_message',
      description: 'Create a chat message for an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident to which the chat message belongs.'
          },
          message: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'The text of the chat message.'
              }
            },
            required: ['text']
          }
        },
        required: ['incident_id', 'message']
      }
    }
  }
};

export { apiTool };