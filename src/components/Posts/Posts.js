import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Post from '../Post/Post';
import './Posts.css';

const PostQuery = gql`{
  posts(user_id: "b") {
    id
    image
    caption
    user {
      username
      avatar
    }
  }
}`;

class Posts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={PostQuery}>
                {({data, error, loading}) => {
                    if (loading) return <p>Loading..</p>;
                    let posts = data.posts;

                    return <div>
                        {posts.map((post) => {
                            return <Post
                                username={post.user.username}
                                avatar={post.user.avatar}
                                image={post.image}
                                key={post.id}
                                caption={post.caption}
                            />
                        })}
                    </div>
                }}
            </Query>
        )
    }
}

export default Posts;