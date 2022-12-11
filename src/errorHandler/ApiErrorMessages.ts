import { ApiErrors } from "./apiErrors";

export const ApiErrorMessages: { [id in ApiErrors]: string } = {
    [ApiErrors.INVALID_API_KEY]: "Invalid API key"
}