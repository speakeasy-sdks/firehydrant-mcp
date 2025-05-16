/**
 * Function to create an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the incident creation.
 * @param {string} args.name - The name of the incident.
 * @param {string} args.description - A description of the incident.
 * @param {string} args.environment_id - The ID of the environment where the incident occurred.
 * @returns {Promise<Object>} - The result of the incident creation.
 */
const executeFunction = async ({ name, description, environment_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1/incidents';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    // Construct the request body
    const body = JSON.stringify({
      name,
      description,
      environment_id
    });

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
      method: 'POST',
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
    console.error('Error creating incident:', error);
    return { error: 'An error occurred while creating the incident.' };
  }
};

/**
 * Tool configuration for creating an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_incident',
      description: 'Create an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the incident.'
          },
          description: {
            type: 'string',
            description: 'A description of the incident.'
          },
          environment_id: {
            type: 'string',
            description: 'The ID of the environment where the incident occurred.'
          }
        },
        required: ['name', 'environment_id']
      }
    }
  }
};

export { apiTool };