const expectComponent = require('../component-helper').expectComponent;

describe('Tabs component', () => {
  it('should render navgiation at the top', () => {
    expectComponent(
      'tabs',
      {
        variant: 'top',
        children: [
          {
            type: 'tab',
            props: {
              label: 'Tab label',
              children: [],
            },
          },
        ],
      },
      `
      <section class="tabs js-tabs">
        <ul class="tabs__nav js-tabs-nav util-print-hide tabs__nav--top">
          <li class="tabs__nav-item">
            <a href="#tab-label"
                class="tabs__nav-link"
                data-analytics="image-set">Tab label</a>
          </li>
        </ul>

        <div class="tabs__tab-container js-tabs-content">
          <div class="tabs__tab js-tab-pane" id="tab-label">
            <h3 class="tabs__tab-heading">Tab label</h3>

            <div class="tabs__tab-content">
            </div>
          </div>
        </div>
      </section>
      `
    );
  });

  it('should render navgiation at the bottom', () => {
    expectComponent(
      'tabs',
      {
        variant: 'bottom',
        children: [
          {
            type: 'tab',
            props: {
              label: 'Tab label',
              children: [],
            },
          },
        ],
      },
      `
      <section class="tabs js-tabs">
        <div class="tabs__tab-container js-tabs-content">
          <div class="tabs__tab js-tab-pane" id="tab-label">
            <h3 class="tabs__tab-heading">Tab label</h3>

            <div class="tabs__tab-content">
            </div>
          </div>
        </div>

        <ul class="tabs__nav js-tabs-nav util-print-hide">
          <li class="tabs__nav-item">
            <a href="#tab-label"
                class="tabs__nav-link"
                data-analytics="image-set">Tab label</a>
          </li>
        </ul>
      </section>
      `
    );
  });
});
