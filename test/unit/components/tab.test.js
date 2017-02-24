const expectComponent = require('../component-helper').expectComponent;

describe('Tab component', () => {
  it('should render', () => {
    expectComponent(
      'tab',
      {
        label: 'Tab label',
        children: [],
      },
`
<div class="tabs__tab js-tab-pane" id="tab-label">
  <h3 class="tabs__tab-heading">Tab label</h3>
  <div class="tabs__tab-content">
  </div>
</div>
`
    );
  });
});
