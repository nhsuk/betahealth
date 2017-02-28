const expectComponent = require('../component-helper').expectComponent;

describe('Text component', () => {
  describe('Markdown', () => {
    it('should render', () => {
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

    it('should render header with ID', () => {
      expectComponent(
        'text',
        {
          variant: 'markdown',
          value: '# Markdown text\r\n## Second level heading\r\n### Third level heading',
        },
        `
        <div class="reading-width">
          <h1 id="markdown-text">Markdown text</h1>
          <h2 id="second-level-heading">Second level heading</h2>
          <h3 id="third-level-heading">Third level heading</h3>
        </div>
        `
      );
    });

    it('should render abbreviation', () => {
      expectComponent(
        'text',
        {
          variant: 'markdown',
          value: '## A&E Abbreviation\r\n*[A&E]: Accident & Emergency',
        },
        `
        <div class="reading-width">
          <h2 id="ae-abbreviation"><abbr title="Accident &amp; Emergency">A&amp;E</abbr> Abbreviation</h2>
        </div>
        `
      );
    });

    it('should render definition list', () => {
      expectComponent(
        'text',
        {
          variant: 'markdown',
          value: 'Term\r\n~ Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        },
        `
        <div class="reading-width">
          <dl>
            <dt>Term</dt>
            <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</dd>
          </dl>
        </div>
        `
      );
    });

    it('should render custom class', () => {
      expectComponent(
        'text',
        {
          variant: 'markdown',
          value: 'Paragraph{.class-name}',
        },
        `
        <div class="reading-width">
          <p class="class-name">Paragraph</p>
        </div>
        `
      );
    });

    it('should render finders base url', () => {
      expectComponent(
        'text',
        {
          variant: 'markdown',
          value: '[Find a pharmacy]({{ findersBaseUrl }}finders)',
        },
        `
        <div class="reading-width">
          <p><a href="http://finders-base.com/finders">Find a pharmacy</a></p>
        </div>
        `
      );
    });
  });

  describe('HTML', () => {
    it('should render', () => {
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
  });

  describe('Plain text', () => {
    it('should render', () => {
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
});
