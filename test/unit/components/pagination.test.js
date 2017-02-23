const expectComponent = require('../component-helper').expectComponent;

describe('Pagination component', () => {
  it('should render next and previous', () => {
    expectComponent(
      'pagination',
      {
        next: { slug: 'page-url', title: 'Page title' },
        previous: { slug: 'another-page', title: 'Another page title' },
      },
      `<nav role="navigation" aria-label="Guide pagination">
        <ul class="article-pagination">
          <li class="article-pagination__item article-pagination__item--right">
            <a href="page-url" rel="next" data-analytics="pagination">
          <span class="article-pagination__prefix">Next page:</span>
          <span class="article-pagination__title">Page title</span>
        </a>
          </li>

          <li class="article-pagination__item article-pagination__item--left">
            <a href="another-page" rel="prev" data-analytics="pagination">
          <span class="article-pagination__prefix">Previous page:</span>
          <span class="article-pagination__title">Another page title</span>
        </a>
          </li>
        </ul>
      </nav>`
    );
  });

  it('should render next only', () => {
    expectComponent(
      'pagination',
      {
        next: { slug: 'page-url', title: 'Page title' },
      },
      `<nav role="navigation" aria-label="Guide pagination">
        <ul class="article-pagination">
          <li class="article-pagination__item article-pagination__item--right">
            <a href="page-url" rel="next" data-analytics="pagination">
          <span class="article-pagination__prefix">Next page:</span>
          <span class="article-pagination__title">Page title</span>
        </a>
          </li>
        </ul>
      </nav>`
    );
  });

  it('should render previous only', () => {
    expectComponent(
      'pagination',
      {
        previous: { slug: 'another-page', title: 'Another page title' },
      },
      `<nav role="navigation" aria-label="Guide pagination">
        <ul class="article-pagination">
          <li class="article-pagination__item article-pagination__item--left">
            <a href="another-page" rel="prev" data-analytics="pagination">
          <span class="article-pagination__prefix">Previous page:</span>
          <span class="article-pagination__title">Another page title</span>
        </a>
          </li>
        </ul>
      </nav>`
    );
  });
});
