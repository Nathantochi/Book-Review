function APIerrorHandler (
    status, 
    statuscode = 400,
    message = "Reach admin", 
    data = []
) {
    if (status) return successResponse(statuscode, message, data)
    return errorResponse(statuscode, message, data)
}

function successResponse () {

}

function errorResponse () {

}