const expectComponent = require('../component-helper').expectComponent;

describe('Split content component', () => {
  it('should render', () => {
    expectComponent(
      'split-content',
      {
        children: [],
      },
      `
      <div class="panel">
      </div>
      `
    );
  });
});
