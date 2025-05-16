/**
 * Function to set an alert as primary for an incident in FireHydrant.
 *
 * @param {Object} args - Arguments for setting the alert as primary.
 * @param {string} args.incidentId - The ID of the incident.
 * @param {string} args.alertId - The ID of the alert to set as primary.
 * @param {boolean} [args.primary=true] - Whether to set the alert as primary.
 * @returns {Promise<Object>} - The result of the operation.
 */
const executeFunction = async ({ incidentId, alertId, primary = true }) => {
  const baseUrl = 'https://api.firehydrant.io/v1';
  const token = process.env.FIREHYDRANT_API_API_KEY;
  try {
    // Construct the URL for the PATCH request
    const url = `${baseUrl}/incidents/${incidentId}/alerts/${alertId}/primary`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ primary });

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
    console.error('Error setting alert as primary:', error);
    return { error: 'An error occurred while setting the alert as primary.' };
  }
};

/**
 * Tool configuration for setting an alert as primary for an incident in FireHydrant.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_alert_as_primary',
      description: 'Set an alert as primary for an incident in FireHydrant.',
      parameters: {
        type: 'object',
        properties: {
          incidentId: {
            type: 'string',
            description: 'The ID of the incident.'
          },
          alertId: {
            type: 'string',
            description: 'The ID of the alert to set as primary.'
          },
          primary: {
            type: 'boolean',
            description: 'Whether to set the alert as primary.'
          }
        },
        required: ['incidentId', 'alertId']
      }
    }
  }
};

export { apiTool };