/**
 * Function to create an attachment for an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for creating the attachment.
 * @param {string} args.incidentId - The ID of the incident to which the attachment will be added.
 * @param {File} args.file - The file to be attached to the incident.
 * @returns {Promise<Object>} - The result of the attachment creation.
 */
const executeFunction = async ({ incidentId, file }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;

  try {
    const url = `${baseUrl}/incidents/${incidentId}/attachments`;

    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append('file', file);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error creating attachment for incident:', error);
    return { error: 'An error occurred while creating the attachment.' };
  }
};

/**
 * Tool configuration for creating an attachment for an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_attachment',
      description: 'Create an attachment for an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incidentId: {
            type: 'string',
            description: 'The ID of the incident to which the attachment will be added.'
          },
          file: {
            type: 'object',
            description: 'The file to be attached to the incident.'
          }
        },
        required: ['incidentId', 'file']
      }
    }
  }
};

export { apiTool };