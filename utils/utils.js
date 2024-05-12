const jwt = require('jsonwebtoken')

const readingTime = (article) => {
    const noOfWords = article.split(' ').length

    const wordPerMinute = noOfWords / 400

    return Math.round(wordPerMinute) === 0 ? 1 : Math.round(wordPerMinute)
}
const getIdFromToken = (token) => {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.user._id;
    return userId
}
module.exports = { 
    readingTime,
    getIdFromToken

}