const expectComponent = require('../component-helper').expectComponent;

describe('Gallery component', () => {
  it('should render', () => {
    expectComponent(
      'gallery',
      {
        children: [],
      },
      `<div class="media__container">
      </div>`
    );
  });
});
