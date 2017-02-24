const expectComponent = require('../component-helper').expectComponent;

describe('Split area component', () => {
  it('should render', () => {
    expectComponent(
      'split-area',
      {
        children: [],
      },
      `
      <div class="panel__content panel__content--half">
      </div>
      `
    );
  });
});
