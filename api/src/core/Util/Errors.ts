export class BaseError extends Error {
    
    constructor(message:string){
        super(message);
        this.name   =   "BaseError";
    }
}

export class NullValueError extends BaseError{
    
    constructor(message:string){
        super(message);
        this.name   =   "NullValueError";
    }
}

export class InvalidNameError extends BaseError{

    constructor(message:string){
        super(message);
        this.name   =   "InvalidNameError";
    }
}

export class InvalidEmailError extends BaseError{

    constructor(message:string){
        super(message);
        this.name   =   "InvalidEmailError";
    }
}

export class InvalidIPError extends BaseError{

    constructor(message:string){
        super(message);
        this.name   =   "InvalidIPError";
    }
}

export class InvalidPasswordError extends Error {
    constructor(message) {
      super(message); 
      this.name = "InvalidPasswordError"; 
    }
}

export class EmptyPasswordError extends Error {
    constructor(message) {
      super(message); 
      this.name = "EmptyPasswordError"; 
    }
}

export class InvalidUsernameError extends Error {
    constructor(message) {
      super(message); 
      this.name = "InvalidUsernameError"; 
    }
}

export class InternalError extends Error {
    constructor(message) {
      super(message); 
      this.name = "InternalError"; 
    }
}

export class NotFoundError extends Error {
    constructor(message) {
      super(message); 
      this.name = "NotFoundError"; 
    }
}

export class PasswordDoesNotMatchError extends Error {
    constructor(message) {
      super(message); 
      this.name = "PasswordDoesNotMatchError"; 
    }
}

export class PasswordSameMatchError extends Error {
  constructor(message) {
    super(message); 
    this.name = "PasswordSameMatchError"; 
  }
}


export class SessionCreateError extends Error {
    constructor(message) {
      super(message); 
      this.name = "SessionCreateError"; 
    }
}


export class SessionError extends Error {
    constructor(message) {
      super(message); 
      this.name = "SessionError"; 
    }
}

export class InvalidSessionError extends SessionError {
    constructor(message) {
      super(message); 
      this.name = "InvalidSessionError"; 
    }
}

export class NetworkChangeError extends SessionError {
    constructor(message) {
      super(message); 
      this.name = "NetworkChangeError"; 
    }
}

export class SessionNotFoundError extends NotFoundError {
    constructor(message) {
      super(message); 
      this.name = "SessionNotFoundError"; 
    }
}
