/**
 * Http 状态码
 * @enum HttpStatus
 */

export enum HttpStatus {
    CONTINUE =100,
    SWITCHING_PROTOCOLS,
    PROCESSING,
    OK = 200,
    CREATED,
    ACCEPTED,
    "NON-AUTHORITATIVE_INFORMATION",
    NO_CONTENT,
    RESET_CONTENT,
    PARTIAL_CONTENT,
    "MULTI-STATUS",
    ALREADY_REPORTED,
    IM_USED = 226,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY,
    FOUND,
    SEE_OTHER,
    NOT_MODIFIED,
    USE_PROXY,
    SWITCH_PROXY,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED,
    FORBIDDEN,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    NOT_ACCEPTABLE,
    PROXY_AUTHENTICATION_REQUIRED,
    REQUEST_TIMEOUT,
    CONFLICT,
    GONE,
    LENGTH_REQUIRED,
    PRECONDITION_FAILED,
    PAYLOAD_TOO_LARGE,
    URI_TOO_LONG,
    UNSUPPORTED_MEDIA_TYPE,
    RANGE_NOT_SATISFIABLE,
    EXPECTATION_FAILED,
    "I'M_A_TEAPOT",
    TOO_MANY_CONNECTIONS = 421,
    UNPROCESSABLE_ENTITY,
    LOCKED,
    FAILED_DEPENDENCY,
    TOO_EARLY,
    UPGRADE_REQUIRED,
    PRECONDITION_REQUIRED = 428,
    TOO_MANY_REQUESTS,
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
    RETRY_WITH=449,
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED,
    BAD_GATEWAY,
    SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT,
    HTTP_VERSION_NOT_SUPPORTED,
    VARIANT_ALSO_NEGOTIATES,
    INSUFFICIENT_STORAGE,
    LOOP_DETECTED,
    BANDWIDTH_LIMIT_EXCEEDED,
    NOT_EXTENDED,
    NETWORK_AUTHENTICATION_REQUIRED,
    UNPARSEABLE_RESPONSE_HEADERS = 600
}



