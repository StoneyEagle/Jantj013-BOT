"use strict";

function isErrorGroupWrapper(error) {
    return Reflect.has(error, '_errors');
}
function isErrorResponse(error) {
    return typeof Reflect.get(error, 'message') === 'string';
}
/**
 * Represents an API error returned by Discord
 * @extends Error
 */
class DiscordAPIError extends Error {
    /**
     * @param reason The error reported by Discord
     * @param code The error code reported by Discord
     * @param url The url of the request that erred
     */
    constructor(rawError) {
        super(DiscordAPIError.getMessage(rawError.response));
        this.reason = rawError.response.data.message;
        this.code = rawError.response.data.code;
        this.url = rawError.response.config.url;
    }
    /**
     * The name of the error
     */
    get name() {
        return `${DiscordAPIError.name}[${this.code}]`;
    }
    static getMessage(error) {
      return error.data.message;
    }
  
}
exports.DiscordAPIError = DiscordAPIError;
//# sourceMappingURL=DiscordAPIError.js.map