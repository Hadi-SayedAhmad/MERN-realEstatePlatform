const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error) //next is used to pass control to the error middleware function in the request-response cycle.
        }
    }

}
//this asyncHandler function is higher order where it takes functions as parameter like .map, and return a function... here its taking some function as parameter, and returning a function which will execute the function in the parameter inside a try/catch ... if the promise resolved it will move, otherwise error will be catched and jump into a custom error handler!

export default asyncHandler;