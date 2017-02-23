const expectComponent = require('../component-helper').expectComponent;

describe('Panel component', () => {
  it('should render', () => {
    expectComponent(
      'panel',
      {
        header: [{ type: 'text', props: { variant: 'plain', value: 'Header' } }],
        body: [{ type: 'text', props: { variant: 'plain', value: 'Body' } }],
        footer: [{ type: 'text', props: { variant: 'plain', value: 'Footer' } }],
      },
      `
      <article class="panel">
        <div class="panel__header">
          <div class="reading-width">
            Header
          </div>
        </div>

        <div class="panel__content">
          <div class="reading-width">
            Body
          </div>
        </div>

        <footer class="panel__footer">
          <div class="reading-width">
            Footer
          </div>
        </footer>
      </article>
      `
    );
  });

  it('should render header only', () => {
    expectComponent(
      'panel',
      {
        header: [{ type: 'text', props: { variant: 'plain', value: 'Header' } }],
        body: [],
        footer: [],
      },
      `
      <article class="panel">
        <div class="panel__header">
          <div class="reading-width">
            Header
          </div>
        </div>
      </article>
      `
    );
  });

  it('should render body only', () => {
    expectComponent(
      'panel',
      {
        header: [],
        body: [{ type: 'text', props: { variant: 'plain', value: 'Body' } }],
        footer: [],
      },
      `
      <article class="panel">
        <div class="panel__content">
          <div class="reading-width">
            Body
          </div>
        </div>
      </article>
      `
    );
  });

  it('should render footer only', () => {
    expectComponent(
      'panel',
      {
        header: [],
        body: [],
        footer: [{ type: 'text', props: { variant: 'plain', value: 'Footer' } }],
      },
      `
      <article class="panel">
        <footer class="panel__footer">
          <div class="reading-width">
            Footer
          </div>
        </footer>
      </article>
      `
    );
  });
});
