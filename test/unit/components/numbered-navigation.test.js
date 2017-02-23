const expectComponent = require('../component-helper').expectComponent;

describe('Numbered navigation component', () => {
  it('should render', () => {
    expectComponent(
      'numbered-navigation',
      {
        children: [{ slug: 'page-one', title: 'Page one' }, { slug: 'page-two', title: 'Page two' }],
        currentSlug: 'page-one',
      },
      `<nav role="navigation" aria-label="Parts to this guide" class="link-list__row">
        <ol class="link-list link-list--numbered link-list--one-half" start="1">
          <li class="link-list--item is-active">
            Page one
          </li>
        </ol>

        <ol class="link-list link-list--numbered link-list--one-half" start="2">
          <li class="link-list--item">
            <a href="page-two"
               class="link--reverse-polarity"
               title="Part 2: Page two"
               data-analytics="contents-navigation"
               data-step="2">Page two</a>
          </li>
        </ol>
      </nav>`
    );
  });
});
