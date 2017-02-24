const expectComponent = require('../component-helper').expectComponent;

describe('Text component', () => {
  it('should render markdown', () => {
    expectComponent(
      'text',
      {
        variant: 'markdown',
        value: 'Some **markdown** text',
      },
`
<div class="reading-width">
  <p>Some <strong>markdown</strong> text</p>
</div>
`
    );
  });

  it('should render html', () => {
    expectComponent(
      'text',
      {
        variant: 'html',
        value: 'Some <strong>html</strong> text',
      },
`
<div class="reading-width">
  Some <strong>html</strong> text
</div>
`
    );
  });

  it('should render plain text', () => {
    expectComponent(
      'text',
      {
        variant: 'plain',
        value: 'Some plain text',
      },
`
<div class="reading-width">
  Some plain text
</div>
`
    );
  });
});
