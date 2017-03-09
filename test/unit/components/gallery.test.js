const expectComponent = require('../component-helper').expectComponent;

describe('Gallery component', () => {
  describe('inline variant', () => {
    it('should render', () => {
      expectComponent(
        'gallery',
        {
          variant: 'inline',
          children: [{ type: 'text', props: {} }],
        },
        `
        <div class="gallery gallery--inline" data-expandtext="Expand images" data-collapsetext="Collapse images">
          <div class="gallery__item gallery__item--inline is-odd">
            <div class="reading-width"></div>
          </div>
        </div>
        `
      );
    });
  });

  describe('collage variant', () => {
    it('should render 2 items', () => {
      expectComponent(
        'gallery',
        {
          variant: 'collage',
          children: [{ type: 'text', props: {} }, { type: 'text', props: {} }],
        },
        `
        <div class="gallery gallery--collage is-collapsed js-collage" data-expandtext="Expand images" data-collapsetext="Collapse images">
          <div class="gallery__item gallery__item--collage is-odd">
            <div class="reading-width"></div>
          </div>

          <div class="gallery__item gallery__item--collage is-even">
            <div class="reading-width"></div>
          </div>
        </div>
        `
      );
    });

    it('should render 3 items', () => {
      expectComponent(
        'gallery',
        {
          variant: 'collage',
          children: [{ type: 'text', props: {} }, { type: 'text', props: {} }, { type: 'text', props: {} }],
        },
        `
        <div class="gallery gallery--collage is-collapsed js-collage" data-expandtext="Expand images" data-collapsetext="Collapse images">
          <div class="gallery__item gallery__item--collage gallery__item--large is-odd">
            <div class="reading-width"></div>
          </div>

          <div class="gallery__item gallery__item--collage gallery__item--small is-even">
            <div class="reading-width"></div>
          </div>

          <div class="gallery__item gallery__item--collage gallery__item--small is-odd">
            <div class="reading-width"></div>
          </div>
        </div>
        `
      );
    });
  });
});
