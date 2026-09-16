const dummy = (blogs) => {

    return 1
}




const totalLikes = (blogs) => {

  console.log('Input blogs:', blogs)
    console.log('Blogs length:', blogs.length)

  
    const result = blogs.reduce((accumulator, currentValue) => {
        console.log('accumulator:', accumulator, 'current likes:', currentValue.likes)
        return accumulator + currentValue.likes
    }, 0)

    console.log('Final result:', result)
    return result


}


const favoriteBlog = (blogs) => {

if(blogs.length === 0 ) return undefined
    


  const result = blogs.reduce((favorite, currentBlog) => {
        if (favorite.likes < currentBlog.likes) {
            return currentBlog
        } else if (favorite.likes === currentBlog.likes) {
            return favorite
        } else {
            return favorite
        }
    }, blogs[0])


return result

}

module.exports = {
    dummy, totalLikes, favoriteBlog
}