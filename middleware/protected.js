export const protectedAction = (req, res, next) => { 
    const { authorisation } = req.session
    if (authorisation !== process.env.AUTHORISATION) {
        return res.status(401).json({
            status: 'false',
            message: 'Unauthorized',
            data: []
        })
    }
    next()
}