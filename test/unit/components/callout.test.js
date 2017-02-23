const expectComponent = require('../component-helper').expectComponent;

describe('Callout component', () => {
  it('should render', () => {
    expectComponent(
      'callout',
      {
        variant: 'attention',
        children: [],
      },
      `
      <section class="callout callout--attention">
      </section>
      `
    );
  });

  it('should render compact', () => {
    expectComponent(
      'callout',
      {
        variant: 'info',
        compact: true,
        children: [],
      },
      `
      <section class="callout callout--info callout--compact">
      </section>
      `
    );
  });
});
