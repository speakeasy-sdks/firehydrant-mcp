/**
 * Function to delete an alert from an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.incident_id - The ID of the incident from which to delete the alert.
 * @param {string} args.incident_alert_id - The ID of the alert to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ incident_id, incident_alert_id }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the deletion request
    const url = `${baseUrl}/incidents/${incident_id}/alerts/${incident_alert_id}`;

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

    // Return a success message or response
    return { message: 'Alert deleted successfully.' };
  } catch (error) {
    console.error('Error deleting alert from incident:', error);
    return { error: 'An error occurred while deleting the alert.' };
  }
};

/**
 * Tool configuration for deleting an alert from an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_alert_from_incident',
      description: 'Delete an alert from an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incident_id: {
            type: 'string',
            description: 'The ID of the incident from which to delete the alert.'
          },
          incident_alert_id: {
            type: 'string',
            description: 'The ID of the alert to delete.'
          }
        },
        required: ['incident_id', 'incident_alert_id']
      }
    }
  }
};

export { apiTool };