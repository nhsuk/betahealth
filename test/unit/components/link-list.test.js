const expectComponent = require('../component-helper').expectComponent;

describe('Link list component', () => {
  it('should render', () => {
    expectComponent(
      'link-list',
      {
        children: [{ slug: 'page-one', title: 'Page one' }, { slug: 'page-two', title: 'Page two' }],
        currentSlug: 'page-one',
      },
      `
      <ol class="link-list" start="1">
        <li class="link-list--item is-active">
          Page one
        </li>
        <li class="link-list--item">
          <a href="page-two"
             class="link--reverse-polarity"
             title="Part 2: Page two"
             data-analytics="contents-navigation"
             data-step="2">Page two</a>
        </li>
      </ol>
      `
    );
  });

  it('should render from a set start number', () => {
    expectComponent(
      'link-list',
      {
        children: [{ slug: 'page-one', title: 'Page one' }],
        currentSlug: 'page-one',
        start: 5,
      },
      `
      <ol class="link-list" start="5">
        <li class="link-list--item is-active">
          Page one
        </li>
      </ol>
      `
    );
  });

  it('should render a numbered list', () => {
    expectComponent(
      'link-list',
      {
        children: [{ slug: 'page-one', title: 'Page one' }],
        currentSlug: 'page-one',
        numbered: true,
      },
      `
      <ol class="link-list link-list--numbered" start="1">
        <li class="link-list--item is-active">
          Page one
        </li>
      </ol>
      `
    );
  });

  it('should render as column', () => {
    expectComponent(
      'link-list',
      {
        children: [{ slug: 'page-one', title: 'Page one' }],
        currentSlug: 'page-one',
        half: true,
      },
      `
      <ol class="link-list link-list--one-half" start="1">
        <li class="link-list--item is-active">
          Page one
        </li>
      </ol>
      `
    );
  });
});
