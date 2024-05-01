import React from 'react'
import posts from '../assets/posts'
const LatestPosts = () => {
    console.log(posts)
    return (
        <div className='flex flex-col md:flex-row gap-11 flex-wrap'>
            {posts ? (
                posts.map(post => (
                    <div className='sm:w-[48%] shadow-lg rounded-lg bg-white'>
                        <div className="max-w-xl mx-auto p-4 my-6">
                            <div className="text-sm text-gray-500">{post.date}</div>
                            <h2 className="text-2xl font-bold my-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-700">
                                {post.summary}
                            </p>
                            <a href="/" className="text-green-600 font-bold mt-5 hover:text-green-800">{post.link}</a>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <center><h1>No Posts Available!</h1></center>
                </>
            )}

            { }

        </div>
    )
}

export default LatestPosts