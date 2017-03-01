const expectComponent = require('../component-helper').expectComponent;

describe('Form textbox component', () => {
  describe('default variant', () => {
    it('should render', () => {
      expectComponent(
        'form-textbox',
        {
          label: 'How old are you?',
          name: 'age',
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
        </label>

        <input type="text" name="age" id="input-age" class="form-textbox">
        `
      );
    });

    it('should render with an error', () => {
      expectComponent(
        'form-textbox',
        {
          label: 'How old are you?',
          name: 'age',
          error: true,
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
        </label>

        <input type="text" name="age" id="input-age" class="form-textbox error">
        `
      );
    });

    it('should render with a value', () => {
      expectComponent(
        'form-textbox',
        {
          label: 'How old are you?',
          name: 'age',
          value: '99',
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
        </label>

        <input type="text" name="age" id="input-age" class="form-textbox" value="99">
        `
      );
    });

    it('should render as optional', () => {
      expectComponent(
        'form-textbox',
        {
          label: 'How old are you?',
          name: 'age',
          optional: true,
        },
        `
        <label for="input-age" class="form-label">
          How old are you? (optional)
        </label>

        <input type="text" name="age" id="input-age" class="form-textbox">
        `
      );
    });

    it('should render hint text', () => {
      expectComponent(
        'form-textbox',
        {
          label: 'How old are you?',
          name: 'age',
          hint: 'Tell us in years',
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
          <span class="form-label__hint" id="hint-age">Tell us in years</span>
        </label>

        <input type="text" name="age" id="input-age" class="form-textbox" aria-describedby="hint-age">
        `
      );
    });
  });

  describe('large variant', () => {
    const variant = 'large';

    it('should render', () => {
      expectComponent(
        'form-textbox',
        {
          variant,
          label: 'How old are you?',
          name: 'age',
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
        </label>

        <textarea name="age" id="input-age" rows="4" class="form-textbox"></textarea>
        `
      );
    });

    it('should render with an error', () => {
      expectComponent(
        'form-textbox',
        {
          variant,
          label: 'How old are you?',
          name: 'age',
          error: true,
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
        </label>

        <textarea name="age" id="input-age" rows="4" class="form-textbox error"></textarea>
        `
      );
    });

    it('should render with a value', () => {
      expectComponent(
        'form-textbox',
        {
          variant,
          label: 'How old are you?',
          name: 'age',
          value: '99',
        },
        `
        <label for="input-age" class="form-label">
          How old are you?
        </label>

        <textarea name="age" id="input-age" rows="4" class="form-textbox">99</textarea>
        `
      );
    });
  });
});
