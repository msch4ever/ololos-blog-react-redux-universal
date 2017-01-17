import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import DisqusThread from 'react-disqus-thread';
import { asyncConnect } from 'redux-async-connect';
import { getById } from '../../utils/helpers';
import { postsSelector } from '../../selector/selectors';
import * as Empty from '../../constants/emptyEntities';
import BlogPost from '../../components/BlogPost/BlogPost';
import * as postsActions from '../../redux/modules/posts';
import * as authorsAction from '../../redux/modules/authors';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    if (!postsActions.isLoaded(state) && !postsActions.isLoading(state)) {
      return dispatch(postsActions.loadPosts());
    }
  }
}, {
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    const state = getState();
    if (!authorsAction.isLoaded(state)) {
      return dispatch(authorsAction.loadAuthors());
    }
  }
}])
class PostPage extends React.Component {

  postHelmet = {
    title: this.props.post.title,
    meta: [
      {name: 'description', content: this.props.post.description},
      {name: 'twitter:title', content: this.props.post.title},
      {name: 'twitter:description', content: this.props.post.description},
      {name: 'twitter:image', content: this.props.post.previewPic},
      {property: 'og:url', content: `http://ololos.space/post/${this.props.post.id}`},
      {property: 'og:type', content: 'article'},
      {property: 'og:image', content: this.props.post.previewPic},
      {property: 'og:title', content: this.props.post.title},
      {property: 'og:description', content: this.props.post.description},
    ]
  };

  render() {
    const {post} = this.props;
    return (
      <div className="container">
        <Helmet {...this.postHelmet} />
        <BlogPost post={post} open/>
        <DisqusThread
          shortname="ololos"
          identifier={post.id}
          title={post.title}
        />
      </div>
    );
  }
}

PostPage.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    post: getById(postsSelector(state), ownProps.params.id, Empty.POST),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(postsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
