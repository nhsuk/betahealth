const expectComponent = require('../component-helper').expectComponent;

describe('Form multilpe choice component', () => {
  describe('all variants', () => {
    const variant = 'radio';

    it('should render inline', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          inline: true,
          children: [
            {
              label: 'My marbells',
              value: 'marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio multiple-choice--inline">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="marbells" class="multiple-choice__input">
            </label>
          </div>
        </fieldset>
        `
      );
    });

    it('should render an error', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          error: true,
          children: [
            {
              label: 'My marbells',
              value: 'marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio has-error">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="marbells" class="multiple-choice__input">
            </label>
          </div>
        </fieldset>
        `
      );
    });

    it('should use label value as fallback', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          error: true,
          children: [
            {
              label: 'My marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio has-error">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="My marbells" class="multiple-choice__input">
            </label>
          </div>
        </fieldset>
        `
      );
    });

    it('should render as optional', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          optional: true,
          children: [
            {
              label: 'My marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for? (optional)
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="My marbells" class="multiple-choice__input">
            </label>
          </div>
        </fieldset>
        `
      );
    });

    it('should render hint text', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          hint: 'Choose an option',
          children: [
            {
              label: 'My marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
            <span class="form-label__hint" id="hint-looking-for">Choose an option</span>
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="My marbells" class="multiple-choice__input" aria-describedby="hint-looking-for">
            </label>
          </div>
        </fieldset>
        `
      );
    });
  });

  describe('radio variant', () => {
    const variant = 'radio';

    it('should render', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          children: [
            {
              label: 'My marbells',
              value: 'marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="marbells" class="multiple-choice__input">
            </label>
          </div>
        </fieldset>
        `
      );
    });

    it('should render first item checked', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          value: 'marbells',
          children: [
            {
              label: 'My marbells',
              value: 'marbells',
            },
            {
              label: 'For love',
              value: 'love',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
            <label for="input--looking-for--1" class="multiple-choice multiple-choice--radio">
              My marbells
              <input type="radio" name="looking-for" id="input--looking-for--1" value="marbells" class="multiple-choice__input" checked="checked">
            </label>

            <label for="input--looking-for--2" class="multiple-choice multiple-choice--radio">
              For love
              <input type="radio" name="looking-for" id="input--looking-for--2" value="love" class="multiple-choice__input">
            </label>
          </div>
        </fieldset>
        `
      );
    });
  });

  describe('checkbox variant', () => {
    const variant = 'checkbox';

    it('should render', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          children: [
            {
              label: 'My marbells',
              value: 'marbells',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
              <label for="input--looking-for--1" class="multiple-choice multiple-choice--checkbox">
                My marbells
                <input type="checkbox" name="looking-for" id="input--looking-for--1" value="marbells" class="multiple-choice__input">
              </label>
            </div>
        </fieldset>
        `
      );
    });

    it('should render second item checked', () => {
      expectComponent(
        'form-multiple-choice',
        {
          variant,
          label: 'What were you looking for?',
          name: 'looking-for',
          value: ['love'],
          children: [
            {
              label: 'My marbells',
              value: 'marbells',
            },
            {
              label: 'For love',
              value: 'love',
            },
          ],
        },
        `
        <fieldset>
          <legend class="form-label" id="group-looking-for">
            What were you looking for?
          </legend>

          <div class="multiple-choice__container">
              <label for="input--looking-for--1" class="multiple-choice multiple-choice--checkbox">
                My marbells
                <input type="checkbox" name="looking-for" id="input--looking-for--1" value="marbells" class="multiple-choice__input">
              </label>

              <label for="input--looking-for--2" class="multiple-choice multiple-choice--checkbox">
                For love
                <input type="checkbox" name="looking-for" id="input--looking-for--2" value="love" class="multiple-choice__input" checked="checked">
              </label>
            </div>
        </fieldset>
        `
      );
    });
  });
});
