"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionNotFoundError = exports.NetworkChangeError = exports.InvalidSessionError = exports.SessionError = exports.SessionCreateError = exports.PasswordSameMatchError = exports.PasswordDoesNotMatchError = exports.NotFoundError = exports.InternalError = exports.InvalidUsernameError = exports.EmptyPasswordError = exports.InvalidPasswordError = exports.InvalidIPError = exports.InvalidEmailError = exports.InvalidNameError = exports.NullValueError = exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "BaseError";
    }
}
exports.BaseError = BaseError;
class NullValueError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "NullValueError";
    }
}
exports.NullValueError = NullValueError;
class InvalidNameError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "InvalidNameError";
    }
}
exports.InvalidNameError = InvalidNameError;
class InvalidEmailError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "InvalidEmailError";
    }
}
exports.InvalidEmailError = InvalidEmailError;
class InvalidIPError extends BaseError {
    constructor(message) {
        super(message);
        this.name = "InvalidIPError";
    }
}
exports.InvalidIPError = InvalidIPError;
class InvalidPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidPasswordError";
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
class EmptyPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmptyPasswordError";
    }
}
exports.EmptyPasswordError = EmptyPasswordError;
class InvalidUsernameError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUsernameError";
    }
}
exports.InvalidUsernameError = InvalidUsernameError;
class InternalError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalError";
    }
}
exports.InternalError = InternalError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class PasswordDoesNotMatchError extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordDoesNotMatchError";
    }
}
exports.PasswordDoesNotMatchError = PasswordDoesNotMatchError;
class PasswordSameMatchError extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordSameMatchError";
    }
}
exports.PasswordSameMatchError = PasswordSameMatchError;
class SessionCreateError extends Error {
    constructor(message) {
        super(message);
        this.name = "SessionCreateError";
    }
}
exports.SessionCreateError = SessionCreateError;
class SessionError extends Error {
    constructor(message) {
        super(message);
        this.name = "SessionError";
    }
}
exports.SessionError = SessionError;
class InvalidSessionError extends SessionError {
    constructor(message) {
        super(message);
        this.name = "InvalidSessionError";
    }
}
exports.InvalidSessionError = InvalidSessionError;
class NetworkChangeError extends SessionError {
    constructor(message) {
        super(message);
        this.name = "NetworkChangeError";
    }
}
exports.NetworkChangeError = NetworkChangeError;
class SessionNotFoundError extends NotFoundError {
    constructor(message) {
        super(message);
        this.name = "SessionNotFoundError";
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
//# sourceMappingURL=Errors.js.map