const expectComponent = require('../component-helper').expectComponent;

describe('Tabs navigation component', () => {
  it('should render', () => {
    expectComponent(
      'tabs-navigation',
      {
        children: [
          {
            type: 'tab',
            props: {
              label: 'Tab label',
              children: [{ type: 'text', props: {} }],
            },
          },
        ],
      },
      `<ul class="tabs__nav js-tabs-nav util-print-hide">
        <li class="tabs__nav-item">
          <a href="#tab-label"
              class="tabs__nav-link"
              data-analytics="image-set">Tab label</a>
        </li>
      </ul>`
    );
  });

  it('should render top variation', () => {
    expectComponent(
      'tabs-navigation',
      {
        variant: 'top',
        children: [],
      },
      `<ul class="tabs__nav js-tabs-nav util-print-hide tabs__nav--top">
      </ul>`
    );
  });
});
