export function APIerrorHandler (
    status, 
    statuscode = 400,
    message = "Reach admin", 
    data = []
) {
    if (status) return successResponse(statuscode, message, data)
    return errorResponse(statuscode, message, data)
}

export function successResponse (res, statusCode, message, data = []) {
    res.status(statusCode).json({
        status: "success",
        message,
        data
    })
}

export function errorResponse (res, statusCode, message, data = []) {
    res.status(statusCode).json({
        status: "error",
        message,
        data
    })
}