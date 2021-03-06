import { connect } from "react-redux";
import React, { PropTypes } from "react";
import Helmet from "react-helmet";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import { provideHooks } from "redial";
import PostList from "./PostList";
import * as postsActions from "../../redux/posts";
import { sortNewPostsFirstSelector } from "../../selector/selectors";
import { loadAuthorsAndPosts } from "../../helpers/fetching";

@provideHooks({
  fetch: ({ dispatch, getState }) => {
    return loadAuthorsAndPosts(dispatch, getState);
  },
  defer: ({ dispatch, getState }) => {
    return loadAuthorsAndPosts(dispatch, getState);
  }
})
class ManagePostsPage extends React.Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  deletePost = (event, post) => {
    event.preventDefault();
    if (confirm("Вы уверены что хотите удалить пост?")) {
      //eslint-disable-line
      this.props.actions.deletePost(post.id);
    }
  };

  redirectToAddPostPage = () => {
    browserHistory.push("/admin/create/post");
  };

  render() {
    const { posts } = this.props;
    return (
      <div className="container">
        <Helmet title="Посты" />
        <h1>Посты</h1>
        <PostList posts={posts} onDelete={this.deletePost} />
        <input type="submit" value="Создать новый" className="btn btn-primary" onClick={this.redirectToAddPostPage} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: sortNewPostsFirstSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePostsPage);
