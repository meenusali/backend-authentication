class apierror extends Error{
    constructor (
        statusCode,
        message = "something went wrong",
        errors = [],
        stack="",
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack
        }
        else{
            this.captureStackTrace(this, this.constructor)
        }
    }

}
export {apierror};