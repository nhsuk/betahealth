const expectComponent = require('../component-helper').expectComponent;

describe('Tabs component', () => {
  it('should render navgiation at the top', () => {
    expectComponent(
      'tabs',
      {
        variant: 'top',
        children: [],
      },
`
<section class="tabs js-tabs">
  <ul class="tabs__nav js-tabs-nav util-print-hide tabs__nav--top">
  </ul>
  <div class="tabs__tab-container js-tabs-content">
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
        children: [],
      },
`
<section class="tabs js-tabs">
  <div class="tabs__tab-container js-tabs-content">
  </div>
  <ul class="tabs__nav js-tabs-nav util-print-hide">
  </ul>
</section>
`
    );
  });
});
