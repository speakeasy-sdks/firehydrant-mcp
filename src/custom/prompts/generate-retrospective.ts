import { PromptDefinition } from "../../mcp-server/prompts.js";

const promptText = `
Generate a retrospective for the most recent incident in FireHydrant.

Follow these steps to perform the task:

- Get the most recent incident by listing the incidents for the account.
- Get the attached retrospectives for the incident.
- If there is just one retrospective attached to the incident, use that.
  Otherwise, ask the user to select one of the retrospectives attached to the
  incident.
- Write a retrospective using the template fields and the incident details.
  Follow the structure of the template.

After generating the retrospetive, offer to:
- Make changes or corrections based on my feedback.
- Update the fiels of the retrosepctive for the incident using the content
  generated for each template field.

When update the retrospective fields, keep the following in mind:
  - When updating FireHydrant retrospective fields, the value field must be an
    array containing tiptap editor objects.
  - For bold text, be sure to use \`strong\` as the mark type.
`;

export const prompt$GenerateRetrospective: PromptDefinition = {
  name: "firehydrant-generate-retrospective-for-last-incident",
  description: "Generate a retrospective for the last incident",
  prompt: async () => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: promptText,
          },
        },
      ],
    };
  },
};
