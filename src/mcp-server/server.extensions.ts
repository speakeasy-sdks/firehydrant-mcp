import { Register } from "./extensions.js";
import { prompt$GenerateRetrospective } from "../custom/prompts/generate-retrospective.js";

// https://www.speakeasy.com/docs/model-context-protocol/custom-mcp-tools-resources#building-and-registering-custom-prompts
export function registerMCPExtensions(register: Register): void {
  register.prompt(prompt$GenerateRetrospective);
}
