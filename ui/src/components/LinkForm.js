import React, { Component } from 'react';

class LinkDetail extends Component {
  constructor() {
    super();
    this.handleLinkDetail = this.handleLinkDetail.bind(this);
  }

  handleLinkDetail(event) {
    event.preventDefault();

    if (this.link !== null) {
      this.props.fetchLink(this.link.value);
      this.link.value = '';
    }
  }

  render() {
    const { link } = this.props;
    const hasLink = (Object.keys(this.props.link).length > 0);

    return (
      <form className="container" onSubmit={this.handleLinkDetail}>
        <div className="container__item">
          <input
            placeholder="paste link here"
            type="text"
            ref={(ref) => this.link = ref}
          />
          <button>Shorten</button>
          { hasLink ?
            <p>
              Your link: <a href={link.shortUrl} target="_blank">{link.shortUrl}</a>
            </p>
            : ''}
        </div>
      </form>
    );
  }
}

export default LinkDetail;
