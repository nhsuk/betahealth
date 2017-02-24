const expectComponent = require('../component-helper').expectComponent;

describe('Reveal component', () => {
  it('should render', () => {
    expectComponent(
      'reveal',
      {
        variant: 'block',
        summary: 'Summary text',
        children: [],
      },
`
<details class="">
  <summary data-analytics="summary">
    <span class="details__summary">
      Summary text
    </span>
  </summary>
  <div>
  </div>
</details>
`
    );
  });

  it('should render inline', () => {
    expectComponent(
      'reveal',
      {
        variant: 'inline',
        summary: 'Summary text with [inline link]',
        children: [],
      },
`
<details class="details--inline">
  <summary data-analytics="summary">
    <span class="details__summary">
      Summary text with <span class="details__cta">inline link</span>
    </span>
  </summary>
  <div>
  </div>
</details>
`
    );
  });
});
