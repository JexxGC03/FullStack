const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes, 0
    ) 

    return sum
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }, { likes: 0 });
    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}